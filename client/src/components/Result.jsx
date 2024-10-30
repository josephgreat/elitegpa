import {
  Avatar,
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Img,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import SemesterCoursesTable from "./SemesterCoursesTable";
import { calculateCGPA, getStudentClass } from "../utils";
import { photoBgColor } from "./Navbar";

const Result = ({ sessionResult }) => {
  const { userDetails } = useContext(UserContext);
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const logo = useColorModeValue("logo.png", "logoalt.png");

  const { displayName, photoURL, email } = userDetails;
  const {
    institution,
    institution_state,
    program_type,
    grading_system,
    years_of_study,
  } = userDetails.setup;
  const { level, session, semesters } = sessionResult;
  let output_details = [
    { key: "Name", value: displayName },
    { key: "Email", value: email },
    { key: "Session", value: session },
    { key: "Current Level", value: level },
    {
      key: "Program Duration",
      value:
        program_type.toLowerCase() !== "diploma program"
          ? years_of_study + "years"
          : "4years",
    },
    { key: "Program Type", value: program_type },
    { key: "Institution", value: institution },
    { key: "Institution State", value: institution_state },
  ];
  let studentClass;

  useEffect(() => {
    studentClass = semesters && getStudentClass(calculateCGPA(semesters));
  }, [sessionResult]);
  console.log(sessionResult);

  return (
    <Container
      minH={"50rem"}
      minW={"60rem"}
      bg={bgColor}
      mx="auto"
      maxW="container.md"
      pos="relative"
      px="8"
      pt="8"
      pb="12"
    >
      <Heading
        w={"clamp(5rem, 10vw, 6rem)"}
        fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
        mb="10"
        mx="auto"
      >
        <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
      </Heading>
      <HStack justifyContent={"space-between"} mb="4">
        <Box>
          {photoURL ? (
            <Img
              src={photoURL}
              //   rounded={"full"}
              //   boxShadow={"0 0 5px rgba(200,200,200, .6)"}
              w="5rem"
              h="5rem"
            />
          ) : displayName ? (
            <Box
              fontSize={"2rem"}
              bg={photoBgColor}
              //   rounded={"full"}
              w="5rem"
              h="4rem"
              pb="4rem"
              as={Grid}
              fontWeight={"bold"}
              placeItems={"center"}
              textTransform={"capitalize"}
              textShadow={"0 0 2px rgba(20,20,20,.7)"}
              //   boxShadow={"0 0 5px rgba(200,200,200, .6)"}
            >
              {displayName[0]}
              {displayName[1]}
            </Box>
          ) : (
            <Avatar size="sm" />
          )}
        </Box>
        <VStack alignItems={"flex-end"} gap="1">
          <Heading as="h1" fontSize={"2xl"}>
            Session Result
          </Heading>
          <Box fontSize={"lg"}>
            CGPA:{" "}
            <Text as="span" fontSize={"2xl"} fontWeight={"bold"}>
              {semesters && parseFloat(calculateCGPA(semesters)).toFixed(1)}
            </Text>
          </Box>
          <Text mt={2}>
            <Badge
              bg={
                semesters &&
                getStudentClass(calculateCGPA(semesters)).badgeColor
              }
              pb="4"
              px="2"
              color="black"
              display="block"
            >
              {semesters && getStudentClass(calculateCGPA(semesters)).position}
            </Badge>
          </Text>
        </VStack>
      </HStack>
      <HStack mb="8">
        <Flex flexDir={"column"} flex="1" gap="2">
          {output_details.slice(0, 4).map(({ key, value }, index) => (
            <HStack key={index}>
              <Text w="20%" fontSize={".8rem"}>
                {key}:
              </Text>
              <Text w="80%">{value}</Text>
            </HStack>
          ))}
        </Flex>
        <Flex flexDir={"column"} flex="1" gap="2">
          {output_details.slice(4, 8).map(({ key, value }, index) => (
            <HStack key={index}>
              <Text w="30%" fontSize={".8rem"}>
                {key}:
              </Text>
              <Text w="80%">{value}</Text>
            </HStack>
          ))}
        </Flex>
      </HStack>
      <VStack gap="8" w="100%">
        {semesters &&
          semesters.map((semester, index) => (
            <SemesterCoursesTable
              key={index}
              semester={semester}
              downloadable={true}
              title={
                semester.semester === 1 ? "First Semester" : "Second Semester"
              }
            />
          ))}
      </VStack>

      <VStack as="footer" fontSize={".7rem"} mt="8">
        <Text>
          Generated on: {new Date().getDate()}/{new Date().getMonth()}/
          {new Date().getFullYear()}
        </Text>
        <Heading
          w={"clamp(2rem, 4vw, 3rem)"}
          // fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
          // mb="10"
          // mx="auto"
          // color={{ base: "secondary" }}
          // as={RouteLink}
          // to="/"
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
        </Heading>
        <Text>&copy;{new Date().getFullYear()} copyright - emJoeTech</Text>
      </VStack>
      <Box
        pos={"absolute"}
        top="50%"
        left="50%"
        w={"50%"}
        transform={"translate(-50%, -50%)"}
        opacity=".15"
        // zIndex="-1"
      >
        <Img
          alt="eliteGPA"
          w="100%"
          transform={"rotate(-45deg)"}
          transformOrigin={"center"}
          src={`/images/4x/${logo}`}
        />
      </Box>
    </Container>
  );
};

export default Result;
