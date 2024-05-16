import { Modal } from "flowbite-react";
import SmallButton from "../SmallButton";
import RulerIcon from "../icons/Ruler";
import LuaImage from "../../assets/lua.png";
import SmallPlus from "../icons/SmallPlus";

interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  editorValue: string;
  setEditorValue: (value: string) => void;
  loadCode: () => void;
}

export default function EditorModal({
  openModal,
  setOpenModal,
  editorValue,
  setEditorValue,
  loadCode,
}: Props) {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="h-full w-full flex font-dm-sans">
          <div className="w-3/5 border-black rounded-xl border-1 overflow-hidden relative">
            <textarea
              className="w-full h-full min-h-96 border-none focus-within:ring-0"
              onChange={(e: any) => {
                setEditorValue(e.target.value);
              }}
              defaultValue={editorValue}
            ></textarea>
            {editorValue === "" && (
              <span className="absolute top-3 right-3 text-xs flex items-center justify-center gap-3 cursor-pointer hover:underline">
                <RulerIcon />
                Paste from Clipboard
              </span>
            )}
          </div>
          <div className="w-2/5 px-2 flex flex-col">
            <img src={LuaImage} alt="LuaImage" className="w-8" />
            <h3 className="font-semibold mt-1">Code Editor</h3>
            <p className="mt-2 font-light">
              Copy and paste Lua code into editor and make edits.
            </p>
            <p className="mt-2 font-light">
              When done you can click upload to process.
            </p>

            <div className=" mt-auto">
              <SmallButton
                IconComponent={SmallPlus}
                text="Upload to Process"
                handleClick={loadCode}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
