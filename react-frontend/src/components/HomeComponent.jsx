import React, { Component } from 'react'
import UserService from '../services/UserService';

class HomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_login'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    username: user.username,
                    password: user.password,
                });
            });
        }        
    }

    loginUser = (e) => {
        e.preventDefault();

        UserService.getUserByUsername(this.state.username).then((res) => {
            let user = res.data;
            var passwordHash = require('password-hash');
            var hashedPassword = user.password;
            if(passwordHash.verify(this.state.password, hashedPassword) === true) {
                this.props.history.push('/users');
            } else {
                alert("Username/Password was incorrect");
            }
        })
    }
    
    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    getTitle(){
        return <h3 className="text-center">Login</h3>
    }
    render() {
        return (
           <div className="header">
                <h2>Welcome To The World's Best </h2>
                <h2>User Management</h2>
                <h2>System</h2>
           </div>
        )
    }
}

export default HomeComponent