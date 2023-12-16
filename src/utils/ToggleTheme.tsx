import {
  useColorMode,
  IconButton,
  Tooltip,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("gray.200", "gray.50");

  return (
    <Flex justifyContent={"flex-end"} mr={5}>
      <Tooltip
        label="Toggle Theme"
        placement="auto-start"
        aria-label="A tooltip"
        openDelay={300}
      >
        <IconButton
          fontSize={"xl"}
          borderRadius="full"
          variant="ghost"
          aria-label="color mode button"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          color={iconColor}
          onClick={toggleColorMode}
        />
      </Tooltip>
    </Flex>
  );
}
