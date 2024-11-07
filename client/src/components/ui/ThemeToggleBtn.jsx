import { Button, useColorMode, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaLightbulb, FaMoon } from "react-icons/fa6";

const MotionIcon = motion.div;

const ThemeToggleBtn = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      pos="fixed"
      zIndex="120000"
      bottom="2rem"
      left="-2"
      pl="6"
      roundedRight="full"
      h="fit-content"
      p="4"
      transition={"all .2s ease"}
      opacity={".7"}
      _hover={{ left: -1, opacity: 1 }}
      bg="white"
      // bgGradient="linear(to-r, #191970f8, #008080f8)"
      color={"white"}
      border="2px solid"
      borderColor="transparent"
      _before={{
        content: '""',
        position: "absolute",
        top: "-2px",
        left: "-2px",
        shadow: "inset 0 0 .1rem",
        right: "-2px",
        bottom: "-2px",
        // opacity: ".8",
        bgClip: "padding-box",
        bgGradient: "linear-gradient(45deg, #191970, #008080)",
        zIndex: -1,
        borderRadius: "inherit",
        animation: "gradient-border 3s ease infinite",
        backgroundSize: "200% 200%",
        
      }}
      
    >
      <MotionIcon
        key={colorMode}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.8] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {colorMode === "dark" ? <FaLightbulb /> : <FaMoon />}
      </MotionIcon>
    </Button>
  );
};

export default ThemeToggleBtn;
