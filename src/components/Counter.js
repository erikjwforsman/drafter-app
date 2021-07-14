import React, {useState} from "react"

const Counter = (props) => {
    const [counter, setClick] = useState(0)

    
    
    console.log(props)
    return (
        <div>
            {counter}
        </div>
    )
}

export default Counter;