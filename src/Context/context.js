import { createContext, useContext } from "react";

export const userAuth = createContext(null)
export const isSubmit = createContext(null)

export const useUser = () => useContext(userAuth)
export const useSubmit = () => useContext(isSubmit)