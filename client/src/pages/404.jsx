import { Box, Grid, Heading, Text, Link, Img, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

const NotFound = () => {
  const logo = useColorModeValue("logo.png", "logoalt.png");

  return (
    <Grid textAlign={"center"} minH={"100vh"} placeItems={"center"}>
      <Box>
        <Heading
          w={"clamp(5rem, 10vw, 6rem)"}
          display={{ base: "block", md: "none" }}
          fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
          mb="10"
          mx="auto"
          // color={{ base: "secondary" }}
          as={RouteLink}
          to="/"
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
        </Heading>
        <Heading as="h2">Oops! Broken Link</Heading>
        <Text>
          This page is not available on elitegpa. <br />
          <Link as={RouteLink} to="/" textDecor={"underline"}>
            Check our homepage
          </Link>
        </Text>
      </Box>
    </Grid>
  );
};

export default NotFound;
