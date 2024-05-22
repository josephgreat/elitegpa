import { useContext } from "react";
import { Navbar } from "./components";
import { UserContext } from "./App";

const PageWrapper = ({ Component }) => {
  const {userDetails} = useContext(UserContext)
  return (
    <>
      <Navbar userDetails={userDetails} />
      <Component userDetails={userDetails} />
    </>
  );
};

export default PageWrapper;
