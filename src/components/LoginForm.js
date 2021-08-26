import React, {useState, useEffect} from "react"
import {useMutation} from "@apollo/client"
import {LOGIN} from "../graphql/queries"

const LoginForm = (props) => {
    const [owner, setOwner] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useMutation(LOGIN)
    const [checked, setChecked] = useState(false)

    useEffect( () => {
        if(result.data){
            const token = result.data.login.value
 
            props.setToken(token)
            props.setOwner(owner)
            props.setMobileView(checked)
            
            localStorage.setItem("manager-token", token)
            localStorage.setItem("owner", owner)
            localStorage.setItem("mobile", checked)   
        }
    }, [result.data])// eslint-disable-line

    const handleClick = () => setChecked(!checked)

    const submit = async(event) => {
        event.preventDefault()
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
                        
                        value={password}
                        onChange= { ({target}) => setPassword(target.value)}
                        />
                </div>
                <div>
                    mobile <input 
                        type="checkbox" onClick={handleClick} />
                </div>
                <button type="submit">
                    login
                </button>
            </form>
        </div>
    )
}
export default LoginForm;