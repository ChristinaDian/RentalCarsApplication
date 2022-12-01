import axios from 'axios';
import { getLoggeduser } from './user-requests';

const apiUrl = 'http://localhost:3005/rentals';

//.then => resolved correctly
//.catch => has error
//.finally => executed always
export function getAllRentals(){
    return axios.get(apiUrl);
}

export function getAllRentalsForUser(userId){
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function getRentalById(rentalId){
    return axios.get(`${apiUrl}/${rentalId}`);
}

export function deleteRental(rentalId){
    return axios.delete(`${apiUrl}/${rentalId}`);
}

export function saveRental(rental, vehicle){
       //create
    if(!rental.id) {
        const loggedUser = getLoggeduser();

        rental.userId = loggedUser.id;
        rental.userName = loggedUser.name;
        rental.startDate = new Date().toDateString();
        rental.endDate = new Date(rental.endDate).toDateString();
        vehicle.availableCarsCount --;
        return axios.post(apiUrl, rental);
    }
    rental.endDate = new Date(rental.endDate).toDateString();
    return axios.put(`${apiUrl}/${rental.id}`, rental);
}