import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Stack,
  Link,
  Input,
  Img,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// import { FaCheckCircle } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";
import {
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  Navbar,
  TestimonialsSection,
} from "../components/Landing_page";
import "../components/Landing_page/keyframes.css";
import { FaEnvelope } from "react-icons/fa6";

// const HeroSection = () => (
//   <Box bg="blue.600" color="white" py={20} textAlign="center">
//     <Container maxW="container.lg">
//       <Heading fontSize="4xl">Elevate Your Academic Journey with eliteGPA</Heading>
//       <Text mt={4} fontSize="xl">The ultimate tool for GPA calculations and educational success.</Text>
//       <Button mt={8} colorScheme="teal" size="lg">Get Started</Button>
//     </Container>
//   </Box>
// );



const PricingSection = () => (
  <Container maxW="container.lg" py={20}>
    <Heading textAlign="center">Affordable Plans for Every Student</Heading>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
      {[
        { plan: "Free Plan", price: "$0", features: ["Basic features"] },
        {
          plan: "Premium Plan",
          price: "$10/month",
          features: ["Advanced features"],
        },
      ].map((item, index) => (
        <Box
          key={index}
          p={5}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Heading fontSize="xl">{item.plan}</Heading>
          <Text fontSize="2xl" color="teal.500">
            {item.price}
          </Text>
          <VStack align="start" mt={4}>
            {item.features.map((feature, idx) => (
              <Text key={idx}>- {feature}</Text>
            ))}
          </VStack>
          <Button mt={4} colorScheme="teal">
            Choose Plan
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  </Container>
);

const FAQSection = () => (
  <Container maxW="container.lg" py={20}>
    <Heading textAlign="center">Frequently Asked Questions</Heading>
    <Accordion allowToggle mt={10}>
      {[
        {
          question: "How do I sign up?",
          answer: 'Click the "Sign Up" button and follow the instructions.',
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we use industry-standard security measures.",
        },
      ].map((faq, index) => (
        <AccordionItem key={index}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {faq.question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </Container>
);

const Footer = () => (
  <Box bg="gray.900" color="white" py={4}>
    <Container maxW="container.lg" fontSize={".8rem"}>
      <Flex alignItems={"center"} opacity={".7"} justifyContent={"space-around"} flexDir={{base: "column-reverse", md: "row"}} gap="4">
        <Flex alignItems="center" gap="4" flexWrap={'wrap'} justifyContent={"center"} textAlign={"center"}>
          <Heading
            w={"clamp(5rem, 10vw, 6rem)"}
            fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
            mb="4"
          >
            <Img alt="eliteGPA" w="100%" src={`/images/4x/logoalt.png`} />
          </Heading>
          <Text>
            Copyright &copy;{new Date().getFullYear()} emJoeTech. All rights
            reserved
          </Text>
        </Flex>
        <Text as={Flex} gap="2" alignItems={"center"}>
          <FaEnvelope /> emjoetech@gmail.com
        </Text>
      </Flex>
    </Container>
  </Box>
);

const LandingPage = () => (
  <Box>
    <Navbar />
    <HeroSection />
    {/* <Box py="8" opacity={".1"} transform={"rotate(5deg)"} bgGradient="linear(0deg, transparent, #191970, #008080, transparent)" w="100%">

    </Box> */}
    <FeaturesSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PricingSection />
    <FAQSection />
    <Footer />
  </Box>
);

export default LandingPage;
