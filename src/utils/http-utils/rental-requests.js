import axios from 'axios';
import { getLoggeduser } from './user-requests';
import { getVehicleForRental } from './vehicle-requests';

const apiUrl = 'http://localhost:3005/rentals';

export function getAllRentals() {
    return axios.get(apiUrl);
}

export function getAllRentalsForUser(userId) {
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function getRentalById(rentalId) {
    return axios.get(`${apiUrl}/${rentalId}`);
}

export function deleteRental(rentalId) {
    return axios.delete(`${apiUrl}/${rentalId}`);
}

export function saveRental(rental) {
    //create
    if (!rental.id) {
        const loggedUser = getLoggeduser();
        const vehicleForRental = getVehicleForRental();

        rental.userId = loggedUser.id;
        rental.userName = loggedUser.name;
        rental.vehicleId = vehicleForRental.id;
        rental.vehicleName = vehicleForRental.brand + " " + vehicleForRental.model;
        rental.startDate = new Date().toDateString();
        rental.endDate = new Date(rental.endDate).toDateString();
        return axios.post(apiUrl, rental);
    }
    rental.startDate = new Date(rental.startDate).toDateString();
    rental.endDate = new Date(rental.endDate).toDateString();
    return axios.put(`${apiUrl}/${rental.id}`, rental);
}