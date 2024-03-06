import { createContext, useContext } from "react";

export const user = createContext(null)
export const isSubmit = createContext(null)

export const useUser = () => useContext(user)
export const useSubmit = () => useContext(isSubmit)