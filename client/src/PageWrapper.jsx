import { useContext, useEffect } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth, savePreviousLocation } from "../firebase";
import { setSessionGradingSystem } from "./utils";

const PageWrapper = ({ Component }) => {
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    savePreviousLocation(location);
  }, [location]);

  useEffect(() => {
    checkAuth(setUserDetails, toast, navigate);
    userDetails.uid && setSessionGradingSystem(userDetails.setup.grading_system);
    // !userDetails.uid && ;
  }, []);
  if (userDetails.uid) {
    return (
      <>
        <Navbar navigate={navigate} userDetails={userDetails} />
        <Component userDetails={userDetails} />
      </>
    );
  }
};

export default PageWrapper;
