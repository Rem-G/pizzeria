import React, { useEffect , useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from "axios";
import jwt_decode from "jwt-decode";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Profile({user_token, setUserToken}){
    const [client_orders, setClientOrders] = useState([]);
    const [email, setEmail] = useState("");
    const [modal, setShowModal] = useState(false);
    const [deletionCompleted, setDeletion] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleCloseDeletionModal = () => {setDeletion(false); setRedirect(true);};
    const handleShowDeletionModal = () => setDeletion(true);

    const handleGetOrders = (email) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/readClient',
            data : {
                email: email,
            }
        }).then(response => {
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/readClientOrders',
                data : {
                    client: response.data[0]._id
                }
            }).then(res => {
                if (res.status === 200){
                    setClientOrders(res.data);
                }
            });
        });
    }

    const handleDeleteAccount = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/deleteUser',
            data : {
                username: email
            }
        }).then(response => {
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/deleteUser',
                data : {
                    email: email
                }
            }).then(res => {
                if (res.status === 200){
                    setShowModal(false);
                    setDeletion(true);
                    setUserToken("");
                }
            });
        });
    }

    useEffect(() => {
        if (user_token && user_token !== "") {
            const user = jwt_decode(user_token);
            setEmail(user.username);
            handleGetOrders(user.username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    return (
        <div>
            {user_token !== "" &&
                <div>
                    <h1 style={{background: "transparent"}}>Bienvenue {email}</h1>

                    <Container direction="row" alignItems="center" alignContent="center" justify="center" >
                        <Card>
                            <CardHeader title="Historique de vos commandes" />
                            <CardContent>
                                {client_orders.map(order => 
                                    <Card>
                                        <CardContent>
                                            <div>
                                                <p>Date : {order.createdAt}</p>
                                                <p>Pizzas :</p>
                                                <ul>
                                                    {order.pizzas.map(pizza =>
                                                        <li>{pizza.nom}</li>
                                                    )}  
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </CardContent>
                        </Card>
                        <CardActions>
                            <Button style={{marginLeft: "42%"}} variant="danger" onClick={handleShowModal}>Supprimer mon compte</Button>
                        </CardActions>
                    </Container>
                </div>
            }
            {user_token === "" &&
                <h1 style={{background: "transparent"}}>Veuillez vous connecter pour accéder à votre compte</h1>
            }

            {modal &&
                <div>
                    <Modal
                    show={handleShowModal}
                    onHide={handleCloseModal}
                    backdrop="static"
                    >
                        <Modal.Header closeButton />
                        <Modal.Body>
                            <p>Souhaitez-vous supprimer définitivement votre compte ?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button size="small" variant="danger" onClick={handleDeleteAccount}>Valider</Button>
                            <Button variant="secondary" onClick={handleCloseModal}>Annuler</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {deletionCompleted && 
                <div>
                    <Modal
                    show={handleShowDeletionModal}
                    onHide={handleCloseDeletionModal}
                    backdrop="static"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            Votre compte a été supprimé
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeletionModal}>Fermer</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {redirect &&
                <Redirect to="/" />
            }

        </div>
    )
}

export default Profile;