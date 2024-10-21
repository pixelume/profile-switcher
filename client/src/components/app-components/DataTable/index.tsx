import { TableContent } from "./TableContent";
import { Iteration } from "./types";

interface DataTableProps {
  componentId: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  className?: string;
}

export function DataTable({
  title,
  content,
  className,
  componentId,
}: DataTableProps) {
  return (
    <TableContent
      componentId={componentId}
      data={content as Iteration[]}
      className={className}
      title={title}
    />
  );
}
