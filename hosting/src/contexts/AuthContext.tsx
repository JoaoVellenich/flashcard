import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import api from "../services/api";

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}
  
  type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextProviderProps = {
      children: ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if(user) {
            const { displayName, photoURL, uid } = user;
            if(!displayName || !photoURL){
                throw new Error("Faltam informações da Conta Google.");
            }
            api.post("/createUser", {
                userId: uid
            })
            setUser({
            name: displayName,
            id: uid,
            avatar: photoURL
            })

        }
        })
        return() => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if(result.user){
            const { displayName, photoURL, uid } = result.user;
            if(!displayName || !photoURL){
                throw new Error("Faltam informações da Conta Google.");
            }
            api.post("/createUser", {
                userId: uid
            })
            setUser({
                name: displayName,
                id: uid,
                avatar: photoURL
            })

        }
    }
    return (
        <AuthContext.Provider value = {{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}