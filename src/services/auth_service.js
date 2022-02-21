import {
  auth,
  providerFacebook,
  onAuthStateChanged,
  providerGoogle,
  signInWithPopup,
} from "./firebase";

export default class AuthService {
  signIn = async (type) => {
    return await signInWithPopup(auth, this.getProvider(type));
  };

  checkUserState = (callback) => {
    onAuthStateChanged(auth, callback);
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
