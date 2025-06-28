import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { addTab } from "../lib/storage";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function CreateTab({ onDataUpdate }: { onDataUpdate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  function handleAddTab() {
    if (addTab(name.trim())) {
      setError(false);
      setIsOpen(false);
      setName("");
      onDataUpdate();
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">
          <Button className="w-full">New Tab</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>New Tab</DialogTitle>
          </DialogHeader>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tab name" />
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Tab name already exists</AlertTitle>
            </Alert>
          )}
          <DialogFooter>
            <Button onClick={handleAddTab}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
