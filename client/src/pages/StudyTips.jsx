import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Img,
  List,
  ListItem,
  ListIcon,
  Text,
  Link,
} from "@chakra-ui/react";
import {FaCheck} from "react-icons/fa"
const StudyTips = () => {
  const [studyTips, setStudyTips] = useState([]);
  const moreTips = [
    {
      title: "10 tips on how to study effectively",
      link:
        "https://www.vu.edu.au/about-vu/news-events/study-space/10-tips-on-how-to-study-effectively",
    },
    {
      title: "Top 10 Study Tips to Study Like a Harvard Student",
      link:
        "https://summer.harvard.edu/blog/top-10-study-tips-to-study-like-a-harvard-student/",
    },
    {
      title: "Studying 101: Study Smarter Not Harder",
      link:
        "https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/studyTips.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        console.log(data.tips);
        setStudyTips(data.tips); // Assuming the API returns an array of study tips
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        Study Tips
      </Heading>
      <List
        py="4"
        display={"flex"}
        justifyContent={"space-around"}
        flexDir={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        gap="4"
      >
        {Object.values(studyTips).map((tip) => (
          <ListItem
            key={tip.id}
            mb="8"
            display={"flex"}
            w={{ base: "100%", md: "45%" }}
            gap="4"
            boxShadow={"lg"}
            rounded={".5rem"}
            // overflow={"hidden"}
            pos={"relative"}
            alignItems={"center"}
          >
            <Box flex={"1"} p="4" px="6" order={tip.id % 2 == 0 ? "0" : "1"}>
              <Heading
                as="h5"
                fontSize={"1.1rem"}
                display="flex"
                flexDir={"column"}
                color={"primary"}
              >
                {tip.title}
              </Heading>
              <Text>{tip.description}</Text>
            </Box>

            <Box
              flex={"1"}
              pos="relative"
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Img src={tip.image} alt={`Image depicting ${tip.title}`} />
            </Box>
            <Heading
              as="span"
              fontSize={"1rem"}
              pos="absolute"
              top="-.5rem"
              left={tip.id % 2 != 0 && "-.5rem"}
              right={tip.id % 2 == 0 && "-.5rem"}
              // opacity={".5"}
              // filter={"contrast(.4)"}
              color={"primary"}
              boxShadow="inset 0 0 8px 0px rgba(80,80,80,.5)"
              alignSelf={"flex-end"}
              bg="accent"
              p="2"
              rounded="full"
            >
              #{tip.id}
            </Heading>
          </ListItem>
        ))}
      </List>
      <Box>
        <Heading fontSize="1.3rem">More Tips</Heading>
        <List py="4">
          {moreTips.map((tip, index) => (
            <ListItem key={index} my="2">
                <ListIcon><FaCheck /></ListIcon>
              <Link href={tip.link} target="_blank" color="accentVar">{tip.title}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default StudyTips;
