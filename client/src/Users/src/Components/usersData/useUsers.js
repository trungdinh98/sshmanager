import {useState, useEffect} from "react";
export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () =>{
    fetch('http://localhost:4000/users')
      .then(response => response.json().)
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    getUsers();
  }, [])

  return {users, setUsers}
}