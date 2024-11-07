import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { FaEye, FaSchoolCircleXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  LevelResult,
  ShareResultModal,
  ViewSession,
} from "../features/my_gpas";
// import axios from "axios";
import { calculateCGPA, sortData, throwAppError } from "../utils";
import { deleteOneSession, getAllSessions } from "../services/apis";
import { Result } from "../features/dashboard";
import {usePDF} from "react-to-pdf"

const MyGpas = ({ userDetails }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [resultToBeViewed, setResultToBeViewed] = useState({
    result: {},
    usage: "",
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast({ position: "top-right", duration: 3000 });
  const navigate = useNavigate();
  const resultRef = useRef();

  const { toPDF, targetRef } = usePDF({
    filename: `${userDetails.displayName}'s
      ${resultToBeViewed.result?.level}
     Result`,
  });

  const getLevelsData = () => {
    setLevelsData(() =>
      savedResults.map((result) => ({
        level: result.level,
        cgpa: calculateCGPA(result.semesters),
      }))
    );
  };

  const getResultsFromDB = async () => {
    try {
      setLoading(true);
      let response = await getAllSessions(userDetails);
      setSavedResults(sortData(response));
      setLoading(false);
    } catch (error) {
      throwAppError(toast, error, navigate);
      setLoading(false);
    }
  };

  const deleteASavedResult = async (index, level) => {
    try {
      setLoading(true);
      await deleteOneSession(index);
      getResultsFromDB();
      toast({
        title: `Result Deleted`,
        description: `Your ${level} result has been deleted`,
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throwAppError({ toast: toast, error: error });
    }
  };

  const resetResultToBeViewed = () => {
    setResultToBeViewed({ result: {}, usage: "" });
  };
  useEffect(() => {
    getResultsFromDB();
  }, []);

  useEffect(() => {
    // getSavedResults();
    getLevelsData();
  }, [savedResults]);

  return (
    <Container py="8" maxW="72rem" mx="auto" pos="relative">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        My GPAs
      </Heading>
      <Flex
        my="8"
        flexDir={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        justifyContent={"space-around"}
        alignContent={"center"}
        gap="8"
      >
        {loading ? (
          <Grid placeItems={"center"} minH={"15rem"}>
            <Spinner />
          </Grid>
        ) : savedResults.length === 0 ? (
          <Grid minH="50vh" placeItems={"center"} opacity={".7"}>
            <VStack>
              <FaSchoolCircleXmark
                fontSize={"clamp(4rem, 15vw, 15rem)"}
                fill="#008080"
              />
              <Text fontSize={"clamp(1.2rem, 3vw, 3rem)"}>
                No Academic Session Recorded
              </Text>
            </VStack>
          </Grid>
        ) : (
          savedResults.map((result) => (
            <LevelResult
              result={result}
              index={result._id}
              key={result._id}
              deleteASavedResult={deleteASavedResult}
              setResultToBeViewed={setResultToBeViewed}
            />
          ))
        )}
      </Flex>
      <Flex justifyContent={"center"} my="8">
        <Button
          gap="2"
          rounded={"1rem"}
          fontWeight={"semibold"}
          bg="accentVar"
          as={Link}
          to="/gpa-calc"
          color={"white"}
          _hover={{
            bg: "transparent",
            border: "1px solid",
            borderColor: "accentVar",
            color: "accentVar",
          }}
        >
          <FaPlusCircle />
          Add Session
        </Button>
      </Flex>

      {resultToBeViewed.usage === "view" && (
        <ViewSession
          result={resultToBeViewed.result}
          resetResultToBeViewed={resetResultToBeViewed}
        />
      )}
      {resultToBeViewed.usage === "share" && (
        <ShareResultModal
          result={resultToBeViewed.result}
          resetResultToBeViewed={resetResultToBeViewed}
          setResultToBeViewed={setResultToBeViewed}
          resultRef={resultRef}
          toPDF={toPDF}
        />
      )}
      {resultToBeViewed.usage === "share" && (
        <Box pos="fixed" top="0" zIndex={-40} left="-120vw" ref={targetRef}>
          <Box ref={resultRef}>
            <Result sessionResult={resultToBeViewed.result} />
          </Box>
        </Box>
      )}

      {/* <PieChart width={700} height={400}>
        <Pie
          dataKey="cgpa"
          isAnimationActive={false}
          data={levelsData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          
        />
      </PieChart> */}
    </Container>
  );
};

export default MyGpas;
