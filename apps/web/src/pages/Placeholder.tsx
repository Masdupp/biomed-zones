import { PageHeader } from '@/components/PageHeader';
import { PhaseNotice } from '@/components/PhaseNotice';

interface Props {
  title: string;
  description: string;
  phase: number;
  pending: string;
}

/** Route placeholder for the app shell (Phase 1). Each page states which phase delivers it. */
export function Placeholder({ title, description, phase, pending }: Props) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader title={title} description={description} />
      <PhaseNotice phase={phase}>{pending}</PhaseNotice>
    </div>
  );
}
