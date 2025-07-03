import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.service";

class SignInService {
    async signIn(email: string, password: string): Promise<void> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const response = await fetch("http://localhost:8080/auth/verify", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            });
            const userData = await response.json();
            console.log("Signed in & synced:", userData);
        } catch (error) {
            console.error("Login error:", error);
        }
    }
}

export default new SignInService();