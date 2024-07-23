import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Pie, PieChart } from "recharts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SessionTable, SummaryCard } from "../components";
import {
  calculateCGPA,
  calculateSessionCourses,
  calculateSessionCreditLoad,
  calculateUserGradePoint,
  capitalize,
  generateRandomColors,
  getStudentClass,
  sortData,
} from "../utils";
import { Chart } from "chart.js";
import { FaDownload } from "react-icons/fa";

const Dashboard = ({userDetails}) => {
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const sessionRef = useRef();

  const getAllSessions = async () => {
    try {
      const sessions = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
      );
      setAllSessions(sortData(sessions));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching result:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSessions();
  }, []);

  const calculateTotalCGPA = (sessions) => {
    let totalCgpas = sessions.reduce(
      (acc, session) => (acc += calculateCGPA(session.semesters)),
      0
    );

    let cgpa = parseFloat((totalCgpas / sessions.length).toFixed(3));
    return { cgpa, totalCgpas };
  };

  const calculateTotalNoOfCourses = (sessions) => {
    let totalCourses = sessions.reduce(
      (acc, session) => (acc += calculateSessionCourses(session.semesters)),
      0
    );
    return totalCourses;
  };
  const calculateCreditLoad = (sessions) => {
    let creditLoads = sessions.reduce(
      (acc, session) => (acc += calculateSessionCreditLoad(session.semesters)),
      0
    );
    return creditLoads;
  };

  let cgpa = 0;
  let totalCourses = 0;
  let totalCreditLoad = 0;
  let studentClass = "Pass";

  if (allSessions.length > 0) {
    cgpa = calculateTotalCGPA(allSessions).cgpa;
    totalCourses = calculateTotalNoOfCourses(allSessions);
    totalCreditLoad = calculateCreditLoad(allSessions);
    studentClass = getStudentClass(cgpa);
  }
  useEffect(() => {
    if (allSessions.length !== 0) {
      const gpaChartElement = document.getElementById("gpaChart");
      const ctx = gpaChartElement && gpaChartElement.getContext("2d");

      // const { session } = sessionResult;
      // const [first_semester, second_semester] = semesters;

      const gpaChart =
        ctx &&
        new Chart(ctx, {
          type: "line",
          data: {
            labels: allSessions.map((session) => session.level),
            datasets: [
              {
                label: "GPA Trend",
                data: allSessions.map((session) =>
                  calculateCGPA(session.semesters)
                ),
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                tension: 0.5,
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

      const generateChartData1 = () => {
        const sessions = [];
        const gradePoints = [];

        allSessions.forEach((session) => {
          sessions.push(capitalize(session.level));
          gradePoints.push(calculateCGPA(session.semesters));
        });

        return { sessions, gradePoints };
      };
      const generateChartData2 = () => {
        const sessions = [];
        const percentageGradePoints = [];

        allSessions.forEach((session) => {
          sessions.push(capitalize(session.level));
          percentageGradePoints.push(
            parseFloat(
              (
                (calculateCGPA(session.semesters) /
                  calculateTotalCGPA(allSessions).totalCgpas) *
                100
              ).toFixed(1)
            )
          );
        });

        return { sessions, percentageGradePoints };
      };

      const renderChart1 = (elementId, sessions, sessionsGradePoint) => {
        return new Chart(document.getElementById(elementId), {
          type: "bar",
          data: {
            labels: sessions,
            datasets: [
              {
                label: "Academic Session",
                data: sessionsGradePoint,
                backgroundColor: generateRandomColors(sessions.length),
                hoverOffset: 50,
                offset: 10,
                borderJoinStyle: "miter",
                borderRadius: "5",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: `GPA Level for each Academic Session:`,
              },
            },
          },
        });
      };
      const renderChart2 = (
        elementId,
        sessions,
        sessionsPercentageGradePoint
      ) => {
        return new Chart(document.getElementById(elementId), {
          type: "pie",
          data: {
            labels: sessions,
            datasets: [
              {
                label: "Academic Sessions",
                data: sessionsPercentageGradePoint,
                backgroundColor: generateRandomColors(sessions.length),
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
                text: `Contribution of each Academic Session GPA to the CGPA:`,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    var label = context.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed) {
                      label += context.parsed + "%";
                    }
                    return label;
                  },
                },
              },
            },
          },
        });
      };

      const { sessions, gradePoints } = generateChartData1();
      const {
        sessions: percentageSessions,
        percentageGradePoints: sessionsPercentageGradePoint,
      } = generateChartData2();
      console.log(percentageSessions, sessionsPercentageGradePoint);
      const semester1Chart = renderChart1(
        "semester1Chart",
        sessions,
        gradePoints
      );
      const semester2Chart = renderChart2(
        "semester2Chart",
        percentageSessions,
        sessionsPercentageGradePoint
      );

      return () => {
        if (gpaChart) gpaChart.destroy();
        if (semester1Chart) semester1Chart.destroy();
        if (semester2Chart) semester2Chart.destroy();
      };
    }
  }, [allSessions]);

  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        Dashboard
      </Heading>
      {loading ? (
        <Grid placeItems={"center"} minH={"15rem"}>
          <Spinner />
        </Grid>
      ) : (
        <Flex flexDir={{ base: "column", md: "row" }} justify={"space-between"}>
          <Box mb={4} flex={{ base: 1, md: 0.6 }}>
            <SummaryCard
              cgpa={cgpa}
              small_screen={true}
              studentClass={studentClass}
              totalCreditLoad={totalCreditLoad}
              totalCourses={totalCourses}
            />
            <SimpleGrid spacing={8}>
              <Center height={{ base: "200px", md: "300px" }}>
                <canvas id="gpaChart"></canvas>
              </Center>
            </SimpleGrid>
            <Heading fontSize={"clamp(1.2rem, 2vw, 1.4rem)"} mb="2">
              Session Details
            </Heading>
            {allSessions.map((session) => (
              <SessionTable key={session._id} session={session} />
            ))}
          </Box>
          <VStack flex={{ base: 1, md: 0.35 }}>
            <SummaryCard
              cgpa={cgpa}
              small_screen={false}
              studentClass={studentClass}
              totalCreditLoad={totalCreditLoad}
              totalCourses={totalCourses}
            />
            <Box>
              <Center flexDir={"column"} gap="8">
                <canvas id="semester1Chart" height={"300px"}></canvas>
                <canvas id="semester2Chart" height={"300px"}></canvas>
              </Center>
            </Box>
          </VStack>
        </Flex>
      )}
      <Flex justifyContent={"center"}>
        <Button
          color={"secondary"}
          border={"1px solid"}
          h="unset"
          gap="1"
          py="1"
          px="2"
          fontWeight={"semibold"}
          bg="primary"
          boxShadow={"0 0 5px rgba(255,255,255,.8)"}
          _hover={{ bg: "secondary", color: "primary" }}
          // onClick={() => exportComponentAsJPEG(sessionRef)}
        >
          <FaDownload /> Download all sessions
        </Button>
      </Flex>
    </Container>
  );
};

export default Dashboard;
