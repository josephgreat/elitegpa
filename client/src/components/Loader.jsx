import {
  Grid,
  Heading,
  Img,
  keyframes,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Loader = ({ text }) => {
  const pulseAnimation = keyframes`  
  0% { transform: scale(0.8); }   
  50% { transform: scale(1.2); }   
  100% { transform: scale(0.8); } 
`;

  const logoSrc = useColorModeValue("logo.png", "logoalt.png");

  return (
    <Grid placeItems="center" h="100vh">
      <Heading
        w="clamp(5rem, 10vw, 10rem)"
        fontSize="clamp(1.2rem, 3vw, 1.5rem)"
        animation={`${pulseAnimation} infinite 1s linear`}
        transition="all 1s ease"
      >
        <Img alt="eliteGPA" w="100%" src={`/images/4x/${logoSrc}`} />
      </Heading>
    </Grid>
  );
};

export default Loader;
