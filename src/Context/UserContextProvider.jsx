import { User } from "./context";
function UserContextProvider({ children, value }) {
    return (
        <>
            <User.Provider value={value}>{children}</User.Provider>
        </>
    );
}

export default UserContextProvider;
