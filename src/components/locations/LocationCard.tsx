import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Collapse,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { MarkerData } from "@/types/map";

interface LocationCardProps {
  location: MarkerData;
  isOpen: boolean;
  onToggle: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  isOpen,
  onToggle,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      rounded="md"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={3} onClick={onToggle} cursor="pointer">
            <Box
              width="24px"
              height="24px"
              borderRadius="50%"
              bg={location.color}
              border="1px solid"
              borderColor={borderColor}
            />
            <Text fontWeight="medium">{location.name}</Text>
          </HStack>

          <Link href={`/locations/update/${location.id}`} passHref>
            <Button
              as="a"
              variant="ghost"
              colorScheme="blue"
              rightIcon={<ChevronRightIcon />}
              size="sm"
            >
              Düzenle
            </Button>
          </Link>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pt={4} pl={8}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm">
                <strong>Enlem:</strong> {location.lat.toFixed(5)}
              </Text>
              <Text fontSize="sm">
                <strong>Boylam:</strong> {location.lng.toFixed(5)}
              </Text>
            </VStack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
