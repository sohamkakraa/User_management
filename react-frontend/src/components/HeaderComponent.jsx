import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../services/UserService';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = UserService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user
           // showAdminBoard: user.role.includes("Admin")
          });
        }
      }
    
    logOut() {
        UserService.logout();
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }

    render() {
        const { currentUser, showAdminBoard } = this.state;
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">UserManagement</Link>
                        <div className="navbar-nav mr-auto">
                            {/* <li className='nav-item'><Link to = '/login' className="nav-link">Login</Link></li>
                            <li className='nav-item'><Link to = '/add-user/:id' className="nav-link">Register</Link></li> */}
                            {/* <li className='nav-item'><Link to = '/users' className="nav-link">Users</Link></li> */}
                            {showAdminBoard && (
                                <li className="nav-item"><Link to={"/admin"} className="nav-link">Admin Board</Link></li>
                            )}
                            {currentUser && (
                                <li className="nav-item"><Link to={"/user"} className="nav-link">User Board</Link></li>
                            )}
                            
                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item" onClick={this.viewUser(currentUser.id)}>{currentUser.username}</li>
                                    <li className="nav-item"><a href="/login" className="nav-link" onClick={this.logOut}>LogOut</a></li>
                                </div> 
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item"><Link to={"/login"} className="nav-link">Login</Link></li>
                                    <li className="nav-item"><Link to={"/register"} className="nav-link">Sign Up</Link></li>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent