import React, { useEffect , useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useLocation, Redirect} from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";


function Order({user_token}){
    const styles = {
        root: {
            width: "30%",
            marginLeft: "35%"
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          alignItems: "center",
        },
        card_content: {
          display: "block",
          textAlign: "center"
        },
    
        order: {
          display: "block",
          textAlign: "center",
        }
      };

    const [pizzas_order, setPizzasOrder] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("tempUser");
    const [modal, setShowModal] = useState(false);
    const [orderCheck, setShowModalCheck] = useState(false);
    const [orderFail, setShowModalFail] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const get_cart = useLocation().state;

    useEffect(() => {
        if (get_cart){setPizzasOrder(get_cart.cart.cart);}
        if (user_token && user_token !== "") {
            const user = jwt_decode(user_token);
            setEmail(user.username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const prixPizzas = () => {let prix=0; pizzas_order.forEach(pizza => {prix += pizza.prix;}); return prix;}

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleCloseModalCheck = () => {setShowModalCheck(false); setRedirect(true);};
    const handleShowModalCheck = () => setShowModalCheck(true);

    const handleCloseModalFail = () => {setShowModalFail(false); setRedirect(true);};
    const handleShowModalFail = () => setShowModalFail(true);

    const handleSubmitCart = () => {
        axios({
            method: 'post',
            url: 'https://young-tundra-83368.herokuapp.com/api/v1/createClient',
            data : {
                nom: name + " " + surname,
                email: email,
            }
        }).then(response => {
            axios({
                method: 'post',
                url: 'https://young-tundra-83368.herokuapp.com/api/v1/createCommande',
                data : {
                    pizzas: pizzas_order,
                    client: response.data._id
                }
            }).then(res_order => {
                setShowModal(false);
                if (res_order.status === 200){
                    setShowModalCheck(true);
                }
                else{
                    setShowModalFail(true);
                }
            });
        });
    }

    const handleSubmitCartClient = () => {
        axios({
            method: 'post',
            url: 'https://young-tundra-83368.herokuapp.com/api/v1/readClient',
            data : {
                email: email,
            }
        }).then(response => {
            axios({
                method: 'post',
                url: 'https://young-tundra-83368.herokuapp.com/api/v1/createCommande',
                data : {
                    pizzas: pizzas_order,
                    client: response.data[0]._id
                }
            }).then(res_order => {
                setShowModal(false);
                if (res_order.status === 200){
                    setShowModalCheck(true);
                }
                else{
                    setShowModalFail(true);
                }
            });
        });
    }

    return (
        <div>
            <h1 style={{background: "transparent"}}>Finalisation de votre commande</h1>
            <Card style={styles.root} variant="outlined">
                <CardContent style={styles.card_content}>
                    <h3>Votre commande :</h3>
                    <h4>{pizzas_order.length} pizza(s)</h4>
                    <ul>
                        {pizzas_order.map((pizza) => 
                            <li>{pizza.nom}</li>
                        )}
                    </ul>
                    <Typography>
                        Prix : {prixPizzas()} €
                    </Typography>
                </CardContent>
            <CardActions style={styles.order}>
                {email === "tempUser" &&
                    <Button size="small" variant="success" onClick={handleShowModal} >Valider</Button>
                }
                {email !== "tempUser" &&
                    <Button size="small" variant="success" onClick={handleSubmitCartClient} >Valider</Button>
                }
            </CardActions>
            </Card>

            {modal && pizzas_order.length > 0 &&
                <div>
                    <Modal
                    show={handleShowModal}
                    onHide={handleCloseModal}
                    backdrop="static"
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Validation de votre commande</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasiName">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Prénom" onChange={e => setName(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicSurname">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Nom" onChange={e => setSurname(e.target.value)}/>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button size="small" variant="success" onClick={handleSubmitCart}>Valider</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>Fermer</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {orderCheck && 
                <div>
                    <Modal
                    show={handleShowModalCheck}
                    onHide={handleCloseModalCheck}
                    backdrop="static"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            Votre commande a été validée !
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalCheck}>Fermer</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }

            {orderFail && 
                <div>
                    <Modal
                    show={handleShowModalFail}
                    onHide={handleCloseModalFail}
                    backdrop="static"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            Votre commande a échoué, veuillez réessayer
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalFail}>Fermer</Button>
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

export default Order;