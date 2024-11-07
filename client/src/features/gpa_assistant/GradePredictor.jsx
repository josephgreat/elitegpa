import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  InputGroup,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import GradeAssistantWorker from "../../utils/gradeAssistant?worker";
import { convertPointToGrade, getSessionGradingSystem } from "../../utils";
import { FaTimesCircle } from "react-icons/fa";

const GradePredictor = ({ loading, savedResults, userDetails, maxGPA }) => {
  const [calculating, setCalculating] = useState(false);
  const [gradeCombinations, setGradeCombinations] = useState([]);
  const [validationErrors, setValidationErrors] = useState(false);
  const [targetGPA, setTargetGPA] = useState(0);
  const [courses, setCourses] = useState([{ name: "", credits: "" }]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({ position: "top-right" });
  const coursesContainerRef = useRef(null);
  const addCourse = () => {
    setValidationErrors(false);
    const lastCourse = courses[courses.length - 1];
    if (courses.length === 0 || (lastCourse.name && lastCourse.credits)) {
      setCourses([...courses, { name: "", credits: 0 }]);
    } else {
      toast({
        title: "Incomplete Course",
        description:
          "Please fill out the current course details before adding a new one.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const updateCourse = (index, event) => {
    setValidationErrors(false);
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };
  const validateCourses = () => {
    const errors = courses.map((course) => !course.name || !course.credits);
    setValidationErrors(errors);
    return !errors.includes(true);
  };

  const handleCourseRemoval = (index) => {
    let updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };
  const predictGrade = () => {
    if (!targetGPA) {
      toast({
        title: "Target GPA is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
    if (targetGPA > maxGPA) {
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
    if (!validateCourses()) {
      toast({
        title: "Error",
        description: "Please fill out all course fields before predicting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onOpen();
    setCalculating(true);
    const worker = new GradeAssistantWorker();

    worker.onmessage = function (e) {
      const { targetGPA, combinations } = e.data;
      setGradeCombinations(combinations);
    };
    let stepGap = 1;

    if (
      getSessionGradingSystem() === "Four Point (A, AB, B, BC, C, CD, D, E, F)"
    ) {
      stepGap = 0.5;
    }
    worker.postMessage({ targetGPA, maxGPA, courses, stepGap });
    setCalculating(false);
  };

  useEffect(() => {
    if (coursesContainerRef.current) {
      coursesContainerRef.current.scrollTop =
        coursesContainerRef.current.scrollHeight;
    }
  }, [courses]);

  return (
    <Box>
      <Heading
        as="h3"
        fontSize="clamp(1.1rem, 2vw, 1.3rem)"
        textAlign={{ md: "center" }}
        mb="4"
      >
        Predicting Your Grades to Hit Your Target GPA
      </Heading>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "4", md: "12" }}
        justifyContent={"center"}
      >
        <Box
          w={{ md: "55%" }}
          py={{ base: "4" }}
          px={{ md: "4" }}
          boxShadow={{
            base: "0px 2px 0px 0px rgba(100,100,100,.3)",
            md: "2px 0px 0px 0px rgba(100,100,100,.3)",
          }}
        >
          <Heading
            as="h3"
            fontSize="clamp(.9rem, 1.3vw, 1.1rem)"
            mb={{ base: "2", md: "4" }}
          >
            Courses
          </Heading>
          <Box>
            <VStack
              gap="2"
              maxH={{ base: "25vh", md: "50vh" }}
              overflow={"auto"}
              ref={coursesContainerRef}
            >
              {courses.map((course, index) => (
                <FormControl
                  key={index}
                  isRequired
                  display="flex"
                  gap="4"
                  isInvalid={validationErrors[index]}
                  // pr={index === 0 && "2rem"}
                >
                  <InputGroup>
                    <Input
                      placeholder="Course / Course Code"
                      name="name"
                      value={course.name}
                      onChange={(e) => updateCourse(index, e)}
                    />
                    <Select
                      name="credits"
                      w="10rem"
                      ml="4"
                      placeholder="Credit"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, e)}
                    >
                      {[...Array(8).keys()].map((credit) => (
                        <option key={credit + 1} value={credit + 1}>
                          {credit + 1}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                  {/* {index !== 0 && ( */}
                    <CloseButton
                      as={FaTimesCircle}
                      size="1rem"
                      color={"accentVar"}
                      onClick={() => handleCourseRemoval(index)}
                    />
                  {/* )} */}
                </FormControl>
              ))}
            </VStack>
            <Button
              my="2"
              onClick={addCourse}
              bg="accentVar"
              color="secondary"
              border="1px solid"
              borderColor={"accentVar"}
              _hover={{ bg: "transparent", color: "accentVar" }}
              _focus={{ color: "accentVar" }}
            >
              Add Course
            </Button>
          </Box>
        </Box>
        <Box py={{ md: "4" }} px={{ md: "4" }}>
          <Box>
            <FormControl
              mb="4"
              display={"flex"}
              gap="4"
              alignItems={"flex-start"}
            >
              <InputGroup w="fit-content">
                <Input
                  type="number"
                  placeholder="Enter Your Target GPA"
                  onChange={(e) => {
                    setTargetGPA(Number(e.target.value));
                  }}
                />
              </InputGroup>
              <Button
                bg="primary"
                color="secondary"
                border="1px solid"
                borderColor="primary"
                onClick={predictGrade}
                _hover={{ bg: "transparent", color: "primary" }}
                _focus={{ color: "primary" }}
              >
                Predict
              </Button>
            </FormControl>

            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
              w={{ md: "" }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Prediction Analysis</ModalHeader>
                <ModalCloseButton />
                {calculating ? (
                  <ModalBody maxH="60vh" overflow="auto">
                    <Grid placeItems={"center"} minH={"10rem"}>
                      <Spinner />
                    </Grid>
                  </ModalBody>
                ) : (
                  <ModalBody maxH={"min(75vh, 40rem)"} overflow={"auto"}>
                    <Box>
                      <Text mt="2" color="green.500">
                        To achieve a GPA of {targetGPA} for this semester, here
                        are some possible combinations of grades for the
                        courses:
                      </Text>

                      <List
                        display={"flex"}
                        flexDir={"row"}
                        flexWrap="wrap"
                        gap="3"
                        my="2"
                      >
                        {gradeCombinations.map((combination, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            w={{ base: "100%", md: "48%" }}
                          >
                            <Box
                              gap="2"
                              border="1px solid"
                              borderColor={"accentVar"}
                              rounded="1rem"
                              px="4"
                              py="2"
                              w="100%"
                            >
                              <Heading
                                as="h6"
                                fontSize={{ base: "xs", md: "sm" }}
                                mb={2}
                              >
                                Combination {index + 1}:
                              </Heading>
                              {combination.combination.map((course, index2) => (
                                <Flex
                                  key={index2}
                                  gap="4"
                                  alignItems="center"
                                  w="100%"
                                >
                                  <Text
                                    isTruncated
                                    noOfLines={1}
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    w="60%"
                                  >
                                    {course.course}
                                  </Text>
                                  <Text ml="auto">{course.credits}</Text>
                                  <Grid w="2rem" placeContent={"center"}>
                                    <Badge fontSize={{ base: "sm", md: "sm" }}>
                                      {convertPointToGrade(course.grade)}
                                    </Badge>
                                  </Grid>
                                </Flex>
                              ))}
                              <Text
                                fontWeight="bold"
                                fontSize={{ base: "xs", md: "sm" }}
                                color="accentVar"
                                mt="2"
                              >
                                Average GPA = {combination.averageGPA}
                              </Text>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
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

export default GradePredictor;
