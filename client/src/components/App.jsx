import { useEffect, useState } from 'react'
import UserPanel from "./UserPanel"
import Notes from "./Notes"

const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
}

const URL = "/api/v1"

function App() {

  // STATE //

  const [currentUser, setCurrentUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // USEEFFECT //

  /*useEffect(()=>{
    async function checkSession (){
      const res = await fetch(URL + '/check_session')
      if (res.ok) {
        const data = await res.json()
        setCurrentUser(data)
      }
    }
    checkSession()
  },[])*/

  /* Alternative */ 
  useEffect(()=>{
    fetch( URL + 'check_session' )
    .then( res => {
      if ( res.ok ) {
        res.json()
        .then( data => setCurrentUser( data ) )

      }
      serLoader(true)
    } )
  }, [])

  // SIGNUP, LOGIN AND LOGOUT FNS //

  async function attemptSignup(userInfo) {
    const res = await fetch(URL + '/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  async function attemptLogin(userInfo) {
    const res = await fetch(URL + '/login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  function logout() {
    setCurrentUser(null)
    fetch(URL + '/logout', {
      method: 'DELETE'
    })
  }


  // RENDER //
  if (!loaded){
    return <h1>Loading ...</h1>
  } else {
    return (
      <div className="App">

        <h1>Authentication + Authorization</h1>

        <UserPanel
        currentUser={currentUser}
        attemptLogin={attemptLogin}
        attemptSignup={attemptSignup}
        logout={logout} />

        <Notes />

      </div>
    );
  }
}
export default App;
