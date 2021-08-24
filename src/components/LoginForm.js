import React, {useState, useEffect} from "react"
import {useMutation} from "@apollo/client"
import {LOGIN} from "../graphql/queries"

const LoginForm = (props) => {
    const [owner, setOwner] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useMutation(LOGIN)

    useEffect( () => {
        if(result.data){
            console.log(result)
            const token = result.data.login.value
            console.log(token)
            // const owner = owner
            console.log(owner)
            props.setToken(token)
            props.setOwner(owner)
            localStorage.setItem("manager-token", token)
            localStorage.setItem("owner", owner)
        }
    }, [result.data])// eslint-disable-line

    const submit = async(event) => {
        event.preventDefault()
        console.log(owner)
        console.log(password)
        login({ variables: { owner, password } })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    manager <input
                        value={owner}
                        onChange={ ({target}) => setOwner(target.value) }
                    />
                </div>
                <div>
                    password <input 
                        type="password"
                        value={password}
                        onChange= { ({target}) => setPassword(target.value)}
                        />
                </div>
                <button type="submit">
                    login
                </button>
            </form>
        </div>
    )
}
export default LoginForm;