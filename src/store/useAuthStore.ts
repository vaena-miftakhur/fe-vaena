import {create} from "zustand"
import {persist} from "zustand/middleware"

interface AuthState{
    isAuthenticate : boolean;
    user: string | null;
    login:(UserName: string) => void;
    logout:() => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set)=>({
            user:null,
            isAuthenticate:false,
            login:(username) => 
                set ({
                    user:username,
                    isAuthenticate: true,
                }),
            logout:()=> set ({ user:null , isAuthenticate:false}),
        }), 
        {name: "auth-store"},
    ),
)