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
import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { FaEye, FaSchoolCircleXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LevelResult, ViewSession } from "../components";
import axios from "axios";
import { calculateCGPA, sortData, throwAppError } from "../utils";
import { Pie, PieChart } from "recharts";

const MyGpas = ({ userDetails }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [resultToBeViewed, setResultToBeViewed] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast({ position: "top-right", duration: 3000 });
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
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
      );
      let results = sortData(response);
      setSavedResults(sortData(response));
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      // if(error.message)
    }
  };

  const deleteASavedResult = async (index, level) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-one-session/${index}`
      );
      getResultsFromDB();

      toast({
        title: `Result Deleted`,
        description: `Your ${level} result has been deleted`,
        status: "success",
        // isClosable:
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error(error);
      throwAppError(toast, error);
    }
  };
  useEffect(() => {
    // getSavedResults();
    getResultsFromDB();
  }, []);
  // function getAddedLevels(savedResults) {
  //   let addedLevels = [];
  //   addedLevels = savedResults.map(({ level }) => [...addedLevels, level]);
  //   return addedLevels
  // }
  useEffect(() => {
    // getSavedResults();
    getLevelsData();
  }, [savedResults]);

  return (
    <Container py="8" maxW="72rem" mx="auto">
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
      {Object.keys(resultToBeViewed).length !== 0 && (
        <ViewSession
          result={resultToBeViewed}
          setResult={setResultToBeViewed}
        />
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
