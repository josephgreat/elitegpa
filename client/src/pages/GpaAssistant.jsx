import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Grid,
  Spinner,
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
  Select,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortData, throwAppError } from "../utils";
import * as tf from "@tensorflow/tfjs";
import { GpaPredictor, GradePredictor } from "../components";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { FaPoll } from "react-icons/fa";

const GpaAssistant = ({ userDetails }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssistance, setSelectedAssistance] = useState("dream-cgpa");
  const bgColor = useColorModeValue("secondary", "#1a202c");
  const color = useColorModeValue("primary", "secondary");

  const getResultsFromDB = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
      );

      setSavedResults(sortData(response));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  let maxGPA;
  if (userDetails.setup.grading_system.split(" ")[0].toLowerCase() === "four") {
    maxGPA = 4.0;
  } else if (
    userDetails.setup.grading_system.split(" ")[0].toLowerCase() === "five"
  ) {
    maxGPA = 5.0;
  }

  useEffect(() => {
    getResultsFromDB();
    // calculateRequiredGPAs(pastGPAs, targetCGPARange, totalLevels)
  }, [userDetails]);

  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        GPA Assistant
      </Heading>
      <Flex
        alignItems={"center"}
        gap={{ base: "2", md: "4" }}
        justifyContent={"center"}
        my="8"
        flexDir={{ base: "column" }}
      >
        <Heading as="label" fontSize="clamp(.8rem, 1.2vw, 1.2rem)" m="0">
          Choose an assistance:
        </Heading>
        <Flex gap="4">
          {[
            { key: "dream-cgpa", label: "Achieving My Dream CGPA", icon: FaGraduationCap },
            { key: "grade-prediction", label: "Course Grade Prediction", icon: FaPoll },
          ].map((item) => (
            <Box
              key={item.key}
              cursor="pointer"
              p=".15rem"
              rounded="8"
              bgGradient="linear(to-br, primary, accentVar)"
              role="group"
              _groupHover={{ bgGradient: "linear(to-br, red, accentVar)" }}
              transition="all .3s ease"
              boxShadow="inset 0 0 7px rgba(20, 20, 20, .7)"
              onClick={() => setSelectedAssistance(item.key)}
            >
              <Box
                bg={
                  selectedAssistance === item.key
                    ? "linear(to-br, primary, accentVar)"
                    : bgColor || "gray.100" // default fallback color
                }
                transition="all .3s ease"
                color={selectedAssistance === item.key ? "secondary" : color}
                px="4"
                py="2"
                rounded="6"
                h="100%"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                _hover={{
                  transform: "scale(0.95)",
                }}
              >
                <Icon as={item.icon} fontSize="2rem" />
                <Text
                  textAlign={"center"}
                  fontSize={"clamp(.7rem, 4vw, 1rem)"}
                  wordBreak="break-word"
                >
                  {item.label}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
      {selectedAssistance === "dream-cgpa" && (
        <GpaPredictor
          savedResults={savedResults}
          loading={loading}
          userDetails={userDetails}
          maxGPA={maxGPA}
        />
      )}
      {selectedAssistance === "grade-prediction" && (
        <GradePredictor
          savedResults={savedResults}
          loading={loading}
          userDetails={userDetails}
          maxGPA={maxGPA}
        />
      )}
    </Container>
  );
};

export default GpaAssistant;
