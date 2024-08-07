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
import { getCookie } from "../../utils";

const Navbar = () => {
  const isLgscreen = useBreakpointValue({ md: true });
  const logo = useColorModeValue("logo.png", "logoalt.png");
  const btnColor = useColorModeValue("transparent", "secondary");
  const bgColor = useColorModeValue("secondary", "#1a202c");
  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(200,200,200, .3)"
  );
  const [hasUID, setHasUID] = useState(false);

  useEffect(() => {
    let uid = getCookie("uid");
    uid ? setHasUID(true) : setHasUID(false);
  }, []);

  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      bg={bgColor}
      shadow={`0 0 4px ${shadowColor}`}
      zIndex="20"
      w="100%"
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
          // color={{ base: "secondary" }}
          as="h1"
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
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
            // _hover={{ color: "secondary", bgClip: "unset" }}
            // transition={"all .3s ease"}
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: "md", // Adjust border radius as needed
              padding: "2px", // Adjust padding to control border thickness
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
            to={hasUID ? "/my-gpas" : "/signup"}
          >
            {hasUID ? "Visit Dashboard" : "Join the elites"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
