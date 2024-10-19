import { useQuery } from "@apollo/client";
import { GET_PAGE } from "../helpers/queries";
import { renderComponent } from "../helpers/renderComponent";

export function RenderPage({ name }: { name?: string }) {
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: {
      name: name ?? "home",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const page = data.getPage;

  return renderComponent(page.layout);
}
