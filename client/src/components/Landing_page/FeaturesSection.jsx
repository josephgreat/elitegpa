import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiCalculator, BiSolidReport, BiUserCheck, BiUserPlus } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaCheckToSlot } from "react-icons/fa6";
import { motion } from "framer-motion";
const features = [
  {
    icon: BiCalculator,
    title: "Accurate GPA Calculations",
    description: "Ensure precise GPA tracking.",
  },
  {
    icon: AiOutlineLineChart,
    title: "Predictive Analysis",
    description: "Forecast future academic performance.",
  },
  {
    icon: BiUserCheck,
    title: "User-Friendly Interface",
    description: "Intuitive and easy to navigate.",
  },
  {
    icon: FaCheckToSlot,
    title: "Comprehensive Reports",
    description: "Detailed performance insights.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between each feature
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start off-screen
  show: { opacity: 1, y: 0 }, // Animate to visible
  exit: { opacity: 0, y: 50 }, // Animate out when scrolled away
};
const FeaturesSection = () => (
  <Container maxW="container.lg" py={20} id="features">
    <Heading
      pos="relative"
      textAlign="center"
      overflow={"hidden"}
      _before={{
        content: "'Features'",
        pos: "absolute",
        top: "0",
        left: "0",
        w: "100%",
        transform: "scale(1.2)",
        bgGradient: "linear(to-r, #191970, #008080)",
        bgClip: "text",
        textTransform: "uppercase",
       
        zIndex: "-1",
        opacity: ".2",
        letterSpacing: ".5rem",
        animation: "gradient-border 5s ease infinite",
      }}
      
    >
      Features
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}
      as={motion.div}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <VStack
          as={motion.div}
          key={index}
          align="center"
          variants={itemVariants}
        >
          <Icon as={feature.icon} boxSize={{ base: 12 }} color="teal.500" />
          <Box textAlign={"center"}>
            <Heading fontSize="xl">{feature.title}</Heading>
            <Text mt={2}>{feature.description}</Text>
          </Box>
        </VStack>
      ))}
    </SimpleGrid>
  </Container>
);

export default FeaturesSection;
