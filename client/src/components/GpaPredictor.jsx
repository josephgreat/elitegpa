import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  InputGroup,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import GpaAssistantWorker from "../utils/gpaAssistant?worker";
import { calculateCGPA } from "../utils";

const GpaPredictor = ({ loading, savedResults, userDetails, maxGPA }) => {
  const [calculating, setCalculating] = useState(false);
  const [gpaCombinations, setGpaCombinations] = useState([]);
  const [cgpaTargetIsAchievable, setCgpaTargetIsAchievable] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState(0);
  const [predictedRequiredGPA, setPredictedRequiredGPA] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pastGPAs = savedResults.map(({ semesters }) =>
    parseInt(calculateCGPA(semesters).toFixed(2))
  );
const toast = useToast({position: "top-right"});
  const totalLevels = Number(userDetails.setup.years_of_study); // Total academic levels (100 to 500)

  const predictWithTargetCGPA = () => {
    if (!targetCGPA) {
      toast({
        title: "Target CGPA is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
    if (targetCGPA > maxGPA) {
      toast({
        title: "Invalid target GPA",
        description:
          "Target GPA cannot be more than the maximum GPA which is " +
          maxGPA.toFixed(1),
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
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
  return (
    <Box>
      <Heading
        as="h3"
        fontSize="clamp(1.1rem, 2vw, 1.3rem)"
        textAlign={{ md: "center" }}
        mb="4"
      >
        Predicting Your GPA to Hit Your Target CGPA
      </Heading>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "4", md: "12" }}
        justifyContent={"center"}
      >
        <Box
          w={{ md: "25%" }}
          py={{ md: "4" }}
          px={{ md: "4" }}
          boxShadow={{ md: "2px 0px 0px 0px rgba(100,100,100,.3)" }}
        >
          <Heading
            as="h3"
            fontSize="clamp(.9rem, 1.3vw, 1.1rem)"
            mb={{ base: "2", md: "4" }}
          >
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
              {savedResults[0].level ? savedResults.map(({ level, semesters }, index) => (
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
              )) : <Text opacity={".6"}>You've not save any result yet</Text>}
            </List>
          )}
        </Box>
        <Box py={{ md: "4" }} px={{ md: "4" }}>
          <Box>
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
                        <List display={"flex"} flexDir={"column"} gap="2" my="2">
                          {gpaCombinations.map((combination, index) => (
                            <ListItem key={index} alignItems={"center"} display={"flex"}>
                              <ListIcon>
                                <FaHandPointRight />
                              </ListIcon>
                              {/* Combination {index + 1}: */}
                              <Flex gap="2">
                                {combination.combination.map((gpa, index2) => (
                                  <Badge
                                    fontSize={{ base: "xs", md: "sm" }}
                                    key={index2}
                                  >
                                    {gpa.toFixed(2)}
                                  </Badge>
                                ))}
                                <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "sm" }}>
                                  = {combination.averageGPA}
                                </Text>
                              </Flex>
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
    </Box>
  );
};

export default GpaPredictor;
