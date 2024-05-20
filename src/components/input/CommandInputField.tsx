import { CustomFlowbiteTheme, Flowbite, TextInput } from "flowbite-react";
import { useEffect, useRef } from "react";

const customTheme: CustomFlowbiteTheme = {
  textInput: {
    field: {
      input: {
        colors: {
          customColor:
            "ring-0 focus:ring-0 bg-transparent p-0 m-0 min-h-0 border-none h-full",
        },
      },
    },
  },
};

export default function CommandInputField(props: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef.current]);
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <TextInput
        disabled={props.mode && props.mode !== "process"}
        ref={inputRef}
        color="customColor"
        autoFocus
        {...props}
      />
    </Flowbite>
  );
}
