import { useNavigate, useRouteError } from "react-router-dom";
import Success from "../assets/Success";
import Warning from "../assets/Warning";
function Alert({ style, message, to }) {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-slate-800 h-60 w-96 absolute bottom-2/4 right-2/4 translate-y-2/4 translate-x-2/4 rounded-xl flex justify-center items-center">
                <div className="flex flex-col gap-10 items-center justify-between">
                    <div>
                        {style === "Warning" ? <Warning /> : <Success />}
                        <p className="text-neutral-100 text-center text-2xl font-semibold">
                            {error ? error.data : message}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="mt-3 w-20 justify-center text-center rounded-lg bg-neutral-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => navigate(to ? to : 0)}
                    >
                        OK
                    </button>
                </div>
            </div>
        </>
    );
}

export default Alert;
