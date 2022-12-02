import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserFromAPI, getAllUsersFromAPI } from "../../../redux/actions/user-actions";
import { UserCard } from "../users-card/UserCard";
import './UsersList.scss';

export function UsersList() {

    //const[users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const users = useSelector(store => store.users);

    useEffect(() => {
        dispatch(getAllUsersFromAPI());
    }, [dispatch]);

    const deleteUserHandler = async (id) => {
        dispatch(deleteUserFromAPI(id));
    }
    return (
        <div className="users-list-wrapper">
            {users.map(user => <UserCard key={user.id} user={user} deleteUser={deleteUserHandler} />)}
        </div>
    );
}