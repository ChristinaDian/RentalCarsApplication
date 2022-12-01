import axios from 'axios';
import { getLoggeduser } from './user-requests';

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

//.then => resolved correctly
//.catch => has error
//.finally => executed always
export function getAllVehicles(){
    return axios.get(apiUrl);
}

export function getAllVehiclesForCustomer(customerId){
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function getVehicleById(vehicleId){
    return axios.get(`${apiUrl}/${vehicleId}`);
}

export function deleteVehicle(vehicleId){
    return axios.delete(`${apiUrl}/${vehicleId}`);
}

export function saveVehicle(vehicle){
       //create
    if(!vehicle.id) {
        return axios.post(apiUrl, vehicle);
    }
    return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
}