import { useState } from "react";
import { addGroup, getLocalStorageData } from "../tools/data";

export default function CreateGroupForm({ onSubmit }: { onSubmit: () => void }) {
  const [groupName, setGroupName] = useState<string>("");
  const [groupColor, setGroupColor] = useState<string>("");

  function handleUpdateGroupName(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(e.target.value);
  }

  function handleUpdateGroupColor(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupColor(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!addGroup(groupName, groupColor)) {
      return;
    }
    setGroupName("");
    setGroupColor("");
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="new-group-name">Group Name</label>
        <input id="new-group-name" type="text" value={groupName} onChange={handleUpdateGroupName} />
      </div>
      <div>
        <label htmlFor="new-group-color">Group Color</label>
        <input id="new-group-color" type="color" value={groupColor} onChange={handleUpdateGroupColor} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}
