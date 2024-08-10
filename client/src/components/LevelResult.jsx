import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
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
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(200,200,200, .3)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [levelInput, setLevelInput] = useState("");
  const [levelMismatch, setLevelMismatch] = useState(false);

  const deleteResult = () => {
    if (levelInput.trim().toLowerCase() !== level.toLowerCase()) {
      setLevelMismatch(true);
      return;
    }
    deleteASavedResult(index, level);
    onClose();
  };

  return (
    <Box
      py="6"
      px="4"
      boxShadow={`inset 0 0 5px ${shadowColor}`}
      rounded="1rem"
      pos="relative"
      key={index}
      w={{ base: "", sm: "45%",md: "35%" }}
    >
      <Flex justifyContent={"space-between"} mb="2">
        <Text>{level}</Text>

        <Flex alignItems={"flex-end"} gap="1" fontWeight={"semibold"}>
          <Text fontSize={".8rem"}>CGPA:</Text>
          <Text as="span" fontSize={"1.2rem"} fontFamily={"heading"}>
            {calculateCGPA(semesters).toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      <Flex fontSize={".8rem"} justifyContent={"space-around"}>
        <Stack direction="row">
          <Text>
            {semesters[0].semester === 1 ? "First" : "Second"} Semester:{" "}
            {parseFloat(semesters[0].gpa).toFixed(2)}
          </Text>
          <Divider
            orientation="vertical"
            borderColor={"primary"}
            borderWidth={".05rem"}
          />
          <Text>
            {semesters[1].semester === 1 ? "First" : "Second"} Semester:{" "}
            {parseFloat(semesters[1].gpa).toFixed(2)}
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
          onClick={onOpen}
        >
          <FaTrashAlt />
          Delete
        </Button>
      </Flex>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        w="85%"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Result</ModalHeader>
          <ModalBody>
            <Text mb="2">
              Are you certain you want to permanently delete {level} result?
            </Text>
            <Text mb="2" color="red.500" fontWeight={"bold"}>
              This action is irreversible
            </Text>
            <Box mb="2">
              <FormControl isInvalid={levelMismatch}>
                <FormLabel fontStyle={"italic"}>
                  Type the level to confirm: <Badge>{level}</Badge>
                </FormLabel>
                <Input
                  type="text"
                  value={levelInput}
                  onChange={(e) => setLevelInput(e.target.value)}
                />

                <FormErrorMessage>Incorrect Level</FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter gap="2">
            <Button
              _hover={{ bg: "transparent", color: "red.500" }}
              border="1px solid"
              borderColor={"red.500"}
              bg="red.500"
              color="secondary"
              onClick={deleteResult}
            >
              Delete
            </Button>
            <Button bg="transparent" border={"1px solid"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LevelResult;
