import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { colorMode } = useColorMode();
  const imagePath = "/image.svg";

  return (
    <Box
      p={5}
      minH="100vh"
      bg={`url('${imagePath}') center/cover no-repeat fixed ${
        colorMode === "light" ? "#F8EDEB" : "#212529"
      }`}
    >
      {children}
    </Box>
  );
};

export default BackgroundWrapper;
