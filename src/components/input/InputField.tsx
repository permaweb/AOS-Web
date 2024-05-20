import { CustomFlowbiteTheme, Flowbite, TextInput } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  textInput: {
    field: {
      input: {
        colors: {
          customColor:
            "border-gray-300 bg-gray-50 text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500",
        },
      },
    },
  },
};

export default function InputField(props: any) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <TextInput color="customColor" {...props} />
    </Flowbite>
  );
}
