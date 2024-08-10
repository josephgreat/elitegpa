import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserLock,
  FaUserPlus,
} from "react-icons/fa6";
import { emailSignIn, googleAuth } from "../../firebase";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import { UserContext } from "../App";
import { Loader } from "../components";
import { eraseCookie } from "../utils";

const Login = () => {
  const { setUserDetails, toast } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({ from: "", message: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  const bgColor = useColorModeValue("secondary", "#1a202c");
  const logo = useColorModeValue("logo.png", "logoalt.png");

  const navigate = useNavigate();

  const handleFormError = (from, message) => {
    setFormError({ from: from, message: message });
  };
// useEffect(() => {
//   eraseCookie("uid");
// }, [])
  const handleUserSignUp = () => {
    const emailRegxPattern = /\S+@\S+\.\S+/;
    if (emailRef.current.value.length === 0)
      handleFormError("email", "Email is required");
    else if (!emailRegxPattern.test(emailRef.current.value))
      handleFormError("email", "Email is invalid");
    else if (passwordRef.current.value.length < 6) {
      handleFormError("password", "Password must be at least 6 characters");
    } else {
      emailSignIn({
        setUserDetails: setUserDetails,
        toast: toast,
        navigate: navigate,
        setLoading: setLoading,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
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
            <Text
              px="10"
              textAlign={"center"}
              fontSize={"medium"}
              fontWeight={"semibold"}
            >
              Join eliteGPA, the premier CGPA calculator and academic
              performance tracker. Track your progress, get tailored study tips,
              and access curated materials to excel. Take charge of your
              academic success today!
            </Text>
          </Box>
        </Box>
        <Box alignSelf={{md:"center"}} py="10" px="4" maxW="32rem" mx="auto">
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
            Let's get Jiggy Elite
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
              transform={"translateX(-50%)"}
            >
              <FaUserCircle size={"4rem"} fill="#FFD700" />
            </Box>
            <VStack as="form" gap="4" zIndex="2" mt="3rem" mb="2rem ">
              <FormControl isInvalid={formError.from === "email"}>
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
                <FormErrorMessage
                  textShadow={"0 0 5px rgba(10,10,10,1)"}
                  fontWeight={"bold"}
                >
                  {formError.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formError.from === "password"}>
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
              </FormControl>

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
                onClick={() => handleUserSignUp()}
              >
                <Icon as={FaUserPlus} />
                Login
              </Button>
            </VStack>
          </Box>
          <Flex mb="4" alignItems={"center"}>
            <Divider />
            <Center bg="transparent" px="4" color={"secondary"} opacity={".8"}>
              OR
            </Center>
            <Divider />
          </Flex>
          <VStack>
            <Button
              gap="2"
              _hover={{
                bg: "transparent",
                color: "secondary",
                borderColor: "white",
              }}
              border={"1px solid transparent"}
              onClick={() =>
                googleAuth(setUserDetails, setLoading, navigate, toast)
              }
            >
              <Icon
                as={Img}
                src="/images/google.png"
                w="1.5rem"
                h="1.5rem"
                alt="google_logo"
              />{" "}
              Sign in with Google
            </Button>
          </VStack>
          <Box textAlign={"center"} mt="4">
            <Link
              as={RouteLink}
              to="/signup"
              color="secondary"
              opacity={".7"}
              _hover={{ opacity: "1", textDecor: "unset" }}
              transition={"all .3s ease"}
              textDecor={"underline"}
            >
              Not yet an elite? Join now
            </Link>
          </Box>
        </Box>
      </Flex>
      {loading && <Loader text={"Logging In..."} />}
    </Container>
  );
};

export default Login;
