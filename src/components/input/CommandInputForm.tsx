import { CommandInputField } from ".";
import PreDefinedCommands from "../PreDefinedCommands";
import SmallButton from "../SmallButton";
import StatusLoadingIcon from "../icons/StatusLoadingIcon";

interface CommandInputFormProps {
  handleRunCommand: (e: React.FormEvent<HTMLFormElement>) => void;
  processId: string | undefined;
  mode: "starter" | "process";
  sendingCommand: boolean;
  showPreDefinedCommands: boolean;
  setShowPreDefinedCommands: (value: boolean) => void;
  setSendingCommand: (value: boolean) => void;
  setUserCommand: (value: string) => void;
  setUserCommandResult: (value: any) => void;
  setCommandToRun: (value: string) => void;
  prompt: string;
  commandToRun: string;
  handleKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function CommandInputForm({
  handleRunCommand,
  processId,
  mode,
  sendingCommand,
  showPreDefinedCommands,
  setShowPreDefinedCommands,
  setSendingCommand,
  setUserCommand,
  setUserCommandResult,
  setCommandToRun,
  prompt,
  commandToRun,
  handleKeyUp,
}: CommandInputFormProps) {
  return (
    <form
      onSubmit={handleRunCommand}
      className={`relative flex gap-2 border transition-colors border-gray rounded-lg focus-within:border-primary-dark focus-within:ring-2 ring-offset-2 focus-within:bg-white ${
        mode === "starter" ? "select-none pointer-events-none opacity-50" : ""
      }`}
    >
      {sendingCommand && (
        <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm">
          Processing...
        </span>
      )}

      <PreDefinedCommands
        isOpen={showPreDefinedCommands}
        setIsOpen={setShowPreDefinedCommands}
        setSendingCommand={setSendingCommand}
        setUserCommand={setUserCommand}
        setUserCommandResult={setUserCommandResult}
        setCommandToRun={setCommandToRun}
      />

      <label htmlFor="runCommandInput" className="relative flex-grow h-full">
        <span className="absolute left-3 top-0 bottom-0 flex items-center">
          {prompt || "aos> "}
        </span>
        <CommandInputField
          key={processId}
          name="runCommandInput"
          mode={mode}
          className="w-full h-full pl-13 bg-transparent resize-none outline-none min-h-0 overflow-hidden"
          spellCheck="false"
          onChange={(e: any) => setCommandToRun(e.target.value)}
          value={commandToRun}
          onKeyUp={handleKeyUp}
        />
      </label>

      <div className="p-1.5">
        {sendingCommand ? (
          <div className="pointer-events-none select-none">
            <SmallButton
              text="run"
              type="submit"
              IconComponent={StatusLoadingIcon}
            />
          </div>
        ) : (
          <SmallButton text="run" type="submit" />
        )}
      </div>
    </form>
  );
}
