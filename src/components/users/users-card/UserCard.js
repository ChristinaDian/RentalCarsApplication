import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggeduser } from '../../../utils/http-utils/user-requests';
import './UserCard.scss';

export function UserCard({ user, deleteUser, isInDetails }) {

  const loggedUser = getLoggeduser();
  const navigate = useNavigate();

  const redirectToDetails = () => {
    navigate(`/user/${user.id}`);
  }

  const redirectToEdit = () => {
    navigate(`/user/edit/${user.id}`);
  }

  if (!user) {
    return <p> No User!</p>
  }
  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.picture} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <span className='key'>Email address: </span>
          <span className='value'>{user.email}</span>
        </Card.Text>
        <Card.Text>
          <span className='key'>Phone number: </span>
          <span className='value'>{user.phone}</span>
        </Card.Text>
        <div className='btn-holder'>
          {!isInDetails ? <Button variant="info" onClick={redirectToDetails}>Details</Button> : ''}
          <Button variant="primary" onClick={redirectToEdit}>Edit</Button>
          {loggedUser.id !== user.id ? <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button> : ''} {/*izpolzvai tova*/}
        </div>
      </Card.Body>
    </Card>
  );
}