import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "./init";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setCookie } from "../src/utils"
const auth = getAuth(app);
auth.languageCode = "it";
const db = getFirestore(app);

export const googleSignIn = async (
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
      let { uid } = userCredentials.user;
      //   console.log(user);
      setCookie("uid", uid, 10);
      let docRef = doc(db, "users", uid);
      let docSnap = getDoc(docRef);
      console.log(docSnap.data());
      setUserDetails(docSnap.data());

      toast({
        title: `Welcome back Elite`,
        description: `Keep cruising in your elite mode`,
        status: "success",
      });
      setTimeout(() => navigate("/my-gpas"), 2000);

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
      toast({
        title: `${errorCode}`,
        description: `${errorMessage}`,
        status: "error",
      });
      // ...
    });
};

export const emailSignIn = async ({
  setUserDetails,
  setLoading,
  navigate,
  toast,
  email,
  password,
  name,
}) => {
  setLoading(true);
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;
      let { uid } = user;
      setCookie("uid", uid, 10);
      let docRef = doc(db, "users", uid);
      let docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setUserDetails(docSnap.data());
      await toast({
        title: `Welcome back Elite`,
        description: `Keep cruising in your elite mode`,
        status: "success",
      });
      navigate("/my-gpas");
      setLoading(false);
      // ...
    })
    .catch((error) => {
      setLoading(false);

      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/invalid-credential") {
        toast({
          title: `Incorrect Details`,
          description: `Check your login details properly`,
          status: "error",
        });
      } else
        toast({
          title: `${errorCode}`,
          description: `${errorMessage}`,
          status: "error",
        });
      // ..
    });
};
