import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const HowItWorksSection = () => (
  <Container maxW="container.lg" py={20} id="howitworks">
    <Heading
      textAlign="center"
      mb="10"
      pos="relative"
      // textAlign="center"
      overflow={"hidden"}
      _before={{
        content: "'how it works'",
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
        opacity: ".2",
        letterSpacing: {base: ".3rem", md:".5rem"},
      }}
    >
      How It Works
    </Heading>
    <VStack gap="8" w={{ md: "70vw" }} mx="auto">
      {/* <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}> */}
      {[
        {
          step: 1,
          title: "Sign Up",
          description: "Create your account.",
          img: "signup.png",
        },
        {
          step: 2,
          title: " Account Setup",
          description:
            " Select your institution, program type, and grade system.",
          img: "setup.png",
        },
        {
          step: 3,
          title: "Input Data",
          description: "Enter your academic records.",
          img: "input_data.png",
        },
        {
          step: 4,
          title: "Analyze",
          description: "Get instant GPA calculations and predictions.",
          img: "analyze.png"
        },
      ].map(({ step, img, title, description }, index) => (
        <Flex
          key={index}
          flexDir={index % 2 === 0 ? "row" : "row-reverse"}
          alignItems={"center"}
          gap={{ base: "8", md: "16" }}
        >
          <Box pos="relative" w={"clamp(5rem, 30vw, 15rem)"}>
            <Img
              src={`/images/4x/${img}`}
              pos="absolute"
              width="84%"
              height="93%"
              top="3.3%"
              left=" 8%"
              borderRadius="max(1.3vw, .5rem)"
            />
            <Img src="/images/4x/phone-straight.png" w="full" alt="phone" />
          </Box>
          <Box w="55vw" textAlign={index % 2 === 0 ? "left" : "right"}>
            <Heading fontSize="clamp(2rem, 7vw, 5rem)" color="accentVar">
              #{step}
            </Heading>
            <Heading fontSize="clamp(1.5rem, 4vw, 3rem)" mt={2}>
              {title}
            </Heading>
            <Text mt={2} fontSize="clamp(1rem, 3vw, 2rem)">
              {description}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>

    {/* </SimpleGrid> */}
  </Container>
);

export default HowItWorksSection;
