import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
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
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FaPencilAlt, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { calculateCGPA } from "../../utils";
import {
  FaChartLine,
  FaCopy,
  FaDownload,
  FaFacebook,
  FaFacebookF,
  FaFilePdf,
  FaImage,
  FaSquareWhatsapp,
  FaWhatsapp,
} from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../../App";
import html2canvas from "html2canvas";
const ShareResultModal = ({
  result,
  resetResultToBeViewed,
  resultRef,
  toPDF,
}) => {
  let { level, session, semesters, _id } = result;
  const { userDetails } = useContext(UserContext);
  const { toast } = useContext(UserContext);
  // let [first_semester, second_semester] = semesters;
  const isXSmall = useBreakpointValue({ base: true, sm: false });
  const bgColor = useColorModeValue("secondary", "secondaryAlt");
  const borderColor = useColorModeValue("secondaryAlt", "secondary");
  const bgBrightness = useColorModeValue("brightness(0.9)", "brightness(0.1)");

  const shadowColor = useColorModeValue(
    "rgba(50,50,50, .3)",
    "rgba(100,100,100, .3)"
  );
  const [isOpen, setIsOpen] = useState(true); // Track if the modal is open or closed
  const [resultImageUrl, setResultImageUrl] = useState("");
  function shortenUrl(url, length = 20) {
    if (url.length <= length) return url; // If URL is already short enough
    const protocol = url.split("://")[0] + "://";
    const urlWithoutProtocol = url.replace(protocol, "");
    return protocol + urlWithoutProtocol.slice(0, length) + "...";
  }

  const originalUrl = `${window.location.origin}/result/${result.uid}/${result._id}`;
  const displayUrl = shortenUrl(originalUrl, isXSmall ? 15 : 30);

  const copyUrl = () => {
    navigator.clipboard
      .writeText(originalUrl)
      .then(() => {
        toast({ title: `Result link Copied`, status: "success" });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  //   const handlePrint = useReactToPrint({resultRef});

  const downloadResultAsImage = () => {
    html2canvas(resultRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL(); // Get the image data URL from the canvas

      // Create a download link dynamically and trigger the download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${userDetails.displayName}'s ${level} Result.jpeg`; // Filename for the download
      link.click(); // Trigger the download
    });
  };

  const downloadResultAsPdf = () => {
    toPDF();
  };

  const shareImageOnWhatsApp = () => {
    const message = `${userDetails.displayName}'s ${level} Result: \n${originalUrl} \n\n I used eliteGPA to generate it. You can create an account to generate yours: \n https://elitegpa.com/signup`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareImageOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      originalUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <Center pos="fixed" inset={"0"} h="calc(100vh - 5rem)" top="5rem">
      <Box
        pos="absolute"
        inset={"0"}
        backdropFilter={"blur(5px)"}
        bg="rgba(0,0,0,.5)"
      />

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
              opacity: { duration: 0.2 }, // Fast fade
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
              <VStack gap="4" alignItems={"flex-start"}>
                <Box textAlign={"center"} w="full">
                  <Heading as="h5" fontSize={"1.2rem"}>
                    Share your {level} result
                  </Heading>
                </Box>
                <Flex
                  backdropFilter={bgBrightness}
                  justifyContent={"space-between"}
                  rounded={"4"}
                  w="full"
                >
                  <Text p="2">{displayUrl}</Text>
                  <Button
                    fontSize={".85rem"}
                    roundedLeft={"0"}
                    bg="accentVar"
                    border="1px solid"
                    color="secondary"
                    _focus={{
                      bg: "transparent",
                      borderColor: "accentVar",
                      color: "accentVar",
                    }}
                    onClick={copyUrl}
                  >
                    <FaCopy />
                  </Button>
                </Flex>
                <HStack mx="auto" w="fit-content">
                  <Text>Download as:</Text>
                  <Icon
                    bg={"accentVar"}
                    shadow={"md"}
                    p=".3rem"
                    rounded="4"
                    fontSize={"1.8rem"}
                    as={FaImage}
                    _hover={{ bg: "transparent", color: "accentVar" }}
                    cursor="pointer"
                    transition={"all .3s ease"}
                    onClick={downloadResultAsImage}
                  />
                  <Icon
                    bg={"accentVar"}
                    shadow={"md"}
                    p=".3rem"
                    rounded="4"
                    fontSize={"1.8rem"}
                    as={FaFilePdf}
                    _hover={{ bg: "transparent", color: "accentVar" }}
                    cursor="pointer"
                    transition={"all .3s ease"}
                    onClick={downloadResultAsPdf}
                  />
                </HStack>
                <HStack align="center" w="full" spacing={4}>
                  <Divider borderColor={borderColor} />
                  <Text whiteSpace="nowrap">or share via</Text>
                  <Divider borderColor={borderColor} />
                </HStack>

                <HStack mx="auto" w="fit-content">
                  <Icon
                    as={FaWhatsapp}
                    bg="#128c7e"
                    fill="white"
                    p=".2rem"
                    fontSize={"1.8rem"}
                    shadow="md"
                    rounded="full"
                    _hover={{ bg: "transparent", fill: "#128c7e" }}
                    cursor="pointer"
                    transition={"all .3s ease"}
                    onClick={shareImageOnWhatsApp}
                  />
                  <Icon
                    as={FaFacebookF}
                    bg="#1877F2"
                    fill="white"
                    p=".2rem"
                    fontSize={"1.8rem"}
                    shadow="md"
                    rounded="full"
                    _hover={{ bg: "transparent", fill: "#1877F2" }}
                    cursor="pointer"
                    transition={"all .3s ease"}
                    onClick={shareImageOnFacebook}
                  />
                </HStack>
              </VStack>
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
          </motion.div>
        )}
      </AnimatePresence>
    </Center>
  );
};

export default ShareResultModal;
