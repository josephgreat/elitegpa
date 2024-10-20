import { Box, Grid, Heading, Link, Text, VStack, Img } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
    const oobCode = queryParams.get('oobCode'); // unique code sent for the password reset
    const mode = queryParams.get('mode');       // action mode, should be 'resetPassword'

    if (oobCode && mode === 'resetPassword') {
      setOobCode(oobCode);
      setMode(mode);
    } else {
      setMessage('Invalid or expired link.');
    }
  }, [location]);

 
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
          {mode === "resetPassword" ? "Reset Password" : "Login"}
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
