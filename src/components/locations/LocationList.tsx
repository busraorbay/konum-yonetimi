import { useState } from "react";
import {
  Heading,
  Container,
  Button,
  Flex,
  Text,
  List,
  ListItem,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { MarkerData } from "@/types/map";
import { LocationCard } from "./LocationCard";

interface LocationListProps {
  locations: MarkerData[];
}

export const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);
  const bgColor = useColorModeValue("white", "gray.800");

  const toggleLocationDetail = (id: string) => {
    if (openLocationId === id) {
      setOpenLocationId(null);
    } else {
      setOpenLocationId(id);
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">
          Kaydedilen Konumlar
        </Heading>

        <Button
          leftIcon={<FaPlus />}
          colorScheme="blue"
          as="a"
          href="/locations/add"
          alignSelf="flex-end"
        >
          Yeni Konum Ekle
        </Button>
      </Flex>

      <Button as="a" href="/routes" w="100%" mb={6}>
        Rota Göster
      </Button>

      {locations.length === 0 ? (
        <Box p={8} textAlign="center" bg={bgColor} rounded="md" shadow="md">
          <Text fontSize="lg">Henüz kaydedilmiş konum bulunmamaktadır.</Text>
          <Button as="a" href="/locations/add" colorScheme="teal" mt={4}>
            Konum Ekle
          </Button>
        </Box>
      ) : (
        <List spacing={3}>
          {locations.map((location) => (
            <ListItem key={location.id}>
              <LocationCard
                location={location}
                isOpen={openLocationId === location.id}
                onToggle={() => toggleLocationDetail(location.id)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
