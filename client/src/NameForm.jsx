import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            passwordCorrect: '',
            userCreated: false,
            userExists: true,

            //modal logic should be broken
            showModal: false,

            //show modal state here
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleExistingUser = this.handleExistingUser.bind(this);

        //modal logic - should be broken out
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }


    //modal logic
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    async handleNewUser(event) {
        event.preventDefault();
        await instance.post('/createUser', { email: this.state.email, password: this.state.password, username: this.state.username })
            .then((res) => {
                console.log(res, "resssss")
                if (res.data === "Sorry, a user with that name already exists") {
                    this.setState({ userExists: true, showModal: true, modalText: "Username already exists. Please login or create a unique username" });
                }
                if (res.statusText === "Created") {
                    this.setState({ userCreated: true, showModal: true, modalText: "User created. Click the home button to head to main page" });
                }
            })
    }

    async handleExistingUser(event) {
        event.preventDefault();
        await instance.post('/loginUser', { email: this.state.email, password: this.state.password, username: this.state.username })
            .then((res) => {
                console.log(res, "this is user res");
            })
    }

    render() {

        const userCreated = this.state.userCreated;
        const userExists = this.state.userCreated;
        const passwordCorrect = this.state.userCreated;

        return (
            <div>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>

                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>

                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>

                <button onClick={this.handleExistingUser}>
                    Login (Needs DB uniques)
                </button>

                <button onClick={this.handleNewUser}>
                    Create Account
                </button>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>

                    <Modal.Header closeButton>
                        <Modal.Title>Login Status</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.state.modalText}</Modal.Body>

                    <Modal.Footer>

                        {this.state.userCreated ? (
                            <Button variant="primary" onClick={this.handleCloseModal}>
                                Home    
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={this.handleCloseModal}>
                                Retry
                            </Button>
                            )
                        };

                        {this.state.userExists && this.state.passwordCorrect != true ? (
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Retry
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={this.handleCloseModal}>
                                Home
                            </Button>
                            )
                        };

                        {this.state.userCreated ? (
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Retry
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={this.handleCloseModal}>
                                Home
                            </Button>
                            )
                        };

                        {this.state.userCreated ? (
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Retry
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={this.handleCloseModal}>
                                Home
                            </Button>
                            )
                        };

                    </Modal.Footer>

                </Modal>

            </div>
        );
    }
}

export default NameForm;