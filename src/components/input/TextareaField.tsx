import { CustomFlowbiteTheme, Flowbite, Textarea } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  textarea: {
    colors: {
      customColor: "border-none ring-0 focus:ring-0",
    },
  },
};

export default function TextareaField(props: any) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Textarea color="customColor" {...props} />
    </Flowbite>
  );
}
