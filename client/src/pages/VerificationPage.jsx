import { Box, Grid, Heading, Link, Text, VStack, Img, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link as RouteLink, useLocation } from "react-router-dom";

const VerificationPage = () => {
  const location = useLocation();
  const [oobCode, setOobCode] = useState('');
  const [mode, setMode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const paramOobCode = queryParams.get('oobCode'); // unique code sent for the password reset
    const paramMode = queryParams.get('mode');       // action mode, should be 'resetPassword'
    console.log(paramMode, paramOobCode);
    
    // if (paramOobCode && mode === 'resetPassword') {
      setOobCode(paramOobCode);
      setMode(paramMode);
      

    // } else {
    //   setMessage('Invalid or expired link.');
    // }
  }, [location]);
  const logo = useColorModeValue("logo.png", "logoalt.png");

 
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
        <Link as={RouteLink} to={mode === "resetPassword" ? `/resetpassword/${oobCode}` : "/login"} textDecoration={"underline"}>
          {mode === "resetPassword" ? "Reset Password" : "Login"}
        </Link>
        <Box>
          <Link as={RouteLink} to="/">
            <Img src={`/images/4x/${logo}`} alt="eliteGPA logo" w="3rem" />
          </Link>
        </Box>
      </VStack>
    </Grid>
  );
};

export default VerificationPage;
