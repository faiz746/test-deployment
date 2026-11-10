import { useSubmit } from "react-router-dom";
import { create } from "zustand";
const useUserStore = create((set) => ({
  username: "empty",
  isLoggedIn: false,

  setUserName: (name) => set({ username: name }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  hello: () => {
    console.log("This is Hello from Zustand");
  },
}));

export default useUserStore;
