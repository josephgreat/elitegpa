import app from "./init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { setCookie } from "../src/utils";

const auth = getAuth(app);
auth.languageCode = "it";
const db = getFirestore(app);

export const googleAuth = async (
  setUserDetails,
  setLoading,
  navigate,
  toast
) => {
  const provider = new GoogleAuthProvider();
  setLoading(true);
  try {
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

      navigate("/my-gpas")
    } else {
      const { email, uid, displayName, photoURL } = userCredentials.user;
      //   console.log(user);
      let user_details = { email, uid, photoURL, displayName };
      console.log(user_details);
      saveUserDetails(user_details);
      setUserDetails(user_details);
      toast({
        title: `Almost there`,
        description: `Just a few steps left`,
        status: "success",
      });
      navigate("/user-setup");
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

export const emailSignUp = async ({
  setUserDetails,
  setLoading,
  navigate,
  toast,
  email,
  password,
  name,
}) => {
  setLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      let { email, uid, photoURL } = user;
      let user_details = { email, uid, photoURL, displayName: name };
      console.log(user_details);
      saveUserDetails(user_details);
      setUserDetails(user_details);
      toast({
        title: `Almost there`,
        description: `Just a few steps left`,
        status: "success",
      });
      navigate("/user-setup");
      setLoading(false);
      // ...
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/invalid-credential") {
        toast({
          title: "Incorrect Details",
          description: "Check your login details properly",
          status: "error",
        });
      } else if (errorCode === "auth/network-request-failed") {
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
      setLoading(false);

      // ..
    });
};

const saveUserDetails = async (user) => {
  const db = getFirestore(app);

  try {
    const newUserRef = doc(collection(db, "users"), user.uid);
    await setDoc(newUserRef, user);
    console.log("saved");
  } catch (error) {
    console.log(error);
  }
};
