import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function Login({setUserToken}){

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [show_modal_fail, setShowModalFail] = useState(false);
        const [redirect, setRedirect] = useState(false);


        const handleSubmitSignup = () => {
            axios({
                method: 'post',
                url: 'https://young-tundra-83368.herokuapp.com/api/v1/signup',
                data : {
                    username: username,
                    password: password,
                }
            }).then(response => {
                axios({
                    method: 'post',
                    url: 'https://young-tundra-83368.herokuapp.com/api/v1/signin',
                    data : {
                        username: username,
                        password: password,
                    }
                }).then(isSigned => {
                    if (isSigned.status === 200 ){
                        axios({
                            method: 'post',
                            url: 'https://young-tundra-83368.herokuapp.com/api/v1/createClient',
                            data : {
                                email: username,
                            }
                        }).then(res => {
                            if (res.status === 200){
                                setUserToken(res.data.token);
                                setRedirect(true);
                            }
                            else{
                                setShowModalFail(true);
                            }
                        });
                    }
                });
            });
        };

        const handleSubmitSignin = () => {
            axios({
                method: 'post',
                url: 'https://young-tundra-83368.herokuapp.com/api/v1/signin',
                data : {
                    username: username,
                    password: password,
                }
            }).then(res => {
                if (res.status === 200){
                    setUserToken(res.data.token);
                    setRedirect(true);
                }
                else{
                    setShowModalFail(true);
                }
            });
        }

        const handleCloseModalFail = () => {setShowModalFail(false); setRedirect(true);};
        const handleShowModalFail = () => setShowModalFail(true);
        const handleCloseModal = () => setRedirect(true);

        return (
            <div>
                <Modal
                show={true}
                backdrop="static"
                >
                    <Modal.Header>
                    <Modal.Title>Connexion/Inscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasiName">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicSurname">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button size="small" variant="success" onClick={handleSubmitSignin}>Se connecter</Button>
                    <Button size="small" variant="success" onClick={handleSubmitSignup}>S'inscrire</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Fermer</Button>
                    </Modal.Footer>
                </Modal>

                {show_modal_fail && 
                    <div>
                        <Modal
                        show={handleShowModalFail}
                        onHide={handleCloseModalFail}
                        backdrop="static"
                        >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                L'authentification/inscription a échoué, veuillez réessayer.
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

export default Login;