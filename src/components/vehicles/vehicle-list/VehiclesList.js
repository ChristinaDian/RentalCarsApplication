import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { deleteVehicle, getAllVehicles, saveVehicle} from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import './VehiclesList.scss'

export function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const params = useParams();

    useEffect(() => {
            getAllVehicles().then(response => {
                setVehicles(response.data);
            })
    })

    const onChangeStatusHandler = (status, id) => {
        const vehicle = vehicles.find(vehicle => vehicle.id === parseInt(id));
        saveVehicle(vehicle).then(() => {
            setVehicles([...vehicles]);
        });
    }

    const onDeleteHandler = (id) => {
        deleteVehicle(id).then(() => {
            setVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id);
            });
        });
    }

    return (
        <div className="vehicles-list-wrapper">
            { vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={onDeleteHandler}/>)}
           
        </div>
    );
}