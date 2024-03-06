import { user } from "./context";
function UserContextProvider({ children, value }) {
    return (
        <>
            <user.Provider value={value}>{children}</user.Provider>
        </>
    );
}

export default UserContextProvider;
