import { isSubmit } from "./context";
function IsSubmitProvider({ children, value }) {
    return (
        <>
            <isSubmit.Provider value={value}>{children}</isSubmit.Provider>
        </>
    );
}

export default IsSubmitProvider;
