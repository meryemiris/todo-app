import { Button, Flex, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import ToggleTheme from "./ToggleTheme";

interface NavbarProps {
  children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Flex mb={2} mt={3}>
      <HStack alignItems="center">
        <Button colorScheme="pink">Random TODO</Button>
        {children}
        <ToggleTheme />
      </HStack>
    </Flex>
  );
};

export default Navbar;
