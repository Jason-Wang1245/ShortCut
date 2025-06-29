import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "./ui/select";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { isValidUrl } from "@/lib/utils";
import { createShortcut } from "@/lib/storage";

export default function CreateShortcut({ onDataUpdate, tabNameList }: { onDataUpdate: () => void; tabNameList: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleAddShortcut() {
    if (selectedTab === "") {
      setError("Please select a tab.");
      return;
    }

    if (!isValidUrl(link)) {
      setError("Please input a URL.");
      return;
    }

    setIsOpen(false);
    setError(undefined);
    setSelectedTab("");
    setName("");
    setLink("");
    createShortcut(selectedTab, name, link);
    onDataUpdate();
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>New Shortcut</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>New Shortcut</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-4">
              {/* tab name input */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="tab">Tab</Label>
                <Select value={selectedTab} onValueChange={setSelectedTab}>
                  <SelectTrigger id="tab">
                    <SelectValue placeholder="Select tab to create shortcut in" />
                  </SelectTrigger>
                  <SelectContent>
                    {tabNameList.map((tabName) => (
                      <SelectItem key={tabName} value={tabName}>
                        {tabName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* shortcut name input */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="shortcut-name">Shortcut Name</Label>
                <Input id="shortcut-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              {/* shortcut link input */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="shortcut-name">Shortcut Link</Label>
                <Input id="shortcut-name" value={link} onChange={(e) => setLink(e.target.value)} />
              </div>
            </div>
            {/* error message */}
            {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <DialogFooter className="mt-2">
              <div className="w-full flex justify-end">
                <Button onClick={handleAddShortcut}>Create</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
