import { Navigate } from "react-router-dom";
import { getLoggeduser } from "../http-utils/user-requests";

export function NonAuthenticatedGuard({ children }) {
    const user = getLoggeduser();

    if (user) {
        return <Navigate to="/users-list" />;
    }
    return children;
}