import { Flex, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Flex mb={2} mt={3}>
      <HStack alignItems="center">{children}</HStack>
    </Flex>
  );
};

export default Navbar;
