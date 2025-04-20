import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  useToast,
  Container,
  Heading,
} from "@chakra-ui/react";
import { MarkerData } from "@/types/map";
import { CloseButton } from "@chakra-ui/react";

interface LocationFormProps {
  initialData?: MarkerData;
  onSubmit: (name: string, color: string) => void;
  title: string;
  submitButtonText: string;
  onClose: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  initialData,
  onSubmit,
  title,
  submitButtonText,
  onClose, // Yeni eklenen prop
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [color, setColor] = useState(initialData?.color || "#ff0000");
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name, color);
      toast({
        title: "İşlem başarılı",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Konum adı gerekli",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h4" size="md" textAlign="center">
          {title}
        </Heading>
        <CloseButton
          size="md"
          position="absolute"
          right="8px"
          top="8px"
          onClick={onClose} // Sadece onClose fonksiyonunu çağırıyoruz
        />
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg="white"
          position="relative"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Konum Adı</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Konum adını girin"
                />
              </FormControl>

              <FormControl id="color">
                <FormLabel>Konum Rengi</FormLabel>
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </FormControl>

              {initialData && (
                <HStack spacing={4} justify="space-between">
                  <Box>
                    <Text fontWeight="bold">Enlem:</Text>
                    <Text>{initialData.lat.toFixed(5)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Boylam:</Text>
                    <Text>{initialData.lng.toFixed(5)}</Text>
                  </Box>
                </HStack>
              )}

              <HStack spacing={4} pt={4} justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  İptal
                </Button>
                <Button colorScheme="blue" type="submit">
                  {submitButtonText}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};
