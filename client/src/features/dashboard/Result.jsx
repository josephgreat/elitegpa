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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../App";
import SemesterCoursesTable from "./SemesterCoursesTable";
import { calculateCGPA, getStudentClass } from "../../utils";
import { photoBgColor } from "../../components/layout/Navbar";
import { getOneSession } from "../../services/apis";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../../services/init";
import { Loader } from "../../components";

const Result = ({ sessionResult }) => {
  const { userDetails } = useContext(UserContext);
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const logo = useColorModeValue("logo.png", "logoalt.png");
  const [resultToDownload, setResultToDownload] = useState(sessionResult || {});
  const [userDetailsOfUser, setUserDetailsOfUser] = useState(userDetails || {});
  const [isLoading, setIsLoading] = useState(false);

  const { uid, resultId } = useParams();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // const db = 
        const singleData = await getOneSession(resultId);
        setResultToDownload(singleData.data);
        const db = getFirestore(app);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        console.log(singleData.data);
        console.log("a")
        if (docSnap.exists()) {
          setUserDetailsOfUser(docSnap.data());
          console.log(docSnap.data());
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    if (uid) {
      fetchData();
    }
  }, []);

  const {
    displayName = "N/A",
    photoURL,
    email,
    setup: {
      institution = "N/A",
      institution_state = "N/A",
      program_type = "N/A",
      grading_system = "N/A",
      years_of_study = "N/A",
    } = {},
  } = userDetailsOfUser;
  const { level, session, semesters } = resultToDownload || {};
  const cgpa = useMemo(
    () =>
      !isLoading && resultToDownload.semesters
        ? calculateCGPA(resultToDownload.semesters)
        : null,
    [resultToDownload.level]
  );
  // const studentClass = useMemo(() => {
  //   // if (cgpa && grading_system) {
  //     console.log(cgpa, grading_system);
  //     return getStudentClass(cgpa, grading_system);
  //   // }
  // }, [resultToDownload.level]);

  const output_details = [
    { key: "Name", value: displayName },
    { key: "Email", value: email },
    { key: "Session", value: resultToDownload.session || "N/A" },
    { key: "Current Level", value: resultToDownload.level || "N/A" },
    {
      key: "Program Duration",
      value:
        program_type.toLowerCase() !== "diploma program"
          ? `${years_of_study} years`
          : "4 years",
    },
    { key: "Program Type", value: program_type },
    { key: "Institution", value: institution },
    { key: "Institution State", value: institution_state },
  ];

  if (isLoading || grading_system === "N/A") return <Loader />;

  return (
    <Container
      minH="50rem"
      minW="60rem"
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
            <Box
              bg={`url('${photoURL}') no-repeat center`}
              w="5rem"
              h="5rem"
              bgSize={"contain"}
            />
          ) : displayName ? (
            <Box
              fontSize={"2rem"}
              bg={photoBgColor || "cyan"}
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
                getStudentClass(calculateCGPA(semesters), grading_system)
                  .badgeColor
              }
              pb={!uid && "4"}
              px="2"
              color="black"
              display="block"
            >
              {semesters &&
                getStudentClass(calculateCGPA(semesters), grading_system).position}
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
        {resultToDownload?.semesters?.map((semester, index) => (
          <SemesterCoursesTable
            key={index}
            semester={semester}
            downloadable={true}
            grading_system={grading_system}
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
