import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getLoggeduser } from "../../../utils/http-utils/user-requests";

export function RentalCard({rental, onRentalDelete}){
    const navigate = useNavigate();
    const navigateToEdit = () => {
        navigate(`/rental/edit/${rental.id}`);
    } 

    const loggedUser = getLoggeduser();
    return(
    <div className="rental-card-wrapper">
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{rental.title}</Card.Title>
                <Card.Text>
                <span className='key'>User name: </span>
                <span className='value'>{rental.userName}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>Vehicle: </span>
                <span className='value'>{rental.vehicleName}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>Start date: </span>
                <span className='value'>{rental.startDate}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>End date: </span>
                <span className='value'>{rental.endDate}</span>
                </Card.Text>
                <div className='btn-holder'>
                <Button variant="primary" onClick={navigateToEdit}>Edit</Button>
               </div>
            </Card.Body>
        </Card>
    </div>
);
}