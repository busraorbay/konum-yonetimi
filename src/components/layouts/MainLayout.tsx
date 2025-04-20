import { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={4}>
        {children}
      </Container>
    </Box>
  );
};
