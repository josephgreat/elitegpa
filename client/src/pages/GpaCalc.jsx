import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Heading,
  Box,
  Text,
  Select,
  Flex,
  HStack,
  Spacer,
  Button,
  Divider,
  Center,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  calculateCGPA,
  deepEqual,
  generateTwoDigitNumbers,
  sortData,
  throwAppError,
} from "../utils";
import { FaUpload } from "react-icons/fa";
import { DisclaimerText, NewSemester } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

const GpaCalc = () => {
  let { resultId } = useParams();
  const { userDetails, toast } = useContext(UserContext);
  const navigate = useNavigate();
  const sessionYears = generateTwoDigitNumbers();
  const [beginSessionYear, setBeginSessionYear] = useState(sessionYears[0]);
  const [coursesFirstSemester, setCoursesFirstSemester] = useState([
    { course: "", course_code: "", credit_load: "0", grade: "" },
  ]);

  const [coursesSecondSemester, setCoursesSecondSemester] = useState([
    { course: "", course_code: "", credit_load: "0", grade: "" },
  ]);

  const [gpaFirstSemester, setGpaFirstSemester] = useState(0);
  const [gpaSecondSemester, setGpaSecondSemester] = useState(0);
  const [loading, setLoading] = useState(false);
  const [semesterDetails, setSemesterDetails] = useState({
    level: "",
    session: `${beginSessionYear}/${Number(beginSessionYear) + 1}`,
    semesters: [
      {
        semester: 1,
        courses: coursesFirstSemester,
        gpa: gpaFirstSemester,
      },
      {
        semester: 2,
        courses: coursesSecondSemester,
        gpa: gpaSecondSemester,
      },
    ],
    uid: userDetails.uid,
  });
  const [initialSemesterDetails, setInitialSemesterDetails] = useState(null);
  const [updatesAvailable, setUpdatesAvailable] = useState(false);
  const [levelList, setLevelList] = useState([]);

  const updateSemesterDetails = ({
    detail,
    sub_detail,
    detail_index,
    detail_new_value,
  }) => {
    if (detail === "semesters") {
      const updatedSemesters = semesterDetails.semesters.map((semester) => {
        if (semester.semester === detail_index) {
          return {
            ...semester,
            [sub_detail]: detail_new_value,
          };
        }
        return semester;
      });
      setSemesterDetails({
        ...semesterDetails,
        semesters: updatedSemesters,
      });
    } else
      setSemesterDetails({ ...semesterDetails, [detail]: detail_new_value });
  };

  const fillResultInCalculator = async () => {
    try {
      const singleData = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-one-session/${resultId}`
      );

      let singleSession = singleData.data;
      setInitialSemesterDetails(singleSession);
      setSemesterDetails(singleSession);
      setBeginSessionYear(singleSession.session.split("/")[0]);
      setCoursesFirstSemester(singleSession.semesters[0].courses);
      setCoursesSecondSemester(singleSession.semesters[1].courses);
      setGpaFirstSemester(singleSession.semesters[0].gpa);
      setGpaSecondSemester(singleSession.semesters[1].gpa);
    } catch (error) {}
  };

  const getAddedLevels = async () => {
    try {
      let allData = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
      );
      
      let allResults = sortData(allData);
      let addedLevels = allResults.map((result) => ({
        level: result.level,
        // cgpa: calculateCGPA(result.semesters),
      }));
      return addedLevels;
    } catch (error) {
      console.error("Error fetching added levels:", error);
      return [];
    }
  };

  const getLevelList = async () => {
    let levels = [];
    let addedLevels = await getAddedLevels();

    if (userDetails.setup.program_type === "Diploma Program") {
      levels = ["OND1", "OND2", "HND1", "HND2"];
    } else {
      for (
        let currentLevel = 1;
        currentLevel <= userDetails.setup.years_of_study;
        currentLevel++
      ) {
        const isLevelAdded = addedLevels.some(
          ({ level }) => level === `${currentLevel}00 level`
        );

        setLevelList((prevLevelList) => ([...prevLevelList, {
          level: `${currentLevel}00 level`,
          isDisabled: isLevelAdded,
        }]));
      }
    }

    return levels;
  };

  // Usage in a React component:
  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await getLevelList();
      // You can set this data to state if needed
    };

    fetchLevels();
  }, []);

  const gradeList = () => {
    let grades = [];
    if (
      userDetails.setup.grading_system ===
      "Four Point (A, AB, B, BC, C, CD, D, E, F)"
    ) {
      grades = ["A", "AB", "B", "BC", "C", "CD", "D", "E", "F"];
    } else {
      grades = ["A", "B", "C", "D", "E", "F"];
    }
    return grades;
  };

  const resetCalculator = () => {
    setBeginSessionYear(sessionYears[0]);
    setCoursesFirstSemester([
      { course: "", course_code: "", credit_load: "", grade: "" },
    ]);
    setCoursesSecondSemester([
      { course: "", course_code: "", credit_load: "", grade: "" },
    ]);
    setGpaFirstSemester(0);
    setGpaSecondSemester(0);
    setSemesterDetails({
      level: "",
      session: `${beginSessionYear}/${Number(beginSessionYear) + 1}`,
      semesters: [
        {
          semester: 1,
          courses: coursesFirstSemester,
          gpa: gpaFirstSemester,
        },
        {
          semester: 2,
          courses: coursesSecondSemester,
          gpa: gpaSecondSemester,
        },
      ],
    });
  };

  const saveNewData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/save-session-detail`,
        semesterDetails
      );
      setLoading(false);

      toast({
        title: `Result Saved`,
        description: `Your ${semesterDetails.level} result has been saved`,
        status: "success",
      });
      resetCalculator();
      navigate("/my-gpas");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      throwAppError(toast, error);
    }
  };

  const updateData = async () => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-one-session/${resultId}`,
        semesterDetails
      );
      toast({
        title: `Result Updated`,
        description: `Your ${semesterDetails.level} result has been updated successfully`,
        status: "success",
      });
      resetCalculator();

      navigate("/my-gpas");
      setLoading(false);
    } catch (error) {
      throwAppError(toast, error);
    }
  };

  const handleSaving = async () => {
    if (resultId) {
      updateData();
    } else saveNewData();
  };

  useEffect(() => {
    if (initialSemesterDetails !== null) {
      if (!deepEqual(semesterDetails, initialSemesterDetails)) {
        setUpdatesAvailable(true);
      } else setUpdatesAvailable(false);
    }
  }, [semesterDetails]);

  useEffect(() => {
    resultId && fillResultInCalculator();
    setInitialSemesterDetails(semesterDetails);
  }, []);

  return (
    <Container py="8" pt="20" maxW="72rem" mx="auto" pos="relative">
      <DisclaimerText />

      {loading && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          pos={"fixed"}
          inset={0}
          bg="rgba(0,0,0,.5)"
          backdropFilter={"blur(2px)"}
          zIndex={"2"}
        >
          <VStack color={"secondary"} fontSize={"1.2rem"} gap="3">
            <Spinner size={"lg"} />
            <Text>Saving</Text>
          </VStack>
        </Flex>
      )}
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        GPA Calculator
      </Heading>
      <Flex
        py="4"
        gap="4"
        fontSize={".8rem"}
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={{ sm: "space-between" }}
        alignItems={"center"}
        w="100%"
      >
        <HStack>
          <Text>Level:</Text>
          <Select
            fontSize={".8rem"}
            value={semesterDetails.level}
            placeholder=" "
            // isDisabled={resultId}
            onChange={(e) =>
              updateSemesterDetails({
                detail: "level",
                detail_new_value: e.target.value,
              })
            }
          >
            {levelList.map(({ level, isDisabled }) => (
              <Text as={"option"} key={level} value={`${level}`} _disabled={{bg: "gray.100"}}  disabled={isDisabled}>
                {level}
              </Text>
            ))}
          </Select>
        </HStack>
        {/* <Spacer /> */}
        <Text
          order={{ base: 3, md: 2 }}
          fontFamily={"heading"}
          fontWeight={"bold"}
          fontSize={"1rem"}
        >
          CGPA: {calculateCGPA(semesterDetails.semesters)}
        </Text>
        <HStack>
          <Text>Session:</Text>
          <HStack>
            <HStack gap={"0"}>
              <Select
                border="0"
                fontSize={".8rem"}
                borderBottom="1px dashed"
                rounded="0"
                // isDisabled={resultId}
                className="session"
                onChange={(e) => {
                  setBeginSessionYear(e.target.value);
                  updateSemesterDetails({
                    detail: "session",
                    detail_new_value: `${e.target.value}/${
                      Number(e.target.value) + 1
                    }`,
                  });
                }}
              >
                {sessionYears.map((begin) => (
                  <option key={begin} value={begin}>
                    {begin}
                  </option>
                ))}
              </Select>
            </HStack>
            <Text>/</Text>
            <HStack>
              <Text>{Number(beginSessionYear) + 1}</Text>
            </HStack>
          </HStack>
        </HStack>
      </Flex>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={{ base: "center", md: "flex-start" }}
        gap={"4"}
      >
        <NewSemester
          semester={semesterDetails.semesters[0].semester}
          updateSemesterDetails={updateSemesterDetails}
          courses={coursesFirstSemester}
          setCourses={setCoursesFirstSemester}
          gpa={gpaFirstSemester}
          setGpa={setGpaFirstSemester}
          gradeList={gradeList}
        />
        <Center height={{ base: ".5rem", md: "100%" }}>
          <Divider orientation={"horizontal"} />
        </Center>
        <NewSemester
          semester={semesterDetails.semesters[1].semester}
          courses={coursesSecondSemester}
          setCourses={setCoursesSecondSemester}
          gpa={gpaSecondSemester}
          updateSemesterDetails={updateSemesterDetails}
          setGpa={setGpaSecondSemester}
          gradeList={gradeList}
        />
      </Flex>
      <Flex justifyContent={"center"} my="4">
        <Button
          gap="2"
          rounded={"1rem"}
          fontWeight={"semibold"}
          bg="primary"
          color={"white"}
          _disabled={{ filter: "opacity(.3)" }}
          isDisabled={
            semesterDetails.level.length <= 1 || (resultId && !updatesAvailable)
          }
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "primary",
            color: "primary",
          }}
          onClick={handleSaving}
        >
          <FaUpload />
          Save
        </Button>
      </Flex>
    </Container>
  );
};

export default GpaCalc;
