import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRental, getAllRentalsForUser } from "../../../utils/http-utils/rental-requests";
import { getUserById } from "../../../utils/http-utils/user-requests";
import { RentalCard } from "../../rentals/rental-card/RentalCard";
import { UserCard } from "../users-card/UserCard";
import './User.scss'

export function User(props) {

    const params = useParams();
    const [user, setUser] = useState(null);
    const [userRentals, setUserRentals] = useState([]);
    useEffect(() => {
        getUserById(params.id).then(response => setUser(response.data));
        getAllRentalsForUser(params.id).then(response => setUserRentals(response.data));
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteRental(id).then(() => {
            setUserRentals((prevState) => {
                return prevState.filter(rental => rental.id !== id);
            });
        });
    }

    return (
        <div className="user">
            <UserCard user={user} isInDetails={true} />
            <div className="user-rentals-holder">
                {userRentals.map(rental => <RentalCard key={rental.id} rental={rental} onRentalDelete={onDeleteHandler} />)}
            </div>
        </div>
    )
}