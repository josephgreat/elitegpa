import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  calculateCGPA,
  calculateSessionCourses,
  calculateSessionCreditLoad,
  calculateUserGradePoint,
} from "../utils";
import { FaChartLine } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SessionTable = ({ session }) => {
  let { semesters, level, _id } = session;
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const shadowColor = useColorModeValue("rgba(50,50,50, .3)", "rgba(100,100,100, .3)");
  return (
    <Box mb="8">
      <Box overflowX="auto">
        <Heading fontSize={"md"} as="h5" mb="2">
          {level} Academic session
        </Heading>
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>No. of Courses</Th>
              <Th>Credit Load</Th>
              <Th>Total GP</Th>
              <Th>Your Grade Point</Th>
              <Th>Your GPA</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{calculateSessionCourses(semesters)}</Td>
              <Td>{calculateSessionCreditLoad(semesters)}</Td>
              <Td>{""}</Td>
              <Td>
                {calculateUserGradePoint(semesters[0]) +
                  calculateUserGradePoint(semesters[1])}
              </Td>
              <Td>{calculateCGPA(semesters)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent={"center"}>
        <Button
          color={"accentVar"}
          border={"1px solid"}
          h="unset"
          gap="1"
          py="1"
          px="2"
          fontWeight={"semibold"}
          bg="transparent"
          mt="2"
          boxShadow={`0 0 5px ${shadowColor}`}
          _hover={{ bg: "accentVar", color: "secondary" }}
          as={Link}
          to={`/overview/${_id}`}
        >
          <FaChartLine /> View Details
        </Button>
      </Flex>
    </Box>
  );
};

export default SessionTable;
