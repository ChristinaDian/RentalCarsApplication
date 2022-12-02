import { useEffect, useState } from "react"
import { deleteVehicle, getAllVehicles } from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import './VehiclesList.scss'

export function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
        })
    }, [])

    const getAvailableVehicles = (num) => {
        if (num === 1)
            return vehicles.filter(vehicle => vehicle.availableCarsCount > 0).map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={onDeleteHandler} />);
        else
            return vehicles.filter(vehicle => vehicle.availableCarsCount < 1).map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={onDeleteHandler} />);
    }

    const onDeleteHandler = (id) => {
        deleteVehicle(id).then(() => {
            setVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    return (
        <div>
            <h1>Available for rent</h1>
            <div className="vehicles-list-wrapper">
                {getAvailableVehicles(1)}
            </div>
            <h1>Currently unavailable</h1>
            <div className="vehicles-list-wrapper">
                {getAvailableVehicles(0)}
            </div>
        </div>
    );
}