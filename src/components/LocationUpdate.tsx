"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MarkerData } from "@/types/map";
import { updateMarker } from "@/store/markerSlice";

const LocationUpdate = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const konumId = params?.id as string;

  const [konum, setKonum] = useState<MarkerData | null>(null);
  const [konumAdi, setKonumAdi] = useState("");
  const [konumRenk, setKonumRenk] = useState("#ff0000");

  useEffect(() => {
    try {
      const tumKonumlar = JSON.parse(localStorage.getItem("markers") || "[]");
      const bulunanKonum = tumKonumlar.find(
        (k: MarkerData) => k.id === konumId
      );

      if (bulunanKonum) {
        setKonum(bulunanKonum);
        setKonumAdi(bulunanKonum.name);
        setKonumRenk(bulunanKonum.color);
      } else {
        toast({
          title: "Konum bulunamadı",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error) {
      console.error("Konum yüklenirken hata:", error);
      toast({
        title: "Konum yüklenirken hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
    }
  }, [konumId, router, toast]);

  const handleKaydet = () => {
    if (!konum) return;

    try {
      const guncelKonum = {
        ...konum,
        name: konumAdi,
        color: konumRenk,
      };

      const tumKonumlar = JSON.parse(localStorage.getItem("markers") || "[]");
      const yeniKonumlar = tumKonumlar.map((k: MarkerData) =>
        k.id === konumId ? guncelKonum : k
      );
      localStorage.setItem("markers", JSON.stringify(yeniKonumlar));

      dispatch(updateMarker(guncelKonum));

      toast({
        title: "Konum güncellendi",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/");
    } catch (error) {
      console.error("Konum güncellenirken hata:", error);
      toast({
        title: "Konum güncellenirken hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!konum) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text>Konum bulunamadı</Text>
        <Button onClick={() => router.push("/")} colorScheme="blue" mt={4}>
          Konumlara Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Konum Düzenle
        </Heading>

        <Box
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg="white"
        >
          <VStack spacing={4} align="stretch">
            <FormControl id="name">
              <FormLabel>Konum Adı</FormLabel>
              <Input
                value={konumAdi}
                onChange={(e) => setKonumAdi(e.target.value)}
                placeholder="Konum adını girin"
              />
            </FormControl>

            <FormControl id="color">
              <FormLabel>Konum Rengi</FormLabel>
              <Input
                type="color"
                value={konumRenk}
                onChange={(e) => setKonumRenk(e.target.value)}
              />
            </FormControl>

            <HStack spacing={4} justify="space-between">
              <Box>
                <Text fontWeight="bold">Enlem:</Text>
                <Text>{konum.lat.toFixed(5)}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Boylam:</Text>
                <Text>{konum.lng.toFixed(5)}</Text>
              </Box>
            </HStack>

            <HStack spacing={4} pt={4} justify="flex-end">
              <Button variant="outline" onClick={() => router.push("/")}>
                İptal
              </Button>
              <Button colorScheme="blue" onClick={handleKaydet}>
                Değişiklikleri Kaydet
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LocationUpdate;
