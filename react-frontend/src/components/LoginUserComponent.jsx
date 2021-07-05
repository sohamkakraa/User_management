import React, { Component } from 'react'
import UserService from '../services/UserService';

class LoginUserComponent extends Component {
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
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <br />
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <br/>
                                        <button className="btn btn-success" onClick={this.loginUser}>Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default LoginUserComponent