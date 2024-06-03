import { useContext, useEffect } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../firebase";

const PageWrapper = ({ Component }) => {
  const { userDetails, setUserDetails, toast } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth(setUserDetails, toast, navigate)
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
