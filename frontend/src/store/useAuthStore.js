import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser : {name : "john", age : 21},
    isLoading : false,
    login : () => {
        console.log("we just logged in")
    }
}));