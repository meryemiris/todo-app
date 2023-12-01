import { useCheckbox, chakra, Tooltip } from "@chakra-ui/react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  const { state, getInputProps } = useCheckbox(props);

  return (
    <Tooltip label="done" openDelay={500}>
      <chakra.label
        bg={state.isChecked ? "green.500" : "yellow.100"}
        rounded="full"
        px={2}
        py={2}
        cursor="pointer"
      >
        <input {...getInputProps()} />
      </chakra.label>
    </Tooltip>
  );
};

export default CustomCheckbox;
