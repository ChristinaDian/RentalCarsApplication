import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { deleteRental, getAllRentals, getAllRentalsForUser, saveRental} from "../../../utils/http-utils/rental-requests";
import { RentalCard } from "../rental-card/RentalCard";
import './RentalsList.scss'

export function RentalsList() {
    const [rentals, setRentals] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllRentalsForUser(params.id).then(response => {
                setRentals(response.data);
            })
        }
        else {
            getAllRentals().then(response => {
                setRentals(response.data);
            })
        }
    }, [params.id])

    const onChangeStatusHandler = (status, id) => {
        const rental = rentals.find(rental => rental.id === parseInt(id));
        saveRental(rental).then(() => {
            setRentals([...rentals]);
        });
    }

    const onDeleteHandler = (id) => {
        deleteRental(id).then(() => {
            setRentals((prevState) => {
                return prevState.filter(rental => rental.id !== id);
            });
        });
    }

    return (
        <div className="rentals-list-wrapper">
            { rentals.map(rental => <RentalCard key={rental.id} rental={rental} deleteRental={onDeleteHandler}/>)}
           
        </div>
    );
}