import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
class Login extends React.Component {
    constructor(...args) {
        super(...args);
    
        this.state = {
            user: '',
            password: '',
            token: '',
            alert: false
        };
        this.onLogin = this.onLogin.bind(this);
        this.onUser = this.onUser.bind(this);
        this.onPassword = this.onPassword.bind(this);
      }
    
    onLogin() {
        const { user, password } = this.state;
        if (user !== '' && password !== '') {
            fetch('https://dev.tuten.cl/TutenREST/rest/user/'+user,{
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Password': password,
                'App': 'APP_BCK'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({token: data.sessionTokenBck});
                localStorage.setItem('token',data.sessionTokenBck);
                this.props.history.push('/bookings');
            }).catch(error => {
                this.showAlert('Usuario o contraseña invalida');
            });
        } else{
            this.showAlert('Falta algún campo');
        }
    }
    onUser(user) {
        this.setState({user});
    }
    onPassword(password) {
        this.setState({password});
    }
    showAlert(message) {
        MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message
              })
    }
    render() {
        return(
        <div className="box">
            <TextField className="space" label="Usuario" type="text" variant="filled" 
            value={this.state.user} onChange={(value) => this.onUser(value.target.value)}/>
            <br/>
            <TextField className="space" label="Contraseña" type="password" variant="filled"
             value={this.state.password} onChange={(value) => this.onPassword(value.target.value)}/>
            <br/>
            <Button variant="contained" color="primary" onClick={this.onLogin}>Iniciar sesion</Button>
        </div>
    );
    }
}
export default Login;