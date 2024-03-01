import { toggleState } from "./context";
function ToggleStateProvider({ children, value }) {
    return (
        <>
            <toggleState.Provider value={value}>
                {children}
            </toggleState.Provider>
        </>
    );
}

export default ToggleStateProvider;
