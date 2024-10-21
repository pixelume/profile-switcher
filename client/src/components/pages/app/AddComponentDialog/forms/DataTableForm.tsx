import { GET_PAGE } from "@/components/pages/helpers/queries";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { TextOrListSchema, dataTableSchema } from "../addcomponentSchema";
import { ADD_COMPONENT_TO_PAGE1 } from "./mutations";
import { useMutation } from "@apollo/client";

export function DataTableForm({
  closeDialog,
  onChildSubmit,
}: {
  closeDialog: () => void;
  onChildSubmit?: (child: TextOrListSchema & { title?: string }) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof dataTableSchema>>({
    resolver: zodResolver(dataTableSchema),
    defaultValues: {
      type: "DataTable",
      title: "",
      dataSource: "iterations",
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
    values: z.infer<typeof dataTableSchema>,
    e?: React.BaseSyntheticEvent,
  ) {
    // Do something with the form values.
    if (onChildSubmit) {
      onChildSubmit(values);
      e?.stopPropagation();
      return;
    }
    addComponentToPage1({ variables: values });
    // This will be type-safe and validated.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-3 col-start-1 grid grid-cols-3 items-end gap-x-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title for the table</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title..." {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="iterations">iterations</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Data Table</Button>
      </form>
    </Form>
  );
}
