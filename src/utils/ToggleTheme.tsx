import { useColorMode, IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={"flex-end"} mr={5}>
      <Tooltip
        label="Toggle Theme"
        placement="auto-start"
        aria-label="A tooltip"
        openDelay={500}
      >
        <IconButton
          borderRadius="full"
          variant="ghost"
          aria-label="color mode button"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          color={"white"}
          onClick={toggleColorMode}
        />
      </Tooltip>
    </Flex>
  );
}
