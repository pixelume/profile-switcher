import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { TextOrListForm } from "./forms/TextOrListForm";
import { DataTableForm } from "./forms/DataTableForm";
import { CardForm } from "./forms/CardForm";

const componentTypes = ["DataTable", "Card"] as const;

export function AddComponentDialog() {
  const [open, setOpen] = useState(false);
  const [componentToAdd, setComponentToAdd] = useState("");

  const closeDialog = useCallback(() => {
    setComponentToAdd("");
    setOpen(false);
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    setComponentToAdd("");
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="size-5" stroke={1} />
          Add Component
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 py-6">
          <Select onValueChange={(value) => setComponentToAdd(value)}>
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
          {componentToAdd === "DataTable" && (
            <DataTableForm closeDialog={closeDialog} />
          )}
          {componentToAdd === "Card" && <CardForm closeDialog={closeDialog} />}
          {componentToAdd === "Text" && (
            <TextOrListForm type="Text" closeDialog={closeDialog} />
          )}
          {componentToAdd === "List" && (
            <TextOrListForm type="List" closeDialog={closeDialog} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
