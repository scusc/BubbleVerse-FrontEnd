import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.service"; 

class SignUpService {
    async signUp(email: string, password: string): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const response = await fetch("http://localhost:8080/auth/verify", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            });
            const userData = await response.json();
            console.log("Signed up & synced:", userData);
        } catch (error) {
            console.error("Signup error:", error);
        }
    }
}

export default new SignUpService();