import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { addTab } from "../lib/storage";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Label } from "./ui/label";

export default function CreateTab({ onDataUpdate }: { onDataUpdate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleAddTab() {
    if (name.trim().length === 0) {
      setError("Please enter a tab name.");
      return;
    }

    if (addTab(name.trim())) {
      setError(undefined);
      setIsOpen(false);
      setName("");
      onDataUpdate();
    } else {
      setError("Tab name already exists.");
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>New Tab</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>New Tab</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="tab-name">Tab Name</Label>
                <Input id="tab-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <DialogFooter className="mt-2">
                <div className="w-full flex justify-end">
                  <Button type="submit" onClick={handleAddTab}>
                    Create
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
