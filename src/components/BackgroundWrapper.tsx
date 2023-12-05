import { Box, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}
const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800"); // Adjust as needed
  const lightImage = "/light.svg";
  const darkImage = "/dark.svg";
  return (
    <Box
      minH="100vh"
      bg={bgColor}
      backgroundImage={`url('${
        colorMode === "light" ? lightImage : darkImage
      }')`}
      backgroundSize="fit"
      backgroundPosition="center"
    >
      {children}
    </Box>
  );
};

export default BackgroundWrapper;
