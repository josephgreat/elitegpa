import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { FaDownload, FaPencilAlt } from "react-icons/fa";
import { exportComponentAsJPEG } from "react-component-export-image";
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Spinner,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  calculateCGPA,
  calculateSessionCourses,
  calculateSessionCreditLoad,
  capitalize,
  generateRandomColors,
  calculateCourseGradePoint,
  calculateTotalCreditLoad,
  calculateGpa,
  getStudentClass,
  sessionDataToExcel,
} from "../utils";
import { Result, SemesterCoursesTable, SummaryCard } from "../components";
import { usePDF } from "react-to-pdf";
import { FaFileImage, FaFilePdf } from "react-icons/fa6";
function SessionDashboard({ userDetails }) {
  const [sessionResult, setSessionResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const { resultId } = useParams();
  const [levelToDownload, setLevelToDownload] = useState();

  let sessionRef = useRef();
  // sessionRef = targetRef;
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(100,100,100, .3)"
  );

  const getResult = async () => {
    try {
      const singleData = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-one-session/${resultId}`
      );
      setSessionResult(singleData.data);
      setLevelToDownload(singleData.data?.level);
    } catch (error) {
      console.error("Error fetching result:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getResult();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [resultId]);

  useEffect(() => {
    if (Object.keys(sessionResult).length !== 0) {
      const gpaChartElement = document.getElementById("gpaChart");
      const ctx = gpaChartElement && gpaChartElement.getContext("2d");
      const { semesters } = sessionResult;
      const [first_semester, second_semester] = semesters;

      const gpaChart =
        ctx &&
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["First Semester", "Second Semester"],
            datasets: [
              {
                label: "GPA Trend",
                data: [first_semester.gpa, second_semester.gpa],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                tension: 3,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 5.0,
                ticks: {
                  stepSize: 0.5,
                },
              },
            },
          },
        });

      const generateChartData = (semester) => {
        const courses = [];
        const gradePoints = [];

        semester.courses.forEach((course) => {
          courses.push(capitalize(course.course_code.toUpperCase()));
          gradePoints.push(
            parseFloat(
              (
                calculateCourseGradePoint(course) /
                calculateTotalCreditLoad(semester)
              ).toFixed(2)
            )
          );
        });

        return { courses, gradePoints };
      };

      const renderChart = (
        elementId,
        semester,
        semesterCourses,
        semesterGradePoints,
        label
      ) => {
        return new Chart(document.getElementById(elementId), {
          type: "doughnut",
          data: {
            labels: semesterCourses,
            datasets: [
              {
                label: `Contribution to ${label} GPA`,
                data: semesterGradePoints,
                backgroundColor: generateRandomColors(semesterCourses.length),
                hoverOffset: 50,
                offset: 10,
                borderJoinStyle: "miter",
                borderRadius: "5",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: `Courses contribution to ${label} GPA: ${calculateGpa(
                  semester.courses
                )}`,
              },
            },
          },
        });
      };

      const {
        courses: firstSemesterCourses,
        gradePoints: firstSemesterGradePoints,
      } = generateChartData(first_semester);
      const {
        courses: secondSemesterCourses,
        gradePoints: secondSemesterGradePoints,
      } = generateChartData(second_semester);

      const semester1Chart = renderChart(
        "semester1Chart",
        first_semester,
        firstSemesterCourses,
        firstSemesterGradePoints,
        "First Semester"
      );
      const semester2Chart = renderChart(
        "semester2Chart",
        second_semester,
        secondSemesterCourses,
        secondSemesterGradePoints,
        "Second Semester"
      );

      return () => {
        if (gpaChart) gpaChart.destroy();
        if (semester1Chart) semester1Chart.destroy();
        if (semester2Chart) semester2Chart.destroy();
      };
    }
  }, [sessionResult]);

  let cgpa = 3.5;
  let totalCreditLoad = 21;
  let totalCourses = 6;
  let studentClass = { position: "", badgeColor: "white" };

  let { semesters, level } = {};
  if (sessionResult) {
    ({ semesters, level } = sessionResult);

    cgpa = semesters && calculateCGPA(semesters);
    totalCreditLoad = semesters && calculateSessionCreditLoad(semesters);
    totalCourses = semesters && calculateSessionCourses(semesters);
    studentClass = getStudentClass(cgpa);
  }
  const { toPDF, targetRef } = usePDF({
    filename: `${userDetails.displayName}'s ${
      levelToDownload ? levelToDownload : "Session"
    } Result`,
  });
  const handleDownload = () => {
    if (!isDownloading) {
      try {
        setIsDownloading(true);
        toPDF();
      } catch (error) {
        console.error("Download error:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <Container
      py="8"
      maxW="72rem"
      mx="auto"
      px="1rem"
      pos="relative"
      bg={bgColor}
      minH={"100vh"}
    >
      {loading ? (
        <Grid placeItems={"center"} minH={"15rem"}>
          <Spinner />
        </Grid>
      ) : (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          flexWrap={"wrap"}
          justify={"space-between"}
          mb={{ base: "10", md: "unset" }}
        >
          {isDownloading && (
            <Grid placeItems="center" pos="fixed" inset="0">
              Downloading
            </Grid>
          )}
          <Box mb={4} flex={{ base: 1, lg: 0.6 }}>
            <Heading
              mb={2}
              fontSize={"clamp(1.3rem, 4vw, 1.6rem)"}
              textAlign={"center"}
            >
              {level} Academic Performance
            </Heading>
            <Flex
              justifyContent="space-between"
              mb="8"
              gap="8"
              flexWrap="wrap"
              flexDir={{ base: "column", sm: "row-reverse" }}
            >
              <SummaryCard
                cgpa={cgpa}
                small_screen={true}
                studentClass={studentClass}
                totalCreditLoad={totalCreditLoad}
                totalCourses={totalCourses}
              />
              <SimpleGrid spacing={8} flex="1">
                <Center height={{ base: "200px", md: "300px" }}>
                  <canvas id="gpaChart"></canvas>
                </Center>
              </SimpleGrid>
            </Flex>

            <Box>
              <Heading size="md" mb={4}>
                Semester Courses
              </Heading>
              <VStack gap="8" w="100%">
                {semesters.map((semester, index) => (
                  <SemesterCoursesTable
                    key={index}
                    semester={semester}
                    title={
                      semester.semester === 1
                        ? "First Semester"
                        : "Second Semester"
                    }
                  />
                ))}
              </VStack>
            </Box>
          </Box>
          <VStack flex={{ base: 1, lg: 0.35 }}>
            <SummaryCard
              cgpa={cgpa}
              small_screen={false}
              studentClass={studentClass}
              totalCreditLoad={totalCreditLoad}
              totalCourses={totalCourses}
            />
            <Box>
              <Heading size="md" mb={4}>
                Grades by Semester
              </Heading>
              <Flex
                flexWrap={"wrap"}
                gap="8"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box>
                  <canvas id="semester1Chart"></canvas>
                </Box>
                <Box>
                  <canvas id="semester2Chart"></canvas>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Flex>
      )}
      <Flex
        gap="4"
        justifyContent={"center"}
        my={{ md: "8" }}
        p={{ base: "4", sm: "unset" }}
        w="100%"
        shadow={{ base: `0 0 5px ${shadowColor}`, sm: "unset" }}
        pos={{ base: "fixed", sm: "unset" }}
        bottom="0"
        left="0"
        bg={{ base: bgColor, sm: "unset" }}
      >
        {/* <Button
          color={"secondary"}
          // border={"1px solid"}
          h="unset"
          gap="1"
          py="1"
          px="2"
          fontWeight={"semibold"}
          bg="primary"
          boxShadow={`0 0 5px ${shadowColor}`}
          _hover={{ bg: "secondary", color: "primary" }}
          onClick={() => exportComponentAsJPEG(sessionRef)}
        >
          <FaFileImage /> Download
        </Button> */}

        <Button
          color={"secondary"}
          h="unset"
          gap="1"
          fontWeight={"semibold"}
          bg="accentVar"
          boxShadow={`0 0 5px ${shadowColor}`}
          _hover={{ bg: "secondary", color: "accentVar" }}
          as={Link}
          p="1"
          px="2"
          to={`/gpa-calc/${resultId}`}
        >
          <FaPencilAlt /> Edit
        </Button>
        <Button
          color={"secondary"}
          h="unset"
          gap="1"
          py="1"
          px="2"
          fontWeight={"semibold"}
          bg="primary"
          boxShadow={`0 0 5px ${shadowColor}`}
          _hover={{ bg: "secondary", color: "primary" }}
          onClick={handleDownload}
        >
          <FaFilePdf /> {isDownloading ? "Downloading" : "Download"}
        </Button>
      </Flex>
      <Box
        ref={targetRef}
        position={"absolute"}
        top={"-9999px"} // Move it off-screen
        left={"-9999px"} // Move it off-screen
        // visibility={"hidden"}  // Hide visibility
        minH={"50rem"}
        minW={"62rem"}
        py="8"
      >
        <Result sessionResult={sessionResult} />
      </Box>
    </Container>
  );
}

export default SessionDashboard;
