import { useParams } from "react-router-dom";
import { RenderPage } from "./RenderPage";
import { AddComponentDialog } from "./AddComponentDialog";

export function AppContext() {
  const { appPage } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 flex items-center justify-between text-2xl font-bold">
        <span>App Context: {appPage ?? "home"}</span>
        {appPage === "page1" && <AddComponentDialog />}
      </h1>
      <RenderPage name={appPage} />
    </div>
  );
}
