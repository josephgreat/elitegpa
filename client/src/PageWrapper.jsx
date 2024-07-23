import { Suspense, useContext, useEffect, useState } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { checkAuth, savePreviousLocation } from "../firebase";
import { setSessionGradingSystem } from "./utils";

const PageWrapper = ({ Component }) => {
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const [loginMode, setLoginMode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    savePreviousLocation(location);
  }, [location]);

  useEffect(() => {
    checkAuth(setUserDetails, toast, navigate, setLoginMode);
    userDetails.uid &&
      setSessionGradingSystem(userDetails.setup.grading_system);
    // !userDetails.uid && ;
  }, []);
  if (userDetails.uid) {
    return (
      <>

      <Suspense fallback={<div>loading...</div>}>

        <Navbar navigate={navigate} userDetails={userDetails} />
        <Component
          userDetails={userDetails}
          toast={toast}
          loginMode={loginMode}
          setUserDetails={setUserDetails}
        />
      </Suspense>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default PageWrapper;
