import {
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

import React, { useEffect, useState } from "react";
const HeroSection = () => {
  const btnColor = useColorModeValue("transparent", "secondary");
  const [hasUID, setHasUID] = useState(false);

  useEffect(() => {
    let uid = getCookie("uid");
    uid ? setHasUID(true) : setHasUID(false);
  }, []);

  return (
    <Container
      maxW={"container.lg"}
      pb={{ base: "8", md: "16" }}
      pt={{ base: "7rem", md: "10rem" }}
    >
      {/* <FloatingBallsBackground /> */}
      <Flex
        flexDir={{ base: "column-reverse", md: "row" }}
        gap="6"
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <VStack gap="4" alignItems={"flex-start"} w={{ md: "50%" }}>
          <Grid minH={{base: "15.5ch", xl: "35ch"}} alignItems={"center"}>
            <TypewriterHeading />
          </Grid>
          {/* <Heading fontSize={"clamp(2.5rem, 5vw, 4rem)"}>
            Where{" "}
            <Text as="span" color={"accentVar"}>
              Elite
            </Text>{" "}
            Students Thrive
          </Heading> */}
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
        <Box w={{ base: "70%", md: "40%" }} pos="relative">
          <Img src="/images/4x/hero_pic.png" />
          {/* <Box
            width="100px"
            height="100px"
            borderRadius="50%"
            pos="absolute"
            top={"0"}
            right={"0"}
            background="linear-gradient(145deg,  #191970, #008080)"
            boxShadow="9px 9px 16px #bebebe, -9px -9px 16px #ffffff"
          /> */}
          <Box
            pos={"absolute"}
            right={{ base: "10", md: "12", lg: "14" }}
            as={Grid}
            placeItems={"center"}
            top="31%"
            h="55%"
            w="15%"
          >
            <RotatingImageBox />
          </Box>
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

const RotatingImageBox = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="image-container">
      {images.map((image, index) => (
        <Img
          key={index}
          src={image}
          w={{ base: "70%", md: "full" }}
          alt={`Rotating image ${index + 1}`}
          className={`image ${
            currentImageIndex === index ? "visible" : "hidden"
          }`}
        />
      ))}
    </Box>
  );
};
// export default FloatingBallsBackground;
