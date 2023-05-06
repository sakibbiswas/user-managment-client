import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [users, setusers] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setusers(data))
  }, [])
  const handelsubit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newusers = [...users, data]
        setusers(newusers)
        form.reset();
      })
  }
  return (

    <>
      <h1>User managment </h1>
      <h2> user: {users.length}</h2>
      <form onSubmit={handelsubit}>
        <input type="text" name="name" id="" required />
        <br />
        <input type="email" name="email" id="" required />
        <br />
        <input type="submit" value="Add user" required />

      </form>
      <div className="">
        {
          users.map(user => <p
            key={user.id}>
            {user.id}:{user.name}:{user.email}
          </p>)
        }
      </div>
    </>
  )
}

export default App
