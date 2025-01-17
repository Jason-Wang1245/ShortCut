import { useRef, useState } from "react";
import "../index.css";
import Modal, { ModalHandles } from "./components/Modal";
import { addGroup, getLocalStorageData } from "./tools/data";
import { Group } from "./types";
import Item from "./components/Item";

// import Group from "./components/Group";

export default function App() {
  const newGroupModal = useRef<ModalHandles>();
  const groupModal = useRef<ModalHandles>();
  const [data, setData] = useState<Group[]>(getLocalStorageData() === null ? [] : getLocalStorageData()!);
  const [groupName, setGroupName] = useState<string>("");
  const [groupColor, setGroupColor] = useState<string>("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  console.log(activeGroup);

  function handleUpdateGroupName(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(e.target.value);
  }

  function handleUpdateGroupColor(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupColor(e.target.value);
  }

  function handleSetActiveGroup(groupName: string) {
    setActiveGroup(groupName);
    groupModal.current?.open();
  }

  function handleRemoveActiveGroup() {
    setActiveGroup(null);
    groupModal.current?.close();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!addGroup(groupName, groupColor)) {
      return;
    }
    setGroupName("");
    setGroupColor("");
    setData(getLocalStorageData()!);
    newGroupModal.current?.close();
  }

  return (
    <div className="w-[26rem] h-[35rem]">
      <Modal ref={newGroupModal} heading="Create New Group">
        <form onSubmit={handleSubmit}>
          <input type="text" value={groupName} onChange={handleUpdateGroupName} />
          <input type="color" value={groupColor} onChange={handleUpdateGroupColor} />
          <button type="submit">Add</button>
        </form>
      </Modal>
      <Modal ref={groupModal} onClose={handleRemoveActiveGroup} heading={activeGroup!}>
        {activeGroup}
      </Modal>

      <button onClick={() => newGroupModal.current?.open()}>Create Group</button>
      <div className="flex gap-4 p-2">
        {data.map((group, i) => (
          <Item key={i} title={group.name} bgColor={group.color} onSetActiveGroup={handleSetActiveGroup} />
        ))}
      </div>
    </div>
  );
}
