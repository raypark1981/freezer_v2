import {
  auth,
  providerFacebook,
  onAuthStateChanged,
  providerGoogle,
  signInWithPopup,
  signOut,
} from "./firebase";

export default class AuthService {
  signIn = async (type) => {
    return await signInWithPopup(auth, this.getProvider(type));
  };

  signOut = (callback) => {
    return signOut(auth);
  };

  checkUserState = (callback) => {
    onAuthStateChanged(auth, callback);
  };

  currentUser = () => {
    return auth.currentUser;
  };

  getProvider = (type) => {
    switch (type.toLowerCase()) {
      case "google":
        return providerGoogle;
      case "facebook":
        return providerFacebook;
      default:
        throw new Error("Unknown provider!");
    }
  };
}
