import { googleAuth, emailSignUp } from "./authentication/signup";
import {  emailSignIn } from "./authentication/login";
import { setupAccount } from "./usersetup";
import { checkAuth, logOut, savePreviousLocation, isAuth } from "./authentication/auth";
import { updateUserDetails } from "./updateuser";
export {
  googleAuth,
  emailSignUp,
  setupAccount,
  emailSignIn,
  checkAuth,
  logOut,
  savePreviousLocation, updateUserDetails, isAuth
};
