import app from "./init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
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
import emailjs from "emailjs-com";

const auth = getAuth(app);
// auth.languageCode = "en";
const db = getFirestore(app);

// Google Authentication Function
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
      navigate("/my-gpas");
    } else {
      const { email, uid, displayName, photoURL } = userCredentials.user;
      let user_details = { email, uid, photoURL, displayName };
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
    handleAuthError(errorCode, errorMessage, toast);
  } finally {
    setLoading(false);
  }
};

// Email Signup Function
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

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const { uid, photoURL } = user;
    const user_details = { email, uid, photoURL, displayName: name };

    saveUserDetails(user_details);
    setUserDetails(user_details);

    const actionCodeSettings = {
      url: "https://elitegpa.com/verifyaccount", // Your app's URL
      handleCodeInApp: true,
    };

    // Send verification email using Firebase
    await sendEmailVerification(user, actionCodeSettings);

    // After sending Firebase verification email, use EmailJS to send a custom email
    // sendCustomEmailWithEmailJS(email, actionCodeSettings.url);

    toast({
      title: `Almost there`,
      description: `A verification link has been sent to your email`,
      status: "success",
    });

    navigate("/user-setup");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    handleAuthError(errorCode, errorMessage, toast);
  } finally {
    setLoading(false);
  }
};

const sendCustomEmailWithEmailJS = (userEmail, verificationLink) => {
  const templateParams = {
    to_email: userEmail,
    verification_link: verificationLink, // Insert the verification link in the email
  };

  emailjs
    .send("elitegpa", "elitegpa-verify", templateParams, "YOUR_EMAILJS_USER_ID")
    .then((response) => {
      console.log(
        "Custom email successfully sent!",
        response.status,
        response.text
      );
    })
    .catch((err) => {
      console.error("Failed to send custom email:", err);
    });
};

// Save User Details to Firestore
const saveUserDetails = async (user) => {
  try {
    const newUserRef = doc(collection(db, "users"), user.uid);
    await setDoc(newUserRef, user);
    console.log("User details saved");
  } catch (error) {
    console.error("Error saving user details:", error);
  }
};

// Handle Authentication Errors
const handleAuthError = (errorCode, errorMessage, toast) => {
  if (errorCode === "auth/internal-error") {
    toast({
      title: "Network Error",
      description: "Check your internet connection",
      status: "error",
    });
  } else {
    toast({
      title: errorCode,
      description: errorMessage,
      status: "error",
    });
  }
};
