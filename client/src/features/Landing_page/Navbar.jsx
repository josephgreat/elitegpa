import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { getCookie } from "../../utils";
import { isAuth } from "../../services";

const Navbar = () => {
  const isLgscreen = useBreakpointValue({ md: true });
  const logo = useColorModeValue("logo.png", "logoalt.png");
  const btnColor = useColorModeValue("transparent", "secondary");
  const bgColor = useColorModeValue("secondary", "#121212");
  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(200,200,200, .3)"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to track if navbar should be fixed
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    isAuth() ? setIsAuthenticated(true) : setIsAuthenticated(false);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Fix navbar after scrolling past the window height
      if (scrollPosition > windowHeight) {
        setIsFixed(true); // Fix the navbar after scrolling past window height
      } else {
        setIsFixed(false); // Unfix when above the threshold
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation variants for the fade-in effect
  const navbarVariants = {
    initial: { opacity: 1 }, // Visible initially
    fixed: {
      opacity: 1, // Fade to fully visible when fixed
      transition: { duration: 0.5 }, // Duration of the fade-in
    },
    hidden: {
      opacity: 0, // Transparent when not fixed
    },
  };

  return (
    // Use motion.div for the animated navbar
    <motion.div
      initial="initial" // Start as visible
      animate={isFixed ? "fixed" : "initial"} // Animate only when fixed
      variants={navbarVariants} // Apply the animation variants
    >
      <Box
        pos={isFixed ? "fixed" : "relative"} // Change position dynamically
        top="0"
        left="0"
        bg={isFixed && bgColor}
        zIndex="20"
        w="100%"
        transition="all 0.3s ease" // Smooth transition when changing position
        boxShadow={isFixed ? `0 0 4px ${shadowColor}` : "none"} // Add shadow when fixed
      >
        <Container
          maxW="container.lg"
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          py="4"
        >
          <Heading
            w={"clamp(5rem, 10vw, 6rem)"}
            fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
            mb="3"
            as="h1"
          >
            <Img
              alt="eliteGPA logo - transparent GPA calculator logo"
              w="100%"
              src={`/images/4x/${logo}`}
            />
          </Heading>
          {isLgscreen && (
            <HStack
              alignItems={"center"}
              textTransform={"uppercase"}
              fontSize={".8rem"}
              letterSpacing={".2rem"}
              fontWeight={"bold"}
              gap="6"
            >
              <Link href="#features">Features</Link>
              <Link href="#howitworks">How it works</Link>
              <Link href="#faq">faq</Link>
            </HStack>
          )}
          <Flex>
            <Button
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                borderRadius: "md",
                padding: "2px",
                background: "linear-gradient(to right, #191970, #008080)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              }}
              bgGradient={"linear(to-r, #191970, #008080)"}
              color="secondary"
              fontWeight={"bold"}
              textTransform={"uppercase"}
              p={{ base: "3" }}
              h="auto"
              fontSize={"clamp(.6rem, 4vw, .8rem)"}
              letterSpacing={".1rem"}
              _hover={{ bgClip: "text", color: btnColor }}
              transition={"all .3s ease"}
              as={RouteLink}
              to={isAuthenticated ? "/my-gpas" : "/signup"}
            >
              {isAuthenticated ? "Visit Dashboard" : "Join the elites"}
            </Button>
          </Flex>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Navbar;
