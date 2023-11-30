import { useCheckbox, chakra } from "@chakra-ui/react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  const { state, getInputProps } = useCheckbox(props);

  return (
    <chakra.label
      bg={state.isChecked ? "green.500" : "gray.300"}
      rounded="full"
      px={2}
      py={2}
      cursor="pointer"
    >
      <input {...getInputProps()} />
    </chakra.label>
  );
};

export default CustomCheckbox;
