import { Box, Container, Heading, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const OfflineNotification = () => {
  return (
    <Container display="grid" minH="100vh" placeItems={"center"}>
      <Box textAlign={"center"}>
        <Box
          as={"img"}
          src="/images/No wifi.gif"
          w="auto"
          mx="auto"
        />
        <Heading as="h1" fontSize={"clamp(3rem, 10vw, 5rem)"}>
          Oops!!
        </Heading>
        <Heading as="h2">Seems you are offline</Heading>
        <Text>Check your internet connection and try again</Text>
        <Heading
          w={"clamp(5rem, 10vw, 6rem)"}
          fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
          mt="4"
          mx="auto"
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/logo.png`} />
        </Heading>
      </Box>
    </Container>
  );
};

export default OfflineNotification;
