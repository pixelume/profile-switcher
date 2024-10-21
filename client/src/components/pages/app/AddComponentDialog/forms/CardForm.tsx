import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IconX } from "@tabler/icons-react";
import { /* useState, */ useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  cardSchema,
  DataTableSchema,
  TextOrListSchema,
} from "../addcomponentSchema";
import { DataTableForm } from "./DataTableForm";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { ADD_COMPONENT_TO_PAGE1 } from "./mutations";
import { GET_PAGE } from "@/components/pages/helpers/queries";
import { TextOrListForm } from "./TextOrListForm";

const componentTypes = ["DataTable", "Text", "List"] as const;

const cardFormSchema = cardSchema.extend({
  componentToAdd: z.string(),
});

export function CardForm({ closeDialog }: { closeDialog: () => void }) {
  // const [componentToAdd, setComponentToAdd] = useState("");
  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      type: "Card",
      title: "",
      children: [],
      componentToAdd: "",
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

  function onSubmit(values: z.infer<typeof cardSchema>) {
    addComponentToPage1({ variables: values });
  }

  const watchedChildren = useWatch({
    control: form.control,
    name: "children",
  });

  // const watchedTitle = useWatch({
  //   control: form.control,
  //   name: "title",
  // });

  const watchedComponentToAdd = useWatch({
    control: form.control,
    name: "componentToAdd",
  });

  const onChildSubmit = useCallback(
    (child: { type: string; dataSource: string; title?: string }) => {
      form.setValue("children", [...watchedChildren, child]);
      form.setValue("componentToAdd", "");
      // setComponentToAdd("");
    },
    [form, watchedChildren],
  );

  return (
    <Card className="col-span-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-base">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Card Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title for the card..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Card Form (Title & Submit Button) */}
            <div className="grid grid-cols-3 items-end gap-4">
              {watchedChildren.length === 0 && (
                <FormField
                  control={form.control}
                  name="componentToAdd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card content:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a child component to add" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {componentTypes.map((componentType) => (
                            <SelectItem
                              key={componentType}
                              value={componentType}
                            >
                              {componentType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="col-start-2 flex items-center justify-center">
                {watchedChildren.map((child) => {
                  const { type, dataSource } = child as
                    | DataTableSchema
                    | TextOrListSchema;
                  return (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="mt-3 h-10 gap-x-2"
                    >
                      <span>
                        {type} : {dataSource}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 p-0.5"
                        onClick={() => {
                          form.setValue(
                            "children",
                            watchedChildren.filter((c) => c !== child),
                          );
                        }}
                      >
                        <IconX />
                      </Button>
                    </Badge>
                  );
                })}
              </div>

              {watchedChildren.length > 0 && (
                <Button type="submit" className="col-start-2">
                  Add Card
                </Button>
              )}

              {/* <div className="flex flex-col justify-end gap-y-3">
            <div>
              <div className="text-sm font-medium leading-none">
                Card content:
              </div>

              {watchedChildren.length === 0 && (
                <Select onValueChange={(value) => setComponentToAdd(value)}>
                  <SelectTrigger className="mt-3">
                    <SelectValue placeholder="Select a child component to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map((componentType) => (
                      <SelectItem key={componentType} value={componentType}>
                        {componentType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {watchedChildren.map((child) => {
                const { type, dataSource } = child as
                  | DataTableSchema
                  | TextOrListSchema;
                return (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="mt-3 h-10 gap-x-2"
                  >
                    <span>
                      {type} : {dataSource}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5 p-0.5"
                      onClick={() => {
                        form.setValue(
                          "children",
                          watchedChildren.filter((c) => c !== child),
                        );
                      }}
                    >
                      <IconX />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div> */}
            </div>
          </CardContent>
        </form>
      </Form>
      <CardContent className="pt-0">
        {/* Child Component Form */}
        {watchedComponentToAdd === "DataTable" && (
          <div className="col-span-2 rounded-3xl">
            <DataTableForm
              closeDialog={closeDialog}
              onChildSubmit={onChildSubmit}
            />
          </div>
        )}
        {watchedComponentToAdd === "Text" && (
          <div className="col-span-2 rounded-3xl">
            <TextOrListForm
              type="Text"
              closeDialog={closeDialog}
              onChildSubmit={onChildSubmit}
            />
          </div>
        )}
        {watchedComponentToAdd === "List" && (
          <div className="col-span-2 rounded-3xl">
            <TextOrListForm
              type="List"
              closeDialog={closeDialog}
              onChildSubmit={onChildSubmit}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
