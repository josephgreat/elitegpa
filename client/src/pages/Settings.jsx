import { Container, Heading } from "@chakra-ui/react";
import React from "react";

const Settings = () => {
  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        Settings
      </Heading>
      
    </Container>
  );
};

export default Settings;
