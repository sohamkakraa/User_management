import React, { Component } from "react";
import AuthService from "../services/auth.service";

import UsersService from "../services/users.service";

export default class BoardAdmin extends Component {

    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        // this.addUser = this.addUser.bind(this);
        // this.editUser = this.editUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    // deleteUser(id){
    //     UsersService.deleteUser(id).then( res => {
    //         this.setState({users: this.state.users.filter(user => user.id !== id)});
    //     });
    // }
    // viewUser(id){
    //     this.props.history.push(`/view-user/${id}`);
    // }
    // editUser(id){
    //     this.props.history.push(`/add-user/${id}`);
    // }

    componentDidMount(){
        UsersService.getUsers().then((res) => {
            this.setState({ users: res.data});
        });
    }

    // addUser(){
    //     this.props.history.push('/add-user/_add');
    // }

    render() {
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> User's Name</th>
                                    <th> UserName</th>
                                    <th> User Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> {user.username} </td>   
                                             <td> {user.name}</td>
                                             <td> {user.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editUSER(user.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}
