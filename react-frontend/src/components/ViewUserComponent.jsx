import React, { Component } from 'react'
import UserService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {},
            permissions: []
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
            this.setState({permissions: res.data.permissions});
        })
    }

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>
                    <div className = "card-body">
                        <div className = "row"><label> <strong> Username: </strong>{ this.state.user.username }</label></div>
                        <div className = "row"><label> <strong>User Email ID: </strong>{ this.state.user.emailId } </label></div>
                        <div className = "row"><label> <strong>User Role: </strong>{ this.state.user.role } </label></div>
                        <br />
                        <div className = "row"><h3>Permissions: </h3>{ this.state.permissions.map(permission => <li> { permission.name } </li>) }</div>
                        {/* <div className = "row"><label> User Permissions: { this.state.user.permissions }</label></div> */}
                        <br />
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Back</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent