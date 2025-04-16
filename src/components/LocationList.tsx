"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Box,
  Heading,
  Container,
  Button,
  Flex,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Collapse,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MarkerData } from "@/types/map";

const LocationList: React.FC = () => {
  const storeKonumlar = useSelector((state: RootState) => state.marker.markers);
  const [konumlar, setKonumlar] = useState<MarkerData[]>([]);
  const [acikKonumID, setAcikKonumID] = useState<string | null>(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const localStorageKonumlar = JSON.parse(
      localStorage.getItem("markers") || "[]"
    );

    const benzersizKonumlar = new Map();

    storeKonumlar.forEach((konum) => {
      benzersizKonumlar.set(konum.id, konum);
    });

    localStorageKonumlar.forEach((konum: MarkerData) => {
      if (!benzersizKonumlar.has(konum.id)) {
        benzersizKonumlar.set(konum.id, konum);
      }
    });

    setKonumlar(Array.from(benzersizKonumlar.values()));
  }, [storeKonumlar]);

  const toggleKonumDetay = (id: string) => {
    if (acikKonumID === id) {
      setAcikKonumID(null);
    } else {
      setAcikKonumID(id);
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
          href="/add-location"
          alignSelf="flex-end"
        >
          Yeni Konum Ekle
        </Button>
      </Flex>

      <Button as="a" href="/show-rota" w="100%">
        {" "}
        Rota Göster
      </Button>

      {konumlar.length === 0 ? (
        <Box p={8} textAlign="center" bg={bgColor} rounded="md" shadow="md">
          <Text fontSize="lg">Henüz kaydedilmiş konum bulunmamaktadır.</Text>
          <Button as="a" href="/add-location" colorScheme="teal" mt={4}>
            Konum Ekle
          </Button>
        </Box>
      ) : (
        <List spacing={3}>
          {konumlar.map((konum) => (
            <ListItem
              key={konum.id}
              bg={bgColor}
              rounded="md"
              shadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
            >
              <Box p={4}>
                <Flex justifyContent="space-between" alignItems="center">
                  <HStack
                    spacing={3}
                    onClick={() => toggleKonumDetay(konum.id)}
                    cursor="pointer"
                  >
                    <Box
                      width="24px"
                      height="24px"
                      borderRadius="50%"
                      bg={konum.color}
                      border="1px solid"
                      borderColor={borderColor}
                    />
                    <Text fontWeight="medium">{konum.name}</Text>
                  </HStack>

                  <Link href={`/update-location/${konum.id}`} passHref>
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

                <Collapse in={acikKonumID === konum.id} animateOpacity>
                  <Box pt={4} pl={8}>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm">
                        <strong>Enlem:</strong> {konum.lat.toFixed(5)}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Boylam:</strong> {konum.lng.toFixed(5)}
                      </Text>
                    </VStack>
                  </Box>
                </Collapse>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default LocationList;
