import { CardContainer } from "@/components/app-components/CardContainer";
import { DataTable } from "@/components/app-components/DataTable";
import { cn } from "@/lib/utils";

interface ComponentProps {
  id: string;
  type: string;
  children?: ComponentProps[];
  props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
    columns?: number;
    gap?: number;
    title?: string;
  };
}

const layoutClasses = {
  columns: {
    1: "grid-cols-1",
    2: "grid-cols-2",
  },
  gap: {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
  },
};

export const renderComponent = (component: ComponentProps): React.ReactNode => {
  switch (component.type) {
    case "Grid":
      return (
        <div
          key={component.id}
          className={cn(
            "grid",
            layoutClasses.columns[
              component.props.columns as keyof typeof layoutClasses.columns
            ],
            layoutClasses.gap[
              component.props.gap as keyof typeof layoutClasses.gap
            ],
          )}
        >
          {component.children?.map(renderComponent)}
        </div>
      );
    case "Card":
      return (
        <CardContainer
          id={component.id}
          title={component.props.title as string}
        >
          {component.children?.map(renderComponent)}
        </CardContainer>
      );
    case "Text":
      return <p key={component.id}>{component.props.content}</p>;
    case "List":
      return (
        <ul key={component.id} className="list-disc pl-5">
          {(component.props.content as string[]).map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            ),
          )}
        </ul>
      );
    case "DataTable":
      return (
        <DataTable
          key={component.id}
          componentId={component.id}
          className="col-span-full"
          title={component.props.title as string}
          content={component.props.content}
          // dataType={component.props.dataType as string}
        />
      );
    default:
      return null;
  }
};
