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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortData, throwAppError } from "../utils";
import * as tf from "@tensorflow/tfjs";
import { GpaPredictor, GradePredictor } from "../components";

const GpaAssistant = ({ userDetails }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssistance, setSelectedAssistance] = useState("dream-cgpa");

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
        flexDir={{ base: "column", md: "row" }}
      >
        <Heading as="label" fontSize="clamp(.8rem, 1.2vw, 1.2rem)" m="0">
          Choose an assistance:
        </Heading>
        <Select
          w="fit-content"
          value={selectedAssistance}
          onChange={(e) => setSelectedAssistance(e.target.value)}
        >
          <option value="dream-cgpa">Achieving My Dream CGPA</option>
          <option value="grade-prediction">Course Grade Prediction</option>
        </Select>
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
