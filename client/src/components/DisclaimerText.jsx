import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Create a MotionBox component using framer-motion
const MotionBox = motion(Box);

const DisclaimerText = () => {
  return (
    <Box
      overflow="hidden"
      whiteSpace="nowrap"
      width="100%"
      bg="#EEE8AA"
    //   py={2}
    px="2"
      color="#FF8C00"
      pos={"absolute"}
      top="5"
      left="0"
      h="unset"
    >
      <MotionBox
        display="inline-block"
        animate={{
          x: ["100%", "-100%"], // Move from right to left
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Text fontSize="sm" fontWeight="bold" mx={4} display="inline">
        Reminder: Please save your course input before leaving this page to
        prevent data loss.
        </Text>
      </MotionBox>
    </Box>
  );
};

export default DisclaimerText;
