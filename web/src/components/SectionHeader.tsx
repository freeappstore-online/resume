import type { SectionKey } from "../lib/types";
import { sectionTips } from "../lib/tips";
import Tooltip from "./Tooltip";

interface SectionHeaderProps {
  title: string;
  sectionKey: SectionKey;
}

export default function SectionHeader({ title, sectionKey }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-1 mb-3">
      <h3
        className="text-sm font-semibold uppercase tracking-wide"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h3>
      <Tooltip text={sectionTips[sectionKey]} />
    </div>
  );
}
