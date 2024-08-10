import { useContext, useEffect, useState } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth, savePreviousLocation } from "../firebase";
import { setSessionGradingSystem } from "./utils";
import { Box, Grid, Heading, Img, keyframes, useColorModeValue } from "@chakra-ui/react";

const PageWrapper = ({ Component }) => {
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const [loginMode, setLoginMode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const pulseAnimation = keyframes`  
    0% { transform: scale(0.8); }   
    50% { transform: scale(1.2); }   
    100% { transform: scale(0.8); } 
  `;

  useEffect(() => {
    savePreviousLocation(location);
  }, [location]);

  useEffect(() => {
    const initializeAuth = async () => {
      checkAuth(setUserDetails, toast, navigate, setLoginMode);
      if (userDetails?.uid) {
        setSessionGradingSystem(userDetails.setup.grading_system);
      }
    };

    initializeAuth();
  }, [userDetails?.uid]);

  const logoSrc = useColorModeValue("logo.png", "logoalt.png");

  if (userDetails?.uid) {
    return (
      <>
        <Navbar navigate={navigate} userDetails={userDetails} />
        <Box pt="20">
        <Component
          userDetails={userDetails}
          toast={toast}
          loginMode={loginMode}
          setUserDetails={setUserDetails}
        />
        </Box>
      </>
    );
  }

  return (
    <Grid placeItems="center" h="100vh">
      <Heading
        w="clamp(5rem, 10vw, 10rem)"
        fontSize="clamp(1.2rem, 3vw, 1.5rem)"
        animation={`${pulseAnimation} infinite 1s linear`}
        transition="all 1s ease"
      >
        <Img alt="eliteGPA" w="100%" src={`/images/4x/${logoSrc}`} />
      </Heading>
    </Grid>
  );
};

export default PageWrapper;
