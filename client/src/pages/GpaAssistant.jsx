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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateCGPA, sortData, throwAppError } from "../utils";
import * as tf from "@tensorflow/tfjs";
import { FaHandPointRight } from "react-icons/fa";
import GpaAssistantWorker from "../utils/gpaAssitant?worker";

// const GpaAssistant = ({ userDetails }) => {
//   const [savedResults, setSavedResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [gpaCombinations, setGpaCombinations] = useState([]);
//   const [cgpaTargetIsAchievable, setCgpaTargetIsAchievable] = useState(false);
//   const [targetCGPA, setTargetCGPA] = useState(0);
//   const [isPredicting, setIsPredicting] = useState(false);
//   const [predictedRequiredGPA, setPredictedRequiredGPA] = useState(0);

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const getResultsFromDB = async () => {
//     try {
//       setLoading(true);
//       let response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
//       );

//       setSavedResults(sortData(response));
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

const GpaAssistant = ({ userDetails }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [gpaCombinations, setGpaCombinations] = useState([]);
  const [cgpaTargetIsAchievable, setCgpaTargetIsAchievable] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState(0);
  const [predictedRequiredGPA, setPredictedRequiredGPA] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getResultsFromDB = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
      );

      setSavedResults(sortData(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const pastGPAs = savedResults.map(({ semesters }) =>
    parseInt(calculateCGPA(semesters).toFixed(2))
  );
  // const targetCGPA = 4.2;
  const totalLevels = Number(userDetails.setup.years_of_study); // Total academic levels (100 to 500)
  let maxGPA;
  if (userDetails.setup.grading_system.split(" ")[0].toLowerCase() === "four") {
    maxGPA = 4.0;
  } else if (
    userDetails.setup.grading_system.split(" ")[0].toLowerCase() === "five"
  ) {
    maxGPA = 5.0;
  }

  const predictWithTargetCGPA = () => {
    onOpen();
    setCalculating(true);
    const worker = new GpaAssistantWorker();

    worker.postMessage({
      pastGPAs,
      targetCGPA,
      totalLevels,
      maxGPA,
    });

    worker.onmessage = function (e) {
      const { requiredGPA, combinations, achievable } = e.data;
      setCgpaTargetIsAchievable(achievable);
      setPredictedRequiredGPA(requiredGPA);
      setGpaCombinations(combinations.slice(0, 5));
      setCalculating(false);
    };
  };

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
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "12", md: "4" }}
        // justifyContent={"space-between"}
        my="8"
      >
        <Box
          w={{ md: "25%" }}
          // borderRight={{ md: "1px solid" }}
          py={ "4"}
          px={{ md: "4" }}
          boxShadow={"2px 0px 0px 0px rgba(100,100,100,.3)"}
        >
          <Heading as="h3" fontSize="clamp(1.1rem, 2vw, 1.3rem)" mb="4">
            Previous Results
          </Heading>
          {loading ? (
            <Grid placeItems={"center"} minH={"15rem"}>
              <Spinner />
            </Grid>
          ) : (
            <List
              pl={{ md: "4" }}
              gap="4"
              pb="4"
              display={"flex"}
              flexDir={{ base: "row", md: "column" }}
              flexWrap={{ base: "nowrap", md: "wrap" }}
              overflowX={{ base: "auto", md: "unset" }}
              whiteSpace={{ base: "nowrap", md: "unset" }}
            >
              {savedResults.map(({ level, semesters }, index) => (
                <ListItem
                  // py="2"
                  _notLast={{
                    base: { borderRight: "1px solid" },
                    md: { borderRight: "unset" },
                  }}
                  pr={{ base: "4", md: "unset" }}
                  // boxShadow={"inset 0 0 2px rgba(25, 25, 112, .5)"}
                  // rounded=".5rem"
                  // pos="relative"
                  borderColor="primary"
                  key={index}
                  // w={{ base: "", sm: "45%", md: "25%" }}
                >
                  <Heading
                    // as={Text}
                    top={"-0.5rem"}
                    left="50%"
                    fontSize="clamp(1rem, 1.3vw, 1.3rem)"
                    display={"flex"}
                    color="primary"
                    flexDir={"row"}
                    // justifyContent={"flex-start"}
                    gap="2"
                    alignItems={"center"}
                  >
                    <Text m="0" fontSize={".8rem"}>
                      {level} GPA:
                    </Text>
                    <Text m="0">
                      <Badge fontSize={"1rem"}>
                        {calculateCGPA(semesters)}
                      </Badge>
                    </Text>
                  </Heading>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        {/* <Divider display={{ base: 'none', md: 'block' }} orientation="vertical" /> */}
        <Box w={{ sm: "70%" }} py={{ md: "4" }} px={{ md: "4" }}>
          <Box>
            <Heading as="h3" fontSize="clamp(1.1rem, 2vw, 1.3rem)" mb="4">
              Future GPA Prediction to Achieve Target Cumulative GPA (CGPA)
            </Heading>
            <FormControl
              mb="4"
              display={"flex"}
              gap="4"
              alignItems={"flex-start"}
            >
              {/* <FormLabel>Enter Your Target CGPA</FormLabel> */}
              <InputGroup w="fit-content">
                <Input
                  type="number"
                  placeholder="Enter Your Target CGPA"
                  onChange={(e) => {
                    setTargetCGPA(Number(e.target.value));
                  }}
                />
              </InputGroup>
              <Button
                bg="accentVar"
                color="secondary"
                border="1px solid"
                borderColor="accentVar"
                onClick={predictWithTargetCGPA}
                _hover={{ bg: "transparent", color: "accentVar" }}
              >
                Predict
              </Button>
            </FormControl>

            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Prediction Analysis</ModalHeader>
                <ModalCloseButton />
                {calculating ? (
                  <ModalBody>
                    <Grid placeItems={"center"} minH={"10rem"}>
                      <Spinner />
                    </Grid>
                  </ModalBody>
                ) : (
                  <ModalBody>
                    {cgpaTargetIsAchievable ? (
                      <Box>
                        <Text mt="2" color="green.500">
                          To achieve a CGPA of {targetCGPA}, you need to obtain
                          GPAs around {predictedRequiredGPA.toFixed(2)} in the
                          remaining levels.
                        </Text>
                        <Text mt="2" color="green.500">
                          Here are some possible combinations of GPAs for the
                          remaining levels:
                        </Text>
                        <List>
                          {gpaCombinations.map((combination, index) => (
                            <ListItem key={index}>
                              <ListIcon>
                                <FaHandPointRight />
                              </ListIcon>
                              {/* Combination {index + 1}: */}
                              {combination.combination.map((gpa, index2) => (
                                <Badge ml="2" fontSize="sm" key={index2}>
                                  {gpa.toFixed(2)}
                                </Badge>
                              ))}{" "}
                              = {combination.averageGPA}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ) : (
                      <Text mt="2" color="red.500">
                        It is not possible to achieve a CGPA of {targetCGPA}.
                        The required GPA for the remaining levels exceeds the
                        maximum possible GPA of {maxGPA}
                      </Text>
                    )}
                  </ModalBody>
                )}
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default GpaAssistant;
