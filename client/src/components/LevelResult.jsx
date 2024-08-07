import { Box, Button, Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { calculateCGPA } from "../utils";


const LevelResult = ({
  result,
  index,
  deleteASavedResult,
  setResultToBeViewed,
}) => {
  let { level, semesters } = result;
  const bgColor = useColorModeValue("secondary", "#1a202c");
  const shadowColor = useColorModeValue("rgba(50,50,50, .3)", "rgba(200,200,200, .3)");

  return (
    <Box
      py="6"
      px="4"
      boxShadow={`inset 0 0 5px ${shadowColor}`}
      rounded="1rem"
      pos="relative"
      key={index}
      w={{ base: "", md: "35%" }}
    >
      <Flex justifyContent={"space-between"} mb="2">
        <Text>{level}</Text>

        <Flex alignItems={"flex-end"} gap="1" fontWeight={"semibold"}>
          <Text fontSize={".8rem"}>CGPA:</Text>
          <Text as="span" fontSize={"1.2rem"} fontFamily={"heading"}>
            {calculateCGPA(semesters)}
          </Text>
        </Flex>
      </Flex>
      <Flex fontSize={".8rem"} justifyContent={"space-around"}>
        <Stack direction="row">
          <Text>
            {semesters[0].semester === 1 ? "First" : "Second"} Semester:{" "}
            {semesters[0].gpa}
          </Text>
          <Divider
            orientation="vertical"
            borderColor={"primary"}
            borderWidth={".05rem"}
          />
          <Text>
            {semesters[1].semester === 1 ? "First" : "Second"} Semester:{" "}
            {semesters[1].gpa}
          </Text>
        </Stack>
      </Flex>
      <Flex
        pos={"absolute"}
        bg={bgColor}
        bottom={"-.5rem"}
        fontSize={".8rem"}
        gap="4"
        justifyContent={"center"}
        w="auto"
        mx="auto"
        px="2"
        left="50%"
        transform={"translateX(-50%)"}
      >
        <Button
          padding={"0"}
          gap="1"
          color={"accentVar"}
          alignItems={"center"}
          h="auto"
          bg="transparent"
          fontSize={".8rem"}
          _hover={{ opacity: 0.6 }}
          onClick={() => setResultToBeViewed(result)}
        >
          <FaEye /> View
        </Button>
        <Button
          p={"0"}
          h="auto"
          gap="1"
          color={"red"}
          alignItems={"center"}
          bg="transparent"
          fontSize={".8rem"}
          _hover={{ opacity: 0.6 }}
          onClick={() => deleteASavedResult(index, level)}
        >
          <FaTrashAlt />
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default LevelResult;
