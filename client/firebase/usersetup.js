import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import app from "./init";
import { useNavigate } from "react-router-dom";

export const setupAccount = async (
  accountSetup,
  setUserDetails,
  userDetails,
  setLoading,
  toast,
  navigate
) => {
  const db = getFirestore(app);

  try {
    const accountSetupRef = doc(collection(db, "users"), userDetails.uid);
    setUserDetails({ ...userDetails, setup: accountSetup });
    await updateDoc(accountSetupRef, { setup: accountSetup });
    await toast({
      title: `Welcome Elite`,
      description: `Your account has been setup Successfully!`,
      status: "success",
    });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast({
      title: `${errorCode}`,
      description: `${errorMessage}`,
      status: "error",
    });
  }
};
