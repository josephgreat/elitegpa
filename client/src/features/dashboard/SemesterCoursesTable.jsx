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
} from "../../utils";

const SemesterCoursesTable = ({ semester, title, downloadable, grading_system }) => {
  return (
    <Box flex="1" w="100%" mb="4">
      <Heading size="sm" mb={2}>
        {title}
      </Heading>
      <TableContainer
        maxW={{ base: !downloadable && "calc(100vw - 2rem)", md: "unset" }}
        overflowX="auto"
      >
        <Table variant="simple" size={"sm"}>
          <Thead bg="accentVar" color={"secondary"}>
            <Tr>
              <Th pb={downloadable && "4"} color={"secondary"}>
                Course Title
              </Th>
              <Th pb={downloadable && "4"} color={"secondary"}>
                Course Code
              </Th>
              <Th pb={downloadable && "4"} color={"secondary"}>
                Credit Load
              </Th>
              <Th pb={downloadable && "4"} color={"secondary"}>
                Grade
              </Th>
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
      <Flex
        flexWrap={"wrap"}
        gap="4"
        alignItems={"center"}
        flexDir={{ base: "column", sm: "row" }}
        my="2"
        justifyContent={"center"}
      >
        <Text fontFamily={"heading"} fontSize={"sm"} fontWeight={"semibold"}>
          Total Credit Load: {calculateTotalCreditLoad(semester)}
        </Text>

        <Text fontFamily={"heading"} fontSize={"sm"} fontWeight={"semibold"}>
          Your Total Grade Point: {calculateUserGradePoint(semester, grading_system)}
        </Text>
      </Flex>
      <Text
        textAlign={"center"}
        fontFamily={"heading"}
        fontSize={"md"}
        fontWeight={"bold"}
      >
        Grade Point Average (GPA):{" "}
        <Text as="span" fontSize={"xl"}>
          {calculateGpa(semester.courses, grading_system).toFixed(1)}
        </Text>
      </Text>
    </Box>
  );
};

export default SemesterCoursesTable;
