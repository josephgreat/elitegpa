import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const TestimonialsSection = () => {
  const bgColor = useColorModeValue("secondary", "#1a202c");

  return (
    <Box bg="#0080801a" py={20}>
      <Container maxW="container.lg">
        <Heading
          textAlign="center"
          mb="10"
          pos="relative"
          // textAlign="center"
          overflow={"hidden"}
          _before={{
            content: "'elites comment'",
            pos: "absolute",
            top: "0",
            left: "0",
            w: "100%",
            transform: "scale(1.2)",
            bgGradient: "linear(to-r, #191970, #008080)",
            bgClip: "text",
            textTransform: "uppercase",
            // color: "accentVar",
            zIndex: "-1",
        animation: "gradient-border 5s ease infinite",

            opacity: ".2",
            letterSpacing: { base: ".1rem", md: ".5rem" },
          }}
        >
          Elites Comment
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
          {[
            {
              name: "John Doe",
              feedback: "eliteGPA has revolutionized my study habits!",
              rating: 5,
            },
            {
              name: "Jane Smith",
              feedback: "The predictive analysis is spot on.",
              rating: 4,
            },
          ].map((testimonial, index) => (
            <Box key={index} p={5} bg={bgColor} shadow="md" borderRadius="md">
              <Text fontSize="lg">"{testimonial.feedback}"</Text>
              <Text mt={4} fontWeight="bold">
                {testimonial.name}
              </Text>
              <Text color="yellow.500">{"★".repeat(testimonial.rating)}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
