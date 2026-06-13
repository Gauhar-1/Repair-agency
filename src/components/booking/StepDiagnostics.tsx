'use client';

import Chip from '@/components/ui/Chip';
import type { IssueType } from '@/types';
import { ISSUE_LABELS } from '@/types';

interface StepDiagnosticsProps {
  selected: IssueType[];
  onToggle: (issue: IssueType) => void;
}

const issueOptions: IssueType[] = [
  'cooling_failure',
  'abnormal_noise',
  'water_leakage',
  'periodic_maintenance',
];

export default function StepDiagnostics({
  selected,
  onToggle,
}: StepDiagnosticsProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">
        What&apos;s the issue?
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Select all that apply — our technician will perform a full diagnostic
        regardless.
      </p>

      <div className="flex flex-wrap gap-3">
        {issueOptions.map((issue) => (
          <Chip
            key={issue}
            label={ISSUE_LABELS[issue]}
            selected={selected.includes(issue)}
            onClick={() => onToggle(issue)}
          />
        ))}
      </div>
    </div>
  );
}
