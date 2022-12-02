import { Navigate} from "react-router-dom";
import { getLoggeduser } from "../http-utils/user-requests";

export function AuthenticatedRoute({ children }) {
    const user = getLoggeduser();
    if (!user) {
        return <Navigate to='/login' />
    }

    return children;
}