import { Suspense, useContext, useEffect, useState } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth, savePreviousLocation } from "../firebase";
import { setSessionGradingSystem } from "./utils";
import {
  Grid,
  Heading,
  Img,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";

const PageWrapper = ({ Component }) => {
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const [loginMode, setLoginMode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const pulse = keyframes`  
  0% {transform: scale(.8)}   
  50% {transform: scale(1.2)}   
  100% {transform: scale(.8)} 
`;
  useEffect(() => {
    savePreviousLocation(location);
  }, [location]);

  useEffect(() => {
    checkAuth(setUserDetails, toast, navigate, setLoginMode);
    // if(!userDetails.setup.grading_system){
    //   navigate("/user-setup")
    // }
    console.log(userDetails);
    
    userDetails.uid &&
      setSessionGradingSystem(userDetails.setup.grading_system);
    // !userDetails.uid && ;
  }, []);
  const logo = useColorModeValue("logo.png", "logoalt.png");
  if (userDetails.uid) {
    return (
      <>
        {/* <Suspense fallback={<div>loading...</div>}> */}
        <Navbar navigate={navigate} userDetails={userDetails} />
        <Component
          userDetails={userDetails}
          toast={toast}
          loginMode={loginMode}
          setUserDetails={setUserDetails}
        />
        {/* </Suspense> */}
      </>
    );
  } else {
    return (
      <Grid placeItems={"center"} h="100vh">
        <Heading
          w={"clamp(5rem, 10vw, 10rem)"}
          fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
          // mx="auto"
          // color={{ base: "secondary" }}
          as="h1"
          animation={` ${pulse} infinite 1s linear `}
          transition={"all 1s ease"}
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/${logo}`} />
        </Heading>
      </Grid>
    );
  }
};

export default PageWrapper;
