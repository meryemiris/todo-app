import { useCheckbox, chakra, Flex } from "@chakra-ui/react";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  props: CustomCheckboxProps
) => {
  const { state, getCheckboxProps, getInputProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="36"
      bg={state.isChecked ? "green.500" : "red.500"}
      rounded="full"
      px={2}
      py={2}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        borderColor={state.isChecked ? "green.500" : "gray.500"}
        {...getCheckboxProps()}
      ></Flex>
    </chakra.label>
  );
};

export default CustomCheckbox;
