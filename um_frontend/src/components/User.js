const User = ({ user }) => {
    return (
        <div>
            <ti>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.emailid}</td>
            </ti> 
        </div>
    )
}

export default User