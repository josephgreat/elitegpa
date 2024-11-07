// auth.js
import { getAuth, onAuthStateChanged, signOut, browserLocalPersistence } from "firebase/auth";
import app from "../init";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  deleteSessionGradingSystem,
  eraseCookie,
  getCookie,
} from "../../utils";

const auth = getAuth(app);

export const checkAuth = (setUserDetails, toast, navigate, setLoginMode) => {
  const db = getFirestore(app);
  const previousLocation = localStorage.getItem("previousLocation");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setLoginMode(user.providerData[0].providerId);

      try {
        const uid = getCookie("uid");
        if (!uid) {
          navigate("/login")
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          if (docSnap.data().setup.institution) {
            if (previousLocation) {
              navigate(previousLocation);
            } else {
              navigate("/my-gpas");
            }
          } else {
            // alert("navigating")
            navigate("/user-setup");
          }
        } else {
          console.error("No such document!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
        throw error;
      }
    } else {
      navigate("/login");
    }
  });
};

export const isAuth = () => {
  const uid = getCookie("uid");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid && eraseCookie("uid");
      return true;
    }
    return false;
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
      deleteSessionGradingSystem();
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
