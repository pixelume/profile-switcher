import { GET_PAGE } from "@/components/pages/helpers/queries";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DataTableSchema,
  TextOrListSchema,
  textOrListSchema,
} from "../addcomponentSchema";
import { ADD_COMPONENT_TO_PAGE1 } from "./mutations";
import { useMutation } from "@apollo/client";

export function TextOrListForm({
  type,
  closeDialog,
  onChildSubmit,
}: {
  type: "Text" | "List";
  closeDialog: () => void;
  onChildSubmit?: (child: DataTableSchema | TextOrListSchema) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof textOrListSchema>>({
    resolver: zodResolver(textOrListSchema),
    defaultValues: {
      type: type,
      dataSource: "",
    },
  });

  const [addComponentToPage1] = useMutation(ADD_COMPONENT_TO_PAGE1, {
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
    onCompleted: () => {
      // Reset form
      form.reset();
      closeDialog();
    },
  });

  // 2. Define a submit handler.
  function onSubmit(
    values: z.infer<typeof textOrListSchema>,
    e?: React.BaseSyntheticEvent,
  ) {
    if (onChildSubmit) {
      onChildSubmit(values);
      e?.preventDefault();
      e?.stopPropagation();
      return;
    }
    addComponentToPage1({ variables: values });
    closeDialog();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 items-end gap-x-4"
      >
        {/* Data Source */}
        <FormField
          control={form.control}
          name="dataSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {type === "Text" && (
                    <SelectItem value="welcome">Welcome</SelectItem>
                  )}
                  {type === "List" && (
                    <>
                      <SelectItem value="stats">Stats</SelectItem>
                      <SelectItem value="tasks">Tasks</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add text</Button>
      </form>
    </Form>
  );
}
