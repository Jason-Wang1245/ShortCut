import { useRef, useState } from "react";
import "../index.css";
import Modal, { ModalHandles } from "./components/Modal";
import { addGroup, getLocalStorageData } from "./tools/data";
import { Group } from "./types";
import Item from "./components/Item";
import CreateGroupForm from "./components/CreateGroupForm";

// import Group from "./components/Group";

export default function App() {
  const newGroupModal = useRef<ModalHandles>();
  const groupModal = useRef<ModalHandles>();
  const [data, setData] = useState<Group[]>(getLocalStorageData() === null ? [] : getLocalStorageData()!);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  function handleSetActiveGroup(groupName: string) {
    setActiveGroup(groupName);
    groupModal.current?.open();
  }

  function handleRemoveActiveGroup() {
    setActiveGroup(null);
    groupModal.current?.close();
  }

  function handleCreateNewGroup() {
    setData(getLocalStorageData()!);
    newGroupModal.current?.close();
  }

  return (
    <div className="w-[26rem] h-[35rem]">
      <Modal ref={newGroupModal} heading="Create New Group">
        <CreateGroupForm onSubmit={handleCreateNewGroup} />
      </Modal>
      <Modal ref={groupModal} onClose={handleRemoveActiveGroup} heading={activeGroup!}>
        {activeGroup}
      </Modal>

      <div className="flex gap-4 p-2">
        {data.map((group, i) => (
          <Item key={i} title={group.name} bgColor={group.color} onSetActiveGroup={handleSetActiveGroup} />
        ))}
        <button className="flex flex-col justify-center items-center w-fit" onClick={() => newGroupModal.current?.open()} tabIndex={-1}>
          <div className="h-14 w-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#eeeeee" }}>
            <i className="bi bi-plus-square text-3xl" />
          </div>
          <p className="w-14 truncate">Create Group</p>
        </button>
      </div>
    </div>
  );
}
