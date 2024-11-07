import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../init";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup, browserLocalPersistence,
  setPersistence
} from "firebase/auth";
import { deleteSessionGradingSystem, eraseCookie, setCookie } from "../../utils";

const auth = getAuth(app);
const db = getFirestore(app);

export const googleSignIn = async (
  setUserDetails,
  setLoading,
  navigate,
  toast
) => {
  const provider = new GoogleAuthProvider();
  setLoading(true);

  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredentials = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredentials);
    const token = credential.accessToken;
    const { uid } = userCredentials.user;

    setCookie("uid", uid, 10);

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserDetails(docSnap.data());

      toast({
        title: "Welcome back Elite",
        description: "Keep cruising in your elite mode",
        status: "success",
      });

     navigate("/my-gpas");
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    toast({
      title: `${errorCode}`,
      description: `${errorMessage}`,
      status: "error",
    });
  } finally {
    setLoading(false);
  }
};

export const emailSignIn = async ({
  setUserDetails,
  setLoading,
  navigate,
  toast,
  email,
  password,
}) => {
  setLoading(true);
  const previousLocation = localStorage.getItem("previousLocation");

  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    const { uid } = user;
    // eraseCookie("uid");
    // deleteSessionGradingSystem();
    setCookie("uid", uid, 10);

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserDetails(docSnap.data());

      if (docSnap.data().setup) {
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
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === "auth/invalid-credential") {
      toast({
        title: "Incorrect Details",
        description: "Check your login details properly",
        status: "error",
      });
    } else if (
      errorCode === "auth/network-request-failed" ||
      errorCode === "auth/internal-error"
    ) {
      toast({
        title: "Network Error",
        description: "Check your Internet connection",
        status: "error",
      });
    } else {
      toast({
        title: errorCode,
        description: errorMessage,
        status: "error",
      });
    }
  } finally {
    setLoading(false);
  }
};
