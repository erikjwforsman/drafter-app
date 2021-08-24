import React, {useEffect, useState} from "react"
import {useApolloClient} from "@apollo/client";
// import {GET_ALL} from "./graphql/queries";
// import SubApp from "./components/SubApp";
import SignedIn from "./components/SignedIn";
import LoginForm from "./components/LoginForm"

const App = () => {
  const [token, setToken] = useState(null)
  const [manager, setOwner] = useState(null)
  const client = useApolloClient()

  useEffect( () => {
    const token = localStorage.getItem("manager-token")
    const ownerH = localStorage.getItem("owner")

    if(token) {
      setToken(token)
    }

    if(ownerH) {
      setOwner(ownerH)
    }
  }, [])
  

  if (!token | !manager) {
    return (<LoginForm setToken={setToken} setOwner={setOwner}/>)
  }
  

  const logOut = () => {
    setToken(null)
    setOwner(null)
    localStorage.clear()
    client.resetStore()
  }
  const backLogOut = () => {
    logOut()
  }

  //console.log(data)
  return(<SignedIn manager={manager} logOut={backLogOut} />)
}

export default App;
