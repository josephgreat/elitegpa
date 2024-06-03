import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
  Img,
  Icon,
  Text,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBookOpen,
  FaCalculator,
  FaChartBar,
  FaLightbulb,
  FaListUl,
  FaRobot,
  FaSignOutAlt,
  FaTimes,
  FaUserCog,
} from "react-icons/fa";
import { generateRandomColors } from "../utils";
import { logOut } from "../../firebase";
import { UserContext } from "../App";

let photoBgColor = generateRandomColors(1);
const Navbar = ({ userDetails, navigate }) => {
  const { toast } = useContext(UserContext);
  const { displayName, photoURL } = userDetails;
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <Container
      as={"nav"}
      bgGradient="linear(to-br, primary, accentVar)"
      py="6"
      borderBottomLeftRadius={"2rem"}
      px="6"
      color={"secondary"}
      w="100%"
      pos="relative"
      overflow={"visible"}
      maxW="unset"
      fontWeight={"semibold"}
    >
      <Box
        pos="absolute"
        inset={"0"}
        bgGradient="linear(to-br, primary, accentVar)"
        borderBottomLeftRadius={"2rem"}
        opacity={0.5}
        zIndex={-1}
        bottom="-1"
        left="1"
      />

      <HStack maxW="72rem" mx="auto">
        <VStack
          gap={"1"}
          alignItems={"flex-start"}
          onClick={() => setOpenSideNav(true)}
        >
          <Box w="1.5rem" h=".2rem" bg="accent" rounded={".5rem"} />
          <Box w=".8rem" h=".2rem" bg="accent" rounded={".5rem"} />
        </VStack>
        <Box pos="relative">
          <Heading fontSize={"1rem"} zIndex={"2"}>
            EliteGpa
          </Heading>
          {/* <Img src="/images/graduation_cap.svg" pos="absolute" w="8" top="-4" left={"-1"} transform={"rotate(-25deg)"}  /> */}
        </Box>
        <Spacer />
        <HStack>
          <Text textTransform={"capitalize"}>
            👋 Hi, {displayName ? displayName.split(" ")[0] : "user"}
          </Text>
          {photoURL ? (
            <Img
              src={photoURL}
              rounded={"full"}
              boxShadow={"0 0 5px rgba(200,200,200, .6)"}
              w="3rem"
            />
          ) : displayName ? (
            <Box
              fontSize={"1.2rem"}
              bg={photoBgColor}
              rounded={"full"}
              px=".8rem"
              py="1"
              textTransform={"capitalize"}
              boxShadow={"0 0 5px rgba(200,200,200, .6)"}
            >
              {displayName[0]}
            </Box>
          ) : (
            <Avatar size="sm" />
          )}
        </HStack>
      </HStack>
      {/* {openSideNav && ( */}
      <SideNav
        displayName={displayName}
        photoURL={photoURL}
        setOpenSideNav={setOpenSideNav}
        openSideNav={openSideNav}
        navigate={navigate}
        toast={toast}
      />
      {/* )} */}
    </Container>
  );
};

export default Navbar;

const SideNav = ({
  displayName,
  photoURL,
  setOpenSideNav,
  openSideNav,
  toast,
  navigate,
}) => {
  return (
    <Box
      pos="fixed"
      inset={"0"}
      visibility={openSideNav ? "visible" : "hidden"}
      backdropFilter={"blur(3px)"}
      zIndex={"2"}
      transition={"all .3s linear"}
    >
      <VStack
        fontWeight={"semibold"}
        w="15rem"
        transition={"all .3s linear"}
        clipPath={openSideNav ? "circle(120vh at 0 0)" : "circle(0 at 0 0)"}
        top="0"
        py="6"
        gap="8"
        alignItems={"flex-start"}
        bgGradient={"linear(to-br, primary, accentVar)"}
        h="100vh"
        roundedBottomRight={"2rem"}
      >
        <Box w="100%" px="6">
          <Flex justifyContent={"flex-end"} mb="4">
            <Icon
              as={FaTimes}
              w="2rem"
              color="accent"
              onClick={() => setOpenSideNav(false)}
            />
          </Flex>
          <Flex alignItems={"center"} gap="2">
            {photoURL ? (
              <Img
                src={photoURL}
                rounded={"full"}
                boxShadow={"0 0 5px rgba(200,200,200, .6)"}
                w="3rem"
              />
            ) : displayName ? (
              <Box
                fontSize={"1.2rem"}
                bg={photoBgColor}
                rounded={"full"}
                px=".7rem"
                py="1"
                backdropFilter={"contrast(0.5)"}
                boxShadow={"0 0 5px rgba(200,200,200, .6)"}
                textTransform={"capitalize"}
              >
                {displayName[0]}
              </Box>
            ) : (
              <Avatar size="sm" />
            )}
            <Text fontWeight={"semibold"} textTransform={"capitalize"}>
              {displayName ? displayName.split(" ")[0] : "user"}
            </Text>
          </Flex>
        </Box>
        <VStack alignItems={"flex-start"} w="100%" gap="0">
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            to="/"
            as={NavLink}
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid",
              borderColor: "#FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            <FaChartBar /> Overview
          </Link>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            to="/gpa-calc"
            as={NavLink}
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid #FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            {" "}
            <FaCalculator /> GPA Calculator
          </Link>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            to="/my-gpas"
            as={NavLink}
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid #FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            {" "}
            <FaListUl /> My GPAs
          </Link>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            as={NavLink}
            to="/study-tips"
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid #FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            <FaLightbulb />
            Study Tips
          </Link>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            as={NavLink}
            to="/study-materials"
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid #FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            <FaBookOpen />
            Study Materials
          </Link>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            as={NavLink}
            to="/ai-chat"
            style={({ isActive }) => ({
              background: isActive && "rgba(255,255,255,.2)",
              borderLeft: isActive && "3px solid #FFD700",
            })}
            onClick={() => setOpenSideNav(false)}
          >
            <FaRobot />
            Chat with Ai
          </Link>
        </VStack>
        <Spacer />
        <VStack>
          <Link
            px="6"
            py="2"
            w="100%"
            display="flex"
            alignItems={"center"}
            gap="2"
            onClick={() => setOpenSideNav(false)}
          >
            <FaUserCog /> Settings
          </Link>
          <Flex
            py="2"
            px="6"
            alignItems={"center"}
            gap="2"
            cursor="pointer"
            _hover={{textDecor: "underline"}}
            onClick={() => {
              logOut(toast, navigate);
              setOpenSideNav(false);
            }}
          >
            <FaSignOutAlt />
            Log Out
          </Flex>
        </VStack>
      </VStack>
    </Box>
  );
};
