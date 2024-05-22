import app from "./init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const auth = getAuth(app);
auth.languageCode = "it";

export const googleSignUp = async (
  setUserDetails,
  setLoading,
  navigate,
  toast
) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((userCredentials) => {
      setLoading(true);
      const credential = GoogleAuthProvider.credentialFromResult(
        userCredentials
      );
      const token = credential.accessToken;
      // The signed-in user info.
      const { email, uid, displayName, photoURL } = userCredentials.user;
      //   console.log(user);
      let user_details = { email, uid, photoURL, displayName };
      console.log(user_details);
      saveUserDetails(user_details);
      setUserDetails(user_details);

      toast({
        title: `Welcome Elite`,
        description: `Your account has been created Successfully!`,
        status: "success",
      });
      setTimeout(() => navigate("/gpa-calc"), 2000);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
      setLoading(false);
    })
    .catch((error) => {
      // Handle Errors here.
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.
      //   const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      toast({
        title: `${errorCode}`,
        description: `${errorMessage}`,
        status: "error",
      });
      // ...
    });
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
        title: `Welcome Elite`,
        description: `Your account has been created Successfully!`,
        status: "success",
      });
      navigate("/gpa-calc");
      setLoading(false);
      // ...
    })
    .catch((error) => {
      setLoading(false);

      const errorCode = error.code;
      const errorMessage = error.message;
      toast({
        title: `${errorCode}`,
        description: `${errorMessage}`,
        status: "error",
      });
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
