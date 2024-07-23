import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getCookie } from "../src/utils";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const updateUserDetails = async (
  newUserDetails,
  photoURL,
  setUserDetails,
  setNewUserDetails,
  setIsUpdatingDetails,
  photoFile,
  toast
) => {
  setIsUpdatingDetails(true);

  try {
    let update = { ...newUserDetails };

    if (photoURL !== newUserDetails.photoURL) {
      await handleUpload(photoFile, newUserDetails, setNewUserDetails, update);
    }

    const uid = getCookie("uid");
    if (!uid) throw new Error("UID cookie is missing");

    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, update);
      setUserDetails(update);

      toast({
        title: "Details Updated",
        description: "Your details have been updated successfully",
        status: "success",
      });
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    // Optional: redirect to login page if necessary
    // navigate("/login");
  } finally {
    setIsUpdatingDetails(false);
  }
};

const handleUpload = async (file, newUserDetails, setNewUserDetails, update) => {
  const storage = getStorage();

  try {
    // Delete the existing photo if it exists
    if (newUserDetails.photoURL) {
      const oldPhotoRef = ref(storage, newUserDetails.photoURL);
      await deleteObject(oldPhotoRef);
    }

    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          reject,
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            update.photoURL = downloadURL;
            setNewUserDetails({ ...newUserDetails, photoURL: downloadURL });
            resolve();
          }
        );
      });
    } else {
      update.photoURL = null;
      setNewUserDetails({ ...newUserDetails, photoURL: null });
    }
  } catch (error) {
    console.error("Error handling photo upload:", error);
  }
};
