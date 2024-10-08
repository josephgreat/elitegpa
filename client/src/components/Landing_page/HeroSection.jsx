import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Img,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import "./TypewriterHeading.css";

import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
const HeroSection = () => {
  const btnColor = useColorModeValue("transparent", "secondary");
  const [hasUID, setHasUID] = useState(false);

  useEffect(() => {
    let uid = getCookie("uid");
    uid ? setHasUID(true) : setHasUID(false);
  }, []);
  const boxVariants = {
    animate: {
      opacity: [1, 0.5, 1], // Blink effect: fade in and out
      scale: [1, 1.05, 1], // Slow scaling effect: scale up and down slightly
      transition: {
        duration: 5, // Slow animation over 5 seconds
        repeat: Infinity, // Infinite repeat
        repeatType: "loop", // Loop the animation
      },
    },
  };

  return (
    <Container
      maxW={"container.lg"}
      pb={{ base: "5", md: "16" }}
      mb={{ base: "48", md: "unset" }}
      pos="relative"
      pt="4"
      top={{ md: "-3rem" }}
      // pt={{ base: "7rem", md: "-3rem" }}
    >
      {/* <FloatingBallsBackground /> */}
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap="6"
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <VStack gap="4" alignItems={"flex-start"} w={{ md: "50%" }}>
          <Grid minH={{ base: "16ch", xl: "25ch" }} alignItems={"center"}>
            <TypewriterHeading />
          </Grid>

          <Text>
            Get Accurate GPA Calculations and Clear Performance Insights.
            Enhance Your Learning with Easy-to-Use GPA Tracking
          </Text>
          <Button
            mt="6"
            bgGradient={"linear(to-r, #191970, #008080)"}
            bgClip={"text"}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: "md", // Adjust border radius as needed
              padding: "2px", // Adjust padding to control border thickness
              background: "linear-gradient(45deg, #191970, #008080)",
              animation: "gradient-border 3s ease infinite",
              bgSize: "200% 200%",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              mask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            fontSize={".8rem"}
            letterSpacing={".1rem"}
            color={btnColor}
            _hover={{ color: "secondary", bgClip: "unset" }}
            transition={"all .3s ease"}
            as={RouteLink}
            to={hasUID ? "/my-gpas" : "/signup"}
          >
            {hasUID ? "Get Jiggy Elite" : "Become an elite"}
          </Button>
        </VStack>
        <Box
          w={{ base: "50%", md: "30%" }}
          pos={{ base: "absolute", md: "relative" }}
          top={{ base: "70%", md: "unset" }}
          right={{ base: "0", md: "unset" }}
          overflow={"hidden"}
        >
          <motion.div variants={boxVariants} animate="animate">
            <Img
              src="/images/advert.png"
              w="100%"
              h="100%"
              alt="Hero Animation"
              overflow="visible"
            />
          </motion.div>
        </Box>
      </Flex>
    </Container>
  );
};

export default HeroSection;

import "./FloatingBallsBackground.css";
import { getCookie } from "../../utils";
import TypewriterHeading from "./TypewriterHeading";
const images = ["/images/4x/logoalt.png", "/images/4x/logo.png"];

// export default FloatingBallsBackground;
