import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";
import {
  calculateGpa,
  calculateTotalCreditLoad,
  calculateUserGradePoint,
} from "../utils";

const SemesterCoursesTable = ({ semester, title }) => {
  return (
    <Box flex="1" w="100%" mb="4">
      <Heading size="sm" mb={2}>
        {title}
      </Heading>
      <TableContainer
        maxW={{ base: "calc(100vw - 2rem)", md: "unset" }}
        overflowX="auto"
      >
        <Table variant="striped" size={"sm"}>
          <Thead>
            <Tr>
              <Th>Course Title</Th>
              <Th>Course Code</Th>
              <Th>Credit Load</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {semester.courses.map((course, index) => (
              <Tr key={index}>
                <Td textTransform="capitalize">{course.course}</Td>
                <Td textTransform="uppercase">{course.course_code}</Td>
                <Td>{course.credit_load}</Td>
                <Td>{course.grade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex flexWrap={"wrap"} gap="2" my="2" justifyContent={"center"}>
        <Text fontFamily={"heading"} fontSize={"sm"} fontWeight={"semibold"}>
          Total Credit Load: {calculateTotalCreditLoad(semester)}
        </Text>

        <Text fontFamily={"heading"} fontSize={"sm"} fontWeight={"semibold"}>
          Your Total Grade Point: {calculateUserGradePoint(semester)}
        </Text>
        <Text fontFamily={"heading"} fontSize={"sm"} fontWeight={"semibold"}>
          Grade Point Average (GPA): {calculateGpa(semester.courses)}
        </Text>
      </Flex>
    </Box>
  );
};

export default SemesterCoursesTable;
