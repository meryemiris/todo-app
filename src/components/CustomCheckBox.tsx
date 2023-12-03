import { useCheckbox, chakra, Tooltip } from "@chakra-ui/react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  const { getInputProps } = useCheckbox(props);

  return (
    <Tooltip label="done" openDelay={500}>
      <chakra.label
        rounded="full"
        border="2px solid"
        borderColor="gray.800"
        cursor="pointer"
        px={1.5}
        py={1.5}
      >
        <input {...getInputProps()} />
      </chakra.label>
    </Tooltip>
  );
};

export default CustomCheckbox;
