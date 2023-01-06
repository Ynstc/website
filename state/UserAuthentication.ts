import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { initFirebase } from '../firebase/firebaseApp';

export class UserAuthentication {
    private readonly provider;
    public readonly auth;

    public constructor() {
        initFirebase();

        this.provider = new GoogleAuthProvider();
        this.auth = getAuth()
    }

    public signIn = async () => {
        const result = await signInWithPopup(getAuth(), this.provider);
    }

    public signOut = async () => {
        const result = await signOut(getAuth())
    }

}
