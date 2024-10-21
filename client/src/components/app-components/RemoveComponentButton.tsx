import { useMutation } from "@apollo/client";
import { GET_PAGE, REMOVE_COMPONENT } from "../pages/helpers/queries";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export function RemoveComponentButton({ id }: { id: string }) {
  const { pathname } = useLocation();
  const [removeComponent] = useMutation(REMOVE_COMPONENT, {
    variables: { id },
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
  });

  if (pathname !== "/app/page1") return null;

  return (
    <Button
      className="size-8 rounded-full p-0"
      variant="outline"
      size="sm"
      onClick={() => removeComponent()}
      // onClick={() => removeComponentFromPage1(componentId)}
    >
      <IconTrash className="size-4" stroke={1} />
    </Button>
  );
}
