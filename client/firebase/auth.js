// auth.js
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./init";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { eraseCookie, getCookie } from "../src/utils";

const auth = getAuth(app);

export const checkAuth = (setUserDetails, toast, navigate) => {
  const db = getFirestore(app);
  const previousLocation = localStorage.getItem("previousLocation");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const uid = getCookie("uid");
        if (!uid) {
          throw new Error("UID cookie is missing");
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          if (docSnap.data().setup.institution) {
            await toast({
              title: `Welcome back Elite`,
              description: `Keep cruising in your elite mode`,
              status: "success",
            });
            if (previousLocation) {
              navigate(previousLocation);
            } else {
              navigate("/my-gpas");
            }
          } else {
            navigate("/user-setup");
          }
        } else {
          console.error("No such document!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });
};

// Save the previous location before a reload
export const savePreviousLocation = (location) => {
  localStorage.setItem("previousLocation", location.pathname);
};

export const logOut = (toast, navigate) => {
  signOut(auth)
    .then(() => {
      eraseCookie("uid");
      navigate("/login");
      toast({
        title: `Goodbye Elite`,
        description: `Anticipate seeing you`,
        status: "success",
      });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      toast({
        title: `Error signing out`,
        description: `Please try again later.`,
        status: "error",
      });
    });
};
