import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPencilAlt, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { calculateCGPA } from "../../utils";
import { FaChartLine } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const ViewSession = ({ result, resetResultToBeViewed }) => {
  let { level, session, semesters, _id } = result;
  let [first_semester, second_semester] = semesters;
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(100,100,100, .3)"
  );
  const [isOpen, setIsOpen] = useState(true);  // Track if the modal is open or closed

  return (
    <Center pos="fixed" inset={"0"} h="calc(100vh - 5rem)" zIndex={"10"} top="5rem">
      <Box pos="absolute" inset={"0"} backdropFilter={"blur(5px)"} bg="rgba(0,0,0,.5)" />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.2 }  // Fast fade
            }}
          >
        <Box
          p="6"
          bg={bgColor}
          pos="relative"
          rounded={".5rem"}
          w="90vw"
          maxW={"30rem"}
          shadow={`0 0 5px ${shadowColor}`}
        >
          <Box textAlign={"center"}>
            <Heading as="h5" fontSize={"1.2rem"}>
              {level} Result
            </Heading>
            <Text fontSize={"1rem"}>
              CGPA:{" "}
              <Text as="span" fontWeight={"bold"} color={"accentVar"}>
                {calculateCGPA(semesters)}
              </Text>
            </Text>
          </Box>
          <Flex
            w="100%"
            my="4"
            flexWrap={"wrap"}
            gap="6"
            maxH={"min(65vh, 30rem)"}
            overflow={"auto"}
          >
            {/* {first_semester.gpa !== 0 && ( */}
            <Box w="100%">
              <Heading as="h6" fontSize={".8rem"} textAlign={"center"}>
                First Semester - {first_semester.gpa}
              </Heading>
              <Box maxH="20vh" mt="3" overflow={"auto"}>
                <Table p="1" variant={"simple"} my="1" overflow={"hidden"}>
                  <Thead>
                    <Tr>
                      <Th
                        p="1"
                        w="70%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                      >
                        Course
                      </Th>
                      <Th
                        p="1"
                        w="12%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                        textAlign={"center"}
                      >
                        Credit Load
                      </Th>
                      <Th
                        p="1"
                        w="12%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                        textAlign={"center"}
                      >
                        Grade
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {first_semester.courses.map(
                      ({ course, course_code, grade, credit_load }, index) => (
                        <Tr key={index}>
                          <Td p="1" w="70%">
                            {course ? course : course_code}
                          </Td>
                          <Td p="1" w="12%" textAlign={"center"}>
                            {credit_load}
                          </Td>
                          <Td p="1" w="12%" textAlign={"center"}>
                            {grade}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>
            {/* )} */}
            {/* {second_semester.gpa !== 0 && ( */}
            <Box w="100%">
              <Heading as="h6" fontSize={".8rem"} textAlign={"center"}>
                Second Semester - {second_semester.gpa}
              </Heading>
              <Box maxH="20vh" mt="3" overflow={"auto"}>
                <Table overflow={"hidden"} p="1" variant={"simple"} my="1">
                  <Thead>
                    <Tr>
                      <Th
                        p="1"
                        w="70%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                      >
                        Course
                      </Th>
                      <Th
                        p="1"
                        w="12%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                        textAlign={"center"}
                      >
                        Credit Load
                      </Th>
                      <Th
                        p="1"
                        w="12%"
                        textTransform={"capitalize"}
                        fontSize={".8rem"}
                        textAlign={"center"}
                      >
                        Grade
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {second_semester.courses.map(
                      ({ course, course_code, grade, credit_load }, index) => (
                        <Tr key={index}>
                          <Td p="1" w="70%" textTransform={"capitalize"}>
                            {course ? course : course_code.toUpperCase()}
                          </Td>
                          <Td p="1" w="12%" textAlign={"center"}>
                            {credit_load}
                          </Td>
                          <Td p="1" w="12%" textAlign={"center"}>
                            {grade}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>
            {/* )} */}
          </Flex>

          {/* Buttons */}
          <HStack
            pos="absolute"
            bottom={"-.75rem"}
            left={"50%"}
            transform={"translateX(-50%)"}
          >
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
              to={`/gpa-calc/${_id}`}
            >
              <FaPencilAlt /> Edit
            </Button>
            <Button
              color={"accentVar"}
              border={"1px solid"}
              h="unset"
              gap="1"
              py="1"
              px="2"
              fontWeight={"semibold"}
              bg={bgColor}
              boxShadow={`0 0 5px ${shadowColor}`}
              _hover={{ bg: "secondary", color: "accentVar" }}
              as={Link}
              to={`/overview/${_id}`}
            >
              <FaChartLine /> View Details
            </Button>
          </HStack>
          <Button
            pos="absolute"
            top={"-.5rem"}
            p="0"
            py="1"
            right={"0"}
            color={"red"}
            h="unset"
            w="unset"
            fontWeight={"semibold"}
            bg={bgColor}
            rounded={"full"}
            roundedBottomRight={0}
            _hover={{ bg: "red", color: "secondary" }}
            onClick={resetResultToBeViewed}
          >
            <FaTimesCircle />
          </Button>
        </Box>
      </motion.div>)}
      </AnimatePresence>
    </Center>
  );
};

export default ViewSession;
