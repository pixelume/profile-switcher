import { Card, CardHeader, CardContent } from "../ui/card";
import { RemoveComponentButton } from "./RemoveComponentButton";

export function CardContainer({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode[] | undefined;
}) {
  return (
    <Card key={id}>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex items-center gap-x-10">
            <RemoveComponentButton id={id} />
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
