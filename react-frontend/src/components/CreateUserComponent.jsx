import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            username: '',
            permissions: [],
            emailId: '',
            password: '',
            role: 'User'
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePermissionsHandler = this.changePermissionsHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    username: user.username,
                    emailId: user.emailId,
                    permissions : user.permissions,
                    password: user.password,
                    role: user.role
                });
            });
        }        
    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();
        var passwordHash = require('password-hash');
        var hashedPassword = passwordHash.generate(this.state.password);
        let user = {username: this.state.username, emailId: this.state.emailId, permissions: this.state.permissions, password: hashedPassword, role: this.state.role};
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if(this.state.id === '_add'){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePermissionsHandler= (event) => {
        this.setState({permissions: event.target.value});
    }

    changeEmailIdHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeRoleHandler= (event) => {
        this.setState({role: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        return <h3 className="text-center">Add Users</h3>
    }

    render() {
        const MM = [{"id":1,"name":"Masters_Management"}];
        const Tra = [{"id":2,"name":"Transactions"}];
        const Rep = [{"id":3,"name":"Reports"}];
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
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className="form-group">
                                        <label>Permissions</label>
                                            <div className = 'form-control form-control-check'>
                                                <label>Master's Management</label>
                                                <input type = 'checkbox'  value={MM} onChange={this.changePermissionsHandler} />
                                            </div>
                                            <div className = 'form-control form-control-check'>
                                                <label>Transactions</label>
                                                <input type = 'checkbox'  value={Tra} onChange={this.changePermissionsHandler} />
                                            </div>
                                            <div className = 'form-control form-control-check'>
                                                <label>Reports</label>
                                                <input type = 'checkbox'  value={Rep} onChange={this.changePermissionsHandler} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                        <label>Role</label>
                                            <div className = 'form-control form-control-check'>
                                                <label>Admin </label>
                                                <input type = 'checkbox'  value='Admin' onChange={this.changeRoleHandler} />
                                            </div>
                                            <div className = 'form-control form-control-check'>
                                                <label>User </label>
                                                <input type = 'checkbox'  value='User' onChange={this.changeRoleHandler} />
                                            </div>
                                        </div>
                                        <br />
                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUserComponent