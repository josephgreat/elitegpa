import { Container, Heading } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        Dashboard
      </Heading>
    </Container>
  );
};

export default Dashboard;
