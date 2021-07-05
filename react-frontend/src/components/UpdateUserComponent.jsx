import React, { Component } from 'react'
import UserService from '../services/UserService';

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            permissions: '',
            emailId: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePermissionsHandler = this.changePermissionsHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({
                username: user.username,
                permissions: user.permissions,
                emailId : user.emailId
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, permissions: this.state.permissions, emailId: this.state.emailId};
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUser(user, this.state.id).then( res => {
            this.props.history.push('/users');
        });
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

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update User</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Userame" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                        </div>

                                        {/* <div className="form-group">
                                        <label>Permissions</label>
                                            <div className = 'form-control form-control-check'>
                                                <label>Master's Management</label>
                                                <input type = 'checkbox'  value={this.state.permissions} onChange={this.changePermissionsHandler} />
                                            </div>
                                            <div className = 'form-control form-control-check'>
                                                <label>Transactions</label>
                                                <input type = 'checkbox'  value={this.state.permissions} onChange={this.changePermissionsHandler} />
                                            </div>
                                            <div className = 'form-control form-control-check'>
                                                <label>Reports</label>
                                                <input type = 'checkbox'  value={this.state.permissions} onChange={this.changePermissionsHandler} />
                                            </div>
                                        </div> */}
                                        <br/>
                                        <button className="btn btn-success" onClick={this.updateUser}>Save</button>
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

export default UpdateUserComponent