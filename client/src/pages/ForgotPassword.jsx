import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Loader } from "../components";
import { Link as RouteLink } from "react-router-dom";
import { FaLockOpen, FaPaperPlane, FaUserLock } from "react-icons/fa6";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/init";

const ForgotPassword = () => {
  const bgColor = useColorModeValue("secondary", "#1a202c");
  const logo = useColorModeValue("logo.png", "logoalt.png");
  const [formError, setFormError] = useState({ from: "", message: "" });
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const auth = getAuth(app);

  const handleForgotPassword = async (e) => {
    // e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: `Request sent`,
        description: `Password reset link has been sent to your email.`,
        status: "success",
      });
    } catch (err) {
      console.log(err);

      toast({
        title: `Request failed`,
        description: `Failed to send password reset email. Please check your email address.`,
        status: "success",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      maxW={"unset"}
      minH="100vh"
      bgGradient="linear(to-br, primary, accentVar)"
      //   py=
      p="0"
    >
      <Flex
        // display={{ base: "grid", md: "flex" }}
        flexDir={{ base: "column", md: "row" }}
        minH="100vh"
        justifyContent={{ base: "center", md: "space-between" }}
        overflow={"hidden"}
      >
        <Box
          h={{ md: "100vh" }}
          display={{ base: "none", md: "grid" }}
          pos="relative"
          w={{ md: "45%" }}
          placeItems={"center"}
        >
          <Box
            pos="absolute"
            inset="0"
            bg={{ md: bgColor }}
            top="-10%"
            boxShadow={"inset 0 0 25px rgba(100,100,100,.6)"}
            left="-12%"
            w="125%"
            h="120%"
            transform={"rotate(-10deg)"}
            borderRadius={"2rem"}
            // className="right-wavy-bg"
          >
            <Box className="right-wavy-border" />
          </Box>
          <Box pos="relative" py="8">
            <Heading
              w={"clamp(5rem, 10vw, 6rem)"}
              mb="10"
              display={"block"}
              mx="auto"
              // color={{ base: "secondary" }}
              as={RouteLink}
              to="/"
            >
              <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
            </Heading>
            <Box w="clamp(15rem, 40vw, 25rem)" mx="auto" my="10">
              <Img src="/images/login.png" />
            </Box>
            {/* <Text
              px="10"
              textAlign={"center"}
              fontSize={"medium"}
              fontWeight={"semibold"}
            >
              Join eliteGPA, the premier CGPA calculator and academic
              performance tracker. Track your progress, get tailored study tips,
              and access curated materials to excel. Take charge of your
              academic success today!
            </Text> */}
          </Box>
        </Box>
        <Box alignSelf={{ md: "center" }} py="10" px="4" maxW="32rem" mx="auto">
          <Heading
            w={"clamp(5rem, 10vw, 6rem)"}
            display={{ base: "block", md: "none" }}
            fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
            mb="10"
            // color={{ base: "secondary" }}
            as={RouteLink}
            to="/"
          >
            <Img alt="eliteGPA" w="100%" src={`/images/4x/logoalt.png`} />
          </Heading>
          <Heading
            fontSize={"clamp(1.5rem, 5vw, 2rem)"}
            mb="12"
            textAlign={"center"}
            color={"white"}
            as="h2"
          >
            Forgot Password
          </Heading>
          <Box
            bg="rgba(255,255,255,.1)"
            backdropFilter={"blur(5px)"}
            boxShadow="inset 0 0 10px rgba(255,255,255,.3)"
            rounded={"1rem"}
            py="4"
            px="6"
            pos="relative"
            zIndex={2}
            mb="12"
          >
            <Box
              pos="absolute"
              top="-2rem"
              left="50%"
              bg="primary"
              rounded="full"
              padding="3"
              transform={"translateX(-50%)"}
            >
              <FaUserLock size={"2rem"} fill="#FFD700" />
            </Box>
            <VStack as="form" gap="4" zIndex="2" mt="3rem" mb="2rem ">
              <FormControl>
                {/* isInvalid={formError.from === "email"} */}
                <InputGroup>
                  <InputLeftAddon
                    as={FaEnvelope}
                    w="3rem"
                    bg="primary"
                    color="accent"
                    border="0"
                  />
                  <Input
                    type="email"
                    autoComplete="username"
                    placeholder="Email"
                    bg={bgColor}
                    ref={emailRef}
                  />
                </InputGroup>
                {/* <FormErrorMessage
                  textShadow={"0 0 5px rgba(10,10,10,1)"}
                  fontWeight={"bold"}
                >
                  {formError.message}
                </FormErrorMessage> */}
              </FormControl>
              {/* <FormControl isInvalid={formError.from === "password"}>
                <InputGroup>
                  <InputLeftAddon
                    as={FaLock}
                    w="3rem"
                    bg="primary"
                    color="accent"
                    border="0"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Password"
                    bg={bgColor}
                    ref={passwordRef}
                  />
                  <InputRightAddon
                    as={!showPassword ? FaEyeSlash : FaEye}
                    w="3rem"
                    bg={bgColor}
                    onClick={() => setShowPassword(!showPassword)}
                    _hover={{ bg: "rgba(200,200,200,1)" }}
                    cursor="pointer"
                  />
                </InputGroup>
                <FormErrorMessage
                  textShadow={"0 0 5px rgba(10,10,10,1)"}
                  fontWeight={"bold"}
                >
                  {formError.message}
                </FormErrorMessage>
              </FormControl> */}

              <Button
                pos="absolute"
                bottom={"-1rem"}
                zIndex={-1}
                bg="primary"
                color="accent"
                fontStyle={"bold"}
                transition="all .3s linear"
                _hover={{ bg: "accent", color: "primary" }}
                gap="2"
                onClick={() => handleForgotPassword()}
              >
                <Icon as={FaPaperPlane} />
                Send
              </Button>
            </VStack>
          </Box>

          <Box textAlign={"center"} mt="4">
            <Link
              as={RouteLink}
              to="/login"
              color="secondary"
              opacity={".7"}
              _hover={{ opacity: "1", textDecor: "unset" }}
              transition={"all .3s ease"}
              textDecor={"underline"}
            >
              Remembered Password? Login
            </Link>
          </Box>
        </Box>
      </Flex>
      {loading && <Loader text={"Sending Request..."} />}
    </Container>
  );
};

export default ForgotPassword;
