import React from 'react';
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';

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
            userCreated: false,
            showModal: false,
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);   
        this.handleExistingUser = this.handleExistingUser.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

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
                console.log(res, "this is user res");
                this.setState({ userCreated: true, showModal: true });
                console.log(this.state, "state")
            })
    }

    handleExistingUser(event) {
        event.preventDefault();
        axios.post('/loginUser', { email: this.state.email, password: this.state.password, username: this.state.username })
            .then((res) => {
                console.log(res, "this is user res");
            })
    }
    
    render() {
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
                    Login
                </button>

                <button onClick={this.handleNewUser}>
                    Create Account
                </button>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default NameForm;