import { useRef, useState } from "react";
import "../index.css";
import Modal, { ModalHandles } from "./components/Modal";
import { addGroup, getLocalStorageData } from "./tools/data";

export default function App() {
  const newGroupModal = useRef<ModalHandles>();
  const [groupName, setGroupName] = useState<string>("");

  function handleUpdateGroupName(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addGroup(groupName);
  }

  return (
    <div className="w-[26rem] h-[35rem]">
      <Modal ref={newGroupModal}>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleUpdateGroupName} />
          <button type="submit">Add</button>
        </form>
      </Modal>
      <button onClick={() => newGroupModal.current?.open()}>Create Group</button>
      {getLocalStorageData() && getLocalStorageData()?.map((group, i) => <div key={i}>{group.name}</div>)}
    </div>
  );
}
