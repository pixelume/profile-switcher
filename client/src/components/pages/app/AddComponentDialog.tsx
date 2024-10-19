import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_PAGE } from "../helpers/queries";

const ADD_COMPONENT_TO_PAGE1 = gql`
  mutation AddComponentToPage1($dataType: String!, $title: String!) {
    addComponentToPage1(dataType: $dataType, title: $title) {
      id
      props
      type
    }
  }
`;

const componentTypes = ["DataTable"] as const;
type ComponentType = (typeof componentTypes)[number];

const dataTypes = ["iterations", "books"] as const;
type DataType = (typeof dataTypes)[number];

export function AddComponentDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [componentType, setComponentType] = useState<ComponentType | null>(
    null,
  );
  const [dataType, setDataType] = useState<DataType | null>(null);

  const onOpenChange = (isOpen: boolean) => {
    setComponentType(null);
    setDataType(null);
    setOpen(isOpen);
  };

  const [addComponentToPage1] = useMutation(ADD_COMPONENT_TO_PAGE1, {
    variables: {
      dataType,
      title,
    },
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
    onCompleted: () => {
      setTitle("");
      setComponentType(null);
      setDataType(null);
      setOpen(false);
    },
  });

  const onSubmit = () => {
    addComponentToPage1();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="size-5" stroke={1} />
          Add Component
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
          {/* <DialogDescription>Add a new component to the page</DialogDescription> */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 py-6">
            <Input
              placeholder="Component title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              onValueChange={(value) =>
                setComponentType(value as ComponentType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Component" />
              </SelectTrigger>
              <SelectContent>
                {componentTypes.map((componentType) => (
                  <SelectItem key={componentType} value={componentType}>
                    {componentType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setDataType(value as DataType)}>
              <SelectTrigger>
                <SelectValue placeholder="Data type" />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((dataType) => (
                  <SelectItem key={dataType} value={dataType}>
                    <span className="capitalize">{dataType}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={onSubmit}
              disabled={!componentType || !dataType}
              className="col-span-3"
            >
              Add
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
