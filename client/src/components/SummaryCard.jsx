import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import GaugeChart from "react-gauge-chart";
import { getSessionGradingSystem } from "../utils";

const SummaryCard = ({
  small_screen,
  cgpa,
  studentClass,
  totalCreditLoad,
  totalCourses,
}) => {
  const guageUtils = () => {
    let gradePointRate = getSessionGradingSystem().split(" ")[0].toLowerCase();
    if (gradePointRate === "five") return {totalPercent: 5,  arcLengthPoints: [0.2, 0.2, 0.1, 0.2, 0.2, 0.1]};
    else return {totalPercent: 4, arcLengthPoints: [0.25, 0.125, 0.25, 0.25, 0.125]};
  };
  return (
    <Flex
      display={{
        base: small_screen ? "flex" : "none",
        md: small_screen ? "none" : "flex",
      }}
      bgGradient={"linear(to-br, primary, accentVar)"}
      alignItems={"center"}
      color={"secondary"}
      boxShadow={"inset 0 4px 30px rgba(0, 0, 0, 0.3)"}
      backdropFilter={"blur(5px)"}
      flexDir={"column"}
      gap="2"
      p="4"
      px="6"
      rounded=".5rem"
      mx="auto"
      mb="8"
      mt={{ md: "8" }}
    >
      <Heading size="xs" mb={2}>
        CGPA Summary
      </Heading>
      <Text
        mb={1}
        fontFamily={"heading"}
        fontWeight={"bold"}
        fontSize={"clamp(1.5rem, 4vw, 1.6rem)"}
      >
        {/* {cgpa} */}
      </Text>
      <GaugeChart
        id="cgpaGauge"
        // nrOfLevels={5}
        arcsLength={guageUtils().arcLengthPoints}
        colors={["#FF6F61", "#32CD32"]}
        cornerRadius={3}
        percent={cgpa / guageUtils().totalPercent}
        formatTextValue={(val) => cgpa.toFixed(2)}
        arcPadding={0.01}
        needleColor="white"
        neddleBaseColor="white"
        className="cgpa_guage"
        animDelay={700}
        animateDuration={5000}
      />
      <Text mb={1}>
        <Badge bg={studentClass.badgeColor} color="black">{studentClass.position}</Badge>
      </Text>
      <HStack gap="3">
        <VStack gap="1">
          <Text fontFamily={"heading"} fontWeight={"semibold"}>
            {totalCreditLoad}
          </Text>
          <Text mb={1} fontSize={"x-small"}>
            Total Credit Load
          </Text>
        </VStack>
        <VStack gap="1">
          <Text fontFamily={"heading"} fontWeight={"semibold"}>
            {totalCourses}
          </Text>
          <Text mb={1} fontSize={"x-small"}>
            Total Courses
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default SummaryCard;
