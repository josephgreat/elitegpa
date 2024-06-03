import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Img,
  Select,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
  VStack,
} from "@chakra-ui/react";
import {
  SelectGradeSystem,
  SelectInstitution,
  SelectLevel,
} from "../components";
import { setupAccount } from "../../firebase";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const UserSetup = () => {
  let steps = [];
  const [accountSetup, setAccountSetup] = useState({
    institution: "",
    institution_state: "",
    grading_system: "",
    program_type: "",
    years_of_study: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const handleAccountSetupSubmit = () => {
    setLoading(true);
    setupAccount(
      accountSetup,
      setUserDetails,
      userDetails,
      setLoading,
      toast,
      navigate
    );
  };
  steps = [
    {
      title: "Select Institution",
      component: (
        <SelectInstitution
          setActiveStep={setActiveStep}
          accountSetup={accountSetup}
          setAccountSetup={setAccountSetup}
        />
      ),
    },
    {
      title: "Level of Tertiary Program",
      component: (
        <SelectLevel
          setActiveStep={setActiveStep}
          accountSetup={accountSetup}
          setAccountSetup={setAccountSetup}
        />
      ),
    },
    {
      title: "Choose Grade System",
      component: (
        <SelectGradeSystem
          accountSetup={accountSetup}
          setAccountSetup={setAccountSetup}
          handleAccountSetupSubmit={handleAccountSetupSubmit}
        />
      ),
    },
  ];

  useEffect(() => {
    !userDetails.uid && navigate("/signup");
  }, []);
  if (userDetails.uid) {
    return (
      <Container maxW={"unset"} minH="100vh" p="0">
        <Flex flexDir={{ base: "column", md: "row" }} gap="4" minH="100vh">
          <Box
            bgGradient={"linear(to-br, primary, accentVar)"}
            flex={{ md: "1" }}
            order={{ md: 2 }}
          >
            <Heading
              fontSize={"1.3rem"}
              color={"secondary"}
              textAlign={"center"}
              py="4"
            >
              eliteGPA
            </Heading>
            <Box w="clamp(12rem, 45vw, 30rem)" mx="auto" my="10">
              <Img src="/images/steps.png" minH="15rem" />
            </Box>
          </Box>
          <Box
            py="8"
            order={{ md: 1 }}
            maxW="72rem"
            mx="auto"
            px="4"
            flex={{ md: "1" }}
            minH={{ md: "100vh" }}
            placeItems={"center"}
            as={Grid}
          >
            <Box maxW={{ md: "80%" }} mx="auto">
              <Heading textAlign={"center"} mb="8">
                Account Setup
              </Heading>
              <Stepper index={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    style={{ flexWrap: "wrap", alignItems: "center" }}
                  >
                    <StepIndicator
                      sx={{
                        "[data-status=complete] &": {
                          background: "primary",
                          borderColor: "accent",
                        },
                        "[data-status=active] &": {
                          background: "accentVar",
                          borderColor: "accentVar",
                          color: "secondary",
                        },
                        "[data-status=incomplete] &": {
                          background: "secondary",
                          borderColor: "accentVar",
                        },
                      }}
                      onClick={() => activeStep > index && setActiveStep(index)}
                    >
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription></StepDescription>
                    </Box>
                    <Box ml={"3rem"} mb="4" w="100%">
                      {activeStep == index && step.component}
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Flex>
        {loading && (
          <Grid
            pos="fixed"
            zIndex={"2"}
            inset="0"
            bg="rgba(20,20,20,.5)"
            backdropFilter={"blur(5px)"}
            placeItems="center"
          >
            <VStack>
              <Spinner size="xl" borderWidth={"3px"} color={"white"} />
              <Text color={"white"} fontWeight="bold" letterSpacing=".3rem">
                Loading...
              </Text>
            </VStack>
          </Grid>
        )}
      </Container>
    );
  }
};

export default UserSetup;
