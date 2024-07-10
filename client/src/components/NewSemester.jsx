import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Spacer,
  Text,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import { calculateGpa } from "../utils";

const NewSemester = ({
  semester,
  courses,
  setCourses,
  gpa,
  setGpa,
  updateSemesterDetails,
  gradeList,
}) => {
  const [showCourses, setShowCourses] = useState(true);
  const toast = useToast({ position: "top-right" });
  const coursesContainerRef = useRef();
  const handleInputChange = useCallback(
    (e, index, field) => {
      const newCourses = [...courses];
      newCourses[index][field] = e.target.value;
      setCourses(newCourses);
      updateSemesterDetails({
        detail: `semesters`,
        sub_detail: "courses",
        detail_index: semester,
        detail_new_value: newCourses,
      });
    },
    [courses, semester, setCourses, updateSemesterDetails]
  );

  const handleCourseRemoval = useCallback(
    (index) => {
      let updatedCourses = [...courses];
      updatedCourses.splice(index, 1);
      setCourses(updatedCourses);
      updateSemesterDetails({
        detail: `semesters`,
        sub_detail: "courses",
        detail_index: semester,
        detail_new_value: updatedCourses,
      });
    },
    [semester, setCourses, updateSemesterDetails]
  );

  const handleAddCourse = useCallback(() => {
    const lastCourse = courses[courses.length - 1];
    if (
      (lastCourse.course || lastCourse.course_code) &&
      lastCourse.credit_load &&
      lastCourse.grade
    ) {
      const updatedCourses = [
        ...courses,
        { course: "", course_code: "", credit_load: "", grade: "" },
      ];
      setCourses(updatedCourses);
      updateSemesterDetails({
        detail: `semesters`,
        sub_detail: "courses",
        detail_index: semester,
        detail_new_value: updatedCourses,
      });
    } else {
      toast({
        title: "Incomplete Course",
        description:
          "Fill out the current course details before adding a new one.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [courses, semester, setCourses, updateSemesterDetails]);

  const handleGpaUpdate = useCallback(() => {
    const calculatedGpa = calculateGpa(courses);
    setGpa(calculatedGpa);
    updateSemesterDetails({
      detail: `semesters`,
      sub_detail: "gpa",
      detail_index: semester,
      detail_new_value: calculatedGpa,
    });
  }, [courses, semester, setGpa, updateSemesterDetails]);

  useEffect(() => {
    if (coursesContainerRef.current) {
      coursesContainerRef.current.scrollTop =
        coursesContainerRef.current.scrollHeight;
    }
  }, [courses]);
  return (
    <Box
      my="4"
      w={{ base: "100%", sm: "80%", md: "45%" }}
      maxH="65vh"
      overflowY={"auto"}
    >
      <Flex gap="2" alignItems={"center"} mb="2">
        <Icon
          as={showCourses ? FaCircleChevronUp : FaCircleChevronDown}
          color={"accentVar"}
          onClick={() => setShowCourses((prevShowCourses) => !prevShowCourses)}
          cursor={"pointer"}
          transition={"opacity .3s linear"}
          _hover={{ opacity: ".7" }}
        />
        <Heading as="h5" fontSize={"1.2rem"} textTransform={"capitalize"}>
          {semester === 1 ? "First" : "Second"} Semester
        </Heading>
        <Spacer />
        <Text>GPA: {gpa}</Text>
      </Flex>
      <Box
        h={showCourses ? "auto" : "0"}
        overflow={"hidden"}
        transition={"height .3s linear"}
      >
        <VStack gap={{ base: "6", md: "4" }} ref={coursesContainerRef}>
          {courses.map((course, index) => (
            <NewCourse
              key={index}
              index={index}
              course={course}
              handleInputChange={handleInputChange}
              handleCourseRemoval={() => handleCourseRemoval(index)}
              handleGpaUpdate={handleGpaUpdate}
              gradeList={gradeList}
            />
          ))}
        </VStack>
        <Flex justifyContent="center" mt="4">
          <Button
            gap="2"
            rounded="1rem"
            fontWeight="semibold"
            bg="accentVar"
            color="white"
            _hover={{
              bg: "transparent",
              border: "1px solid",
              borderColor: "accentVar",
              color: "accentVar",
            }}
            onClick={handleAddCourse}
          >
            <FaPlusCircle />
            Add Course
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const NewCourse = ({
  index,
  course,
  handleInputChange,
  handleCourseRemoval,
  handleGpaUpdate,
  gradeList,
}) => {
  return (
    <Flex gap="2" alignItems={"center"} w="100%">
      <Flex gap="0" w="100%" flexWrap={"wrap"}>
        <Input
          type="text"
          value={course.course}
          textTransform={"capitalize"}
          onChange={(e) => handleInputChange(e, index, "course")}
          w="65%"
          placeholder="course"
        />
        <Input
          type="text"
          value={course.course_code}
          placeholder={"course code"}
          w="35%"
          textTransform={"uppercase"}
          onChange={(e) => handleInputChange(e, index, "course_code")}
        />
        <Select
          type="number"
          value={course.credit_load}
          onChange={(e) => {
            handleInputChange(e, index, "credit_load");
            handleGpaUpdate();
          }}
          placeholder="credit load"
          flex="1"
        >
          {[...Array(9)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Select
          value={course.grade}
          onChange={(e) => {
            handleInputChange(e, index, "grade");
            handleGpaUpdate();
          }}
          flex="1"
          placeholder="Grade"
          color={(value) => (value === "Grade" ? "#9e9e9e" : "black")}
        >
          {gradeList().map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </Select>
      </Flex>
      <Icon
        as={FaTimesCircle}
        color={"accentVar"}
        onClick={handleCourseRemoval}
      />
    </Flex>
  );
};

export default NewSemester;
