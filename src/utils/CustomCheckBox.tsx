import {
  useCheckbox,
  chakra,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  const { getInputProps } = useCheckbox(props);

  const checkboxColor = useColorModeValue("gray.900", "gray.200");

  return (
    <Tooltip label="done" openDelay={500}>
      <chakra.label
        mt={1}
        rounded="full"
        border="2px solid"
        borderColor={checkboxColor}
        cursor="pointer"
        px={1.5}
        py={1.5}
        backgroundColor={props.isChecked ? checkboxColor : "transparent"}
      >
        <input {...getInputProps()} />
      </chakra.label>
    </Tooltip>
  );
};

export default CustomCheckbox;
