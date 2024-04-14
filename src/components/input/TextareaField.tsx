import { CustomFlowbiteTheme, Flowbite, Textarea } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
    textarea: {
        colors: {
            customColor: "border-gray-300 bg-gray-50 text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500",
        }
    }
};

export default function TextareaField(props: any) {
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <Textarea
                color="customColor"
                {...props}
            />
        </Flowbite>
    )
}