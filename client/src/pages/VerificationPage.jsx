import { Box, Grid, Heading, Link, Text, VStack, Img } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link as RouteLink } from "react-router-dom";

const VerificationPage = () => {
  return (
    <Grid w="100vw" h="100vh" placeItems={"center"}>
      <VStack>
        <FaCheckCircle size="5rem" color="green" />
        <Heading
          as="h3"
          fontSize={{ base: "1.5rem", md: "2rem" }}
          textAlign={"center"}
        >
          Verification Successful
        </Heading>
        <Text>Your account has been verified.</Text>
        <Link as={RouteLink} to="/login" textDecoration={"underline"}>
          Login
        </Link>
        <Box>
          <Link as={RouteLink} to="/">
            <Img src="/images/4x/logo.png" alt="eliteGPA logo" w="3rem" />
          </Link>
        </Box>
      </VStack>
    </Grid>
  );
};

export default VerificationPage;
