import React, {useEffect, useState} from "react"
import {useApolloClient} from "@apollo/client";
// import {GET_ALL} from "./graphql/queries";
// import SubApp from "./components/SubApp";
import SignedIn from "./components/SignedIn";
import LoginForm from "./components/LoginForm"

const App = () => {
  const [token, setToken] = useState(null)
  const [manager, setOwner] = useState(null)
  const [mobileView, setMobileView] = useState(false)
  console.log(mobileView)
  const client = useApolloClient()
  

  useEffect( () => {
    const token = localStorage.getItem("manager-token")
    const ownerH = localStorage.getItem("owner")
    const mobileOn = localStorage.getItem("mobile")

    if(token) {
      setToken(token)
    }

    if(ownerH) {
      setOwner(ownerH)
    }

    if(mobileOn) {
      console.log(mobileOn)
    }
  }, [])
  

  if (!token | !manager) {
    return (<LoginForm setToken={setToken} setOwner={setOwner} setMobileView={setMobileView}/>)
  }
  
  console.log(mobileView)

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
