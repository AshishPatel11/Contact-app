import { createContext, useContext } from "react";

export const User = createContext(null)
export const isSubmit = createContext(null)

export const useUser = () => useContext(User)
export const useSubmit = () => useContext(isSubmit)