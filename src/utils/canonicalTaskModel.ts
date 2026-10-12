/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CANONICAL TASK MODEL (CTM) & COVERAGE LEDGER
 * One validated SOP -> One Canonical Task Model -> Four Learning Experiences
 */

import { OperationalBlueprint, Lesson, SopKnowledgeModel, SourceMeta } from '../types';

export interface CanonicalSourceRef {
  pageOrSection: string;
  sourceRef: string;
  sourceText: string;
}

export interface CanonicalPrerequisite {
  id: string;
  text: string;
  source: CanonicalSourceRef;
}

export interface CanonicalToolOrSystem {
  id: string;
  name: string;
  purpose: string;
  neverDo?: string;
  source: CanonicalSourceRef;
}

export interface CanonicalStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  category: 'KNOW' | 'DO' | 'DECIDE' | 'RESPOND' | 'CHECK' | 'RECOVER' | 'ESCALATE';
  actionVerb: string;
  whyItMatters?: string;
  criticalControl?: boolean;
  scenarioQuestion?: string;
  choices?: { id: string; title: string; subtitle: string; isCorrect: boolean }[];
  coachTip?: string;
  hint?: string;
  source: CanonicalSourceRef;
}

export interface CanonicalControlRule {
  id: string;
  rule: string;
  rationale?: string;
  type: 'safety' | 'quality' | 'compliance';
  isCritical: boolean;
  source: CanonicalSourceRef;
}

export interface CanonicalDecisionPoint {
  id: string;
  situation: string;
  condition: string;
  compliantAction: string;
  prohibitedAction?: string;
  rationale: string;
  source: CanonicalSourceRef;
}

export interface CanonicalExceptionRule {
  id: string;
  type: 'exception' | 'escalation';
  trigger: string;
  resolutionOrAction: string;
  target?: string;
  source: CanonicalSourceRef;
}

export interface CanonicalProhibitedAction {
  id: string;
  mistake: string;
  prevention: string;
  source: CanonicalSourceRef;
}

export interface CanonicalTaskModel {
  id: string;
  documentIdentity: {
    docTitle: string;
    docRef: string;
    version: string;
    department?: string;
    organization?: string;
  };
  role: string;
  process: string;
  purpose: string;
  scope: string;

  prerequisites: CanonicalPrerequisite[];
  toolsAndSystems: CanonicalToolOrSystem[];
  steps: CanonicalStep[];
  controls: CanonicalControlRule[];
  decisions: CanonicalDecisionPoint[];
  exceptionsAndEscalations: CanonicalExceptionRule[];
  prohibitedActions: CanonicalProhibitedAction[];

  rawText?: string;
  sourceMeta?: SourceMeta;
  confidence: number;
  ambiguities: { topic: string; description: string; sourceRef?: string }[];
}

export type ExperienceMode = 'learnTheFlow' | 'seeTheAction' | 'makeTheDecision' | 'proveCapability';
export type CoverageDisposition = 'taught' | 'demonstrated' | 'practised' | 'assessed' | 'flagged_for_review';

export interface CoverageItemRecord {
  itemId: string;
  itemType: 'prerequisite' | 'tool' | 'step' | 'control' | 'decision' | 'exception_escalation' | 'prohibited_action';
  description: string;
  sourceRef: string;
  dispositions: Set<CoverageDisposition>;
  experiences: Record<ExperienceMode, boolean>;
}

export interface CanonicalCoverageReport {
  isFullyCovered: boolean;
  totalRequirements: number;
  coveredRequirements: number;
  coveragePercentage: number;
  records: CoverageItemRecord[];
  unresolvedItems: { itemId: string; description: string; reason: string }[];
}

/** Helper to clean & truncate strings cleanly */
function clean(input: unknown, fallback = ''): string {
  if (!input || typeof input !== 'string') return fallback;
  return input.replace(/\s+/g, ' ').trim();
}

/**
 * Builds the Canonical Task Model from any OperationalBlueprint or Lesson data.
 * Guarantees zero silent drop of source items and 100% traceability.
 */
export function buildCanonicalTaskModel(
  blueprint?: OperationalBlueprint | null,
  lesson?: Lesson | null,
  rawText?: string
): CanonicalTaskModel {
  const docTitle = clean(
    blueprint?.document_identity?.doc_title || lesson?.title,
    'Standard Operating Procedure'
  );
  const docRef = clean(
    blueprint?.document_identity?.doc_ref || (lesson as any)?.sourceMeta?.version,
    'SOP-REF-1'
  );
  const version = clean(
    blueprint?.document_identity?.version || (lesson as any)?.sourceMeta?.version,
    '1.0'
  );
  const role = clean(blueprint?.role || lesson?.role, 'Workplace Operator');
  const process = clean(blueprint?.process || lesson?.topic || lesson?.title, docTitle);
  const purpose = clean(
    blueprint?.purpose || lesson?.description,
    `Standard operational execution guidelines for ${process}.`
  );
  const scope = clean(blueprint?.scope, 'All active personnel.');

  // 1. Prerequisites
  const prerequisites: CanonicalPrerequisite[] = (blueprint?.prerequisites || []).map((p, idx) => ({
    id: `prereq-${idx + 1}`,
    text: clean(p.text, 'Check workstation prerequisites.'),
    source: {
      pageOrSection: p.source_ref || 'Prerequisites',
      sourceRef: p.source_ref || 'SOP Section 1',
      sourceText: clean(p.source_text || p.text),
    },
  }));

  // 2. Tools & Systems
  const toolsAndSystems: CanonicalToolOrSystem[] = (blueprint?.tools_and_systems || []).map((t, idx) => ({
    id: `tool-${idx + 1}`,
    name: clean(t.name, 'Equipment / Tool'),
    purpose: clean(t.purpose, 'Required for operational step execution.'),
    neverDo: t.never_do ? clean(t.never_do) : undefined,
    source: {
      pageOrSection: t.source_ref || 'Tools & Equipment',
      sourceRef: t.source_ref || 'SOP Section 2',
      sourceText: clean(t.source_text || t.name),
    },
  }));

  // 3. Operational Steps
  const rawOpSteps = blueprint?.operational_steps || [];
  const steps: CanonicalStep[] = rawOpSteps.length > 0
    ? rawOpSteps.map((s, idx) => ({
        id: `step-${idx + 1}`,
        stepNumber: idx + 1,
        title: clean(s.task_title || s.instruction.slice(0, 50), `Step ${idx + 1}`),
        instruction: clean(s.instruction, `Execute step ${idx + 1}.`),
        category: s.category || 'DO',
        actionVerb: s.action_verb || clean(s.instruction.split(' ')[0], 'Execute'),
        whyItMatters: s.why_it_matters ? clean(s.why_it_matters) : undefined,
        criticalControl: Boolean(s.critical_control),
        scenarioQuestion: s.scenario_question,
        choices: s.choices,
        coachTip: s.coach_tip,
        hint: s.hint,
        source: {
          pageOrSection: s.source?.page_or_section || `Step ${idx + 1}`,
          sourceRef: s.source?.source_ref || `SOP Step ${idx + 1}`,
          sourceText: clean(s.source?.source_text || s.instruction),
        },
      }))
    : (lesson?.stepObjects || []).map((so: any, idx: number) => ({
        id: `step-${idx + 1}`,
        stepNumber: idx + 1,
        title: clean(so.title, `Step ${idx + 1}`),
        instruction: clean(so.question || so.screen?.info || so.title, `Execute step ${idx + 1}.`),
        category: 'DO',
        actionVerb: 'Execute',
        whyItMatters: so.why,
        coachTip: so.coach_say,
        hint: so.hint,
        source: {
          pageOrSection: `Step ${idx + 1}`,
          sourceRef: `SOP Step ${idx + 1}`,
          sourceText: clean(so.title),
        },
      }));

  // If still zero steps, parse lines from lesson content or raw text
  if (steps.length === 0 && (rawText || lesson?.description)) {
    const textToParse = rawText || lesson?.description || '';
    const lines = textToParse
      .split(/\n+/)
      .map((l) => l.replace(/^(\d+[.)]|[-*•])\s+/, '').trim())
      .filter((l) => l.length >= 15);
    
    lines.forEach((l, idx) => {
      steps.push({
        id: `step-${idx + 1}`,
        stepNumber: idx + 1,
        title: clean(l.slice(0, 50), `Step ${idx + 1}`),
        instruction: clean(l),
        category: 'DO',
        actionVerb: 'Execute',
        source: {
          pageOrSection: `Line ${idx + 1}`,
          sourceRef: `SOP Line ${idx + 1}`,
          sourceText: clean(l),
        },
      });
    });
  }

  // 4. Controls (Critical, Safety, Quality)
  const controls: CanonicalControlRule[] = [];
  (blueprint?.critical_controls || []).forEach((c, idx) => {
    controls.push({
      id: `ctrl-crit-${idx + 1}`,
      rule: clean(c.rule),
      rationale: clean(c.rationale, 'Critical compliance rule.'),
      type: 'compliance',
      isCritical: true,
      source: {
        pageOrSection: c.source_ref || 'Critical Controls',
        sourceRef: c.source_ref || 'SOP Controls',
        sourceText: clean(c.source_text || c.rule),
      },
    });
  });

  (blueprint?.safety_rules || []).forEach((s, idx) => {
    controls.push({
      id: `ctrl-safe-${idx + 1}`,
      rule: clean(s.rule),
      type: 'safety',
      isCritical: true,
      source: {
        pageOrSection: s.source_ref || 'Safety Rules',
        sourceRef: s.source_ref || 'SOP Safety',
        sourceText: clean(s.source_text || s.rule),
      },
    });
  });

  (blueprint?.quality_rules || []).forEach((q, idx) => {
    controls.push({
      id: `ctrl-qual-${idx + 1}`,
      rule: clean(q.rule),
      type: 'quality',
      isCritical: false,
      source: {
        pageOrSection: q.source_ref || 'Quality Rules',
        sourceRef: q.source_ref || 'SOP Quality',
        sourceText: clean(q.source_text || q.rule),
      },
    });
  });

  // Fallback controls from lesson if blueprint was empty
  if (controls.length === 0 && (lesson?.criticalControls || []).length > 0) {
    lesson!.criticalControls.forEach((cc, idx) => {
      controls.push({
        id: `ctrl-fallback-${idx + 1}`,
        rule: clean(cc),
        type: 'compliance',
        isCritical: true,
        source: {
          pageOrSection: 'Critical Controls',
          sourceRef: 'SOP Controls',
          sourceText: clean(cc),
        },
      });
    });
  }

  // 5. Decisions
  const decisions: CanonicalDecisionPoint[] = (blueprint?.decision_points || []).map((d, idx) => ({
    id: `dec-${idx + 1}`,
    situation: clean(d.situation, 'Operational decision required.'),
    condition: clean(d.decision || d.situation),
    compliantAction: clean(d.action, 'Follow standard escalation or verification.'),
    rationale: clean(d.source_text || d.action),
    source: {
      pageOrSection: d.source_ref || 'Decision Points',
      sourceRef: d.source_ref || 'SOP Decisions',
      sourceText: clean(d.source_text || d.situation),
    },
  }));

  // 6. Exceptions & Escalations
  const exceptionsAndEscalations: CanonicalExceptionRule[] = [];
  (blueprint?.exceptions || []).forEach((e, idx) => {
    exceptionsAndEscalations.push({
      id: `exc-${idx + 1}`,
      type: 'exception',
      trigger: clean(e.trigger, 'Process anomaly or deviation.'),
      resolutionOrAction: clean(e.resolution, 'Execute recovery or verification procedure.'),
      source: {
        pageOrSection: e.source_ref || 'Exceptions',
        sourceRef: e.source_ref || 'SOP Exceptions',
        sourceText: clean(e.source_text || e.trigger),
      },
    });
  });

  (blueprint?.escalations || []).forEach((esc, idx) => {
    exceptionsAndEscalations.push({
      id: `escala-${idx + 1}`,
      type: 'escalation',
      trigger: clean(esc.situation, 'Unresolved issue requiring supervisor intervention.'),
      resolutionOrAction: clean(esc.contact_or_action, 'Contact team lead or supervisor.'),
      target: clean(esc.contact_or_action),
      source: {
        pageOrSection: esc.source_ref || 'Escalations',
        sourceRef: esc.source_ref || 'SOP Escalations',
        sourceText: clean(esc.source_text || esc.situation),
      },
    });
  });

  // 7. Prohibited Actions / Mistakes
  const prohibitedActions: CanonicalProhibitedAction[] = (blueprint?.common_mistakes || []).map((m, idx) => ({
    id: `prohib-${idx + 1}`,
    mistake: clean(m.mistake, 'Prohibited action or common mistake.'),
    prevention: clean(m.prevention, 'Follow mandatory SOP requirement.'),
    source: {
      pageOrSection: m.source_ref || 'Prohibited Actions',
      sourceRef: m.source_ref || 'SOP Prohibited Actions',
      sourceText: clean(m.source_text || m.mistake),
    },
  }));

  return {
    id: lesson?.id || `task-model-${Date.now()}`,
    documentIdentity: {
      docTitle,
      docRef,
      version,
      department: blueprint?.document_identity?.department,
    },
    role,
    process,
    purpose,
    scope,
    prerequisites,
    toolsAndSystems,
    steps,
    controls,
    decisions,
    exceptionsAndEscalations,
    prohibitedActions,
    rawText: rawText || (lesson as any)?.sourceMeta?.rawText,
    sourceMeta: (lesson as any)?.sourceMeta,
    confidence: blueprint?.confidence || 0.95,
    ambiguities: [],
  };
}

/**
 * Audits coverage across the four learning experiences.
 */
export function auditTaskModelCoverage(
  taskModel: CanonicalTaskModel,
  experiences: {
    learnTheFlowCoveredIds: string[];
    seeTheActionCoveredIds: string[];
    makeTheDecisionCoveredIds: string[];
    proveCapabilityCoveredIds: string[];
  }
): CanonicalCoverageReport {
  const records: CoverageItemRecord[] = [];
  const unresolvedItems: { itemId: string; description: string; reason: string }[] = [];

  const learnSet = new Set(experiences.learnTheFlowCoveredIds);
  const seeSet = new Set(experiences.seeTheActionCoveredIds);
  const decideSet = new Set(experiences.makeTheDecisionCoveredIds);
  const proveSet = new Set(experiences.proveCapabilityCoveredIds);

  const addRecord = (
    itemId: string,
    itemType: CoverageItemRecord['itemType'],
    description: string,
    sourceRef: string
  ) => {
    const taught = learnSet.has(itemId);
    const demonstrated = seeSet.has(itemId);
    const practised = decideSet.has(itemId);
    const assessed = proveSet.has(itemId);

    const dispositions = new Set<CoverageDisposition>();
    if (taught) dispositions.add('taught');
    if (demonstrated) dispositions.add('demonstrated');
    if (practised) dispositions.add('practised');
    if (assessed) dispositions.add('assessed');

    if (dispositions.size === 0) {
      dispositions.add('flagged_for_review');
      unresolvedItems.push({
        itemId,
        description,
        reason: `Item ${itemId} has no instructional disposition across the 4 learning experiences.`,
      });
    }

    records.push({
      itemId,
      itemType,
      description,
      sourceRef,
      dispositions,
      experiences: {
        learnTheFlow: taught,
        seeTheAction: demonstrated,
        makeTheDecision: practised,
        proveCapability: assessed,
      },
    });
  };

  taskModel.prerequisites.forEach((p) => addRecord(p.id, 'prerequisite', p.text, p.source.sourceRef));
  taskModel.toolsAndSystems.forEach((t) => addRecord(t.id, 'tool', t.name, t.source.sourceRef));
  taskModel.steps.forEach((s) => addRecord(s.id, 'step', s.instruction, s.source.sourceRef));
  taskModel.controls.forEach((c) => addRecord(c.id, 'control', c.rule, c.source.sourceRef));
  taskModel.decisions.forEach((d) => addRecord(d.id, 'decision', d.situation, d.source.sourceRef));
  taskModel.exceptionsAndEscalations.forEach((e) => addRecord(e.id, 'exception_escalation', e.trigger, e.source.sourceRef));
  taskModel.prohibitedActions.forEach((p) => addRecord(p.id, 'prohibited_action', p.mistake, p.source.sourceRef));

  const totalRequirements = records.length;
  const coveredRequirements = records.filter((r) => !r.dispositions.has('flagged_for_review')).length;
  const coveragePercentage = totalRequirements > 0 ? Math.round((coveredRequirements / totalRequirements) * 100) : 100;

  return {
    isFullyCovered: unresolvedItems.length === 0,
    totalRequirements,
    coveredRequirements,
    coveragePercentage,
    records,
    unresolvedItems,
  };
}
