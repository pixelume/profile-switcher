import { useParams } from "react-router-dom";
import { RenderPage } from "./RenderPage";

export function AppContext() {
  const { appPage } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        App Context: {appPage ?? "home"}
      </h1>
      <RenderPage name={appPage} />
    </div>
  );
}
