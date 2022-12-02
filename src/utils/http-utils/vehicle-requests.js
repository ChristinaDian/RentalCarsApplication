import axios from 'axios';

export const VehicleStatus = {
    AVAILABLE: 'Avaivable',
    RENTED: 'Rented'
}
export const VehicleType = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXORY: 'Luxory',
    SUV: 'SUV',
    CARGO: 'Cargo'
}
export const FuelType = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    HYBRID: 'Hybrid',
    ELECTRIC: 'Electric'
}
const apiUrl = 'http://localhost:3005/vehicles';
const vehicleForRental = 'vehicleForRental';

export function getAllVehicles() {
    return axios.get(apiUrl);
}

export function getAllVehiclesForCustomer(customerId) {
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function getVehicleById(vehicleId) {
    return axios.get(`${apiUrl}/${vehicleId}`);
}
export function getVehicleForRental() {
    return JSON.parse(localStorage.getItem(vehicleForRental));
}
export function deleteVehicle(vehicleId) {
    return axios.delete(`${apiUrl}/${vehicleId}`);
}

export function saveVehicle(vehicle) {
    //create
    if (!vehicle.id) {
        return axios.post(apiUrl, vehicle);
    }
    return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
}
export async function rental(vehicle) {
    localStorage.setItem(vehicleForRental, JSON.stringify(vehicle));
    return vehicle;
}