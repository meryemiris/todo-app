import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

const imagePath = "/image.svg";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p={5}
      minH="100vh"
      bg={`url('${imagePath}') center/cover no-repeat fixed ${
        colorMode === "light" ? "#f8f9fa" : "#212529"
      }`}
    >
      {children}
    </Box>
  );
};

export default BackgroundWrapper;
