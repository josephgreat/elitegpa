import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./init";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { eraseCookie, getCookie } from "../src/utils";

const auth = getAuth(app);
export const checkAuth = (setUserDetails, toast, navigate) => {
  const db = getFirestore(app);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let uid = getCookie("uid");
      let docRef = doc(db, "users", uid);
      let docSnap = await getDoc(docRef);
      setUserDetails(docSnap.data());
      await toast({
        title: `Welcome back Elite`,
        description: `Keep cruising in your elite mode`,
        status: "success",
      });
      navigate("/my-gpas");
    } else navigate("/login");
  });
};

export const logOut = (toast, navigate) => {
  signOut(auth).then(() => {
    eraseCookie("uid");
    navigate("/login");
    toast({
      title: `Goodbye Elite`,
      description: `Anticipate seeing you`,
      status: "success",
    });
  });
};
