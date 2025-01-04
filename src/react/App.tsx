import { useRef } from "react";
import "../index.css";
import Modal, { ModalHandles } from "./components/Modal";

export default function App() {
  const modal = useRef<ModalHandles>()

  return (
    <div className="w-[26rem] h-[35rem]">
      <Modal ref={modal}>Hello world</Modal>
      <button onClick={() => {modal.current!.open()}} className="p-2 bg-slate-400 transition-all hover:bg-slate-700">Click me</button>
    </div>
  );
}
