import React, {useState, useEffect} from "react"

const AuctionView = (props) => {
    const[endTime, setEndTime] = useState(Date.now()+30000)//Noudetaan tarjouksesta
    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect( () => {
        setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
            } else {
                console.log("SOLD!!!")
            }
        }, 1000)
    })

    const plus10 = () => {
        //console.log("TEST")
        if(endTime-Date.now()<10000){
            setEndTime(Date.now()+12000)
        }
    }    
    
    const sold = () => {
        if (endTime<Date.now()){
            console.log("SOLD!")
        }
    }
    // if (timeLeft===0){
    //     console.log("ACTION!!!")
    // }

    //console.log(props)
    return (
        <div>
                <h2>Countdown</h2>
                <h3>{Math.trunc(timeLeft)}</h3>
                <button onClick={()=>plus10()}>+10sek</button>
                <button onClick={ () => sold() }>Sold</button>
        </div>
    )
}

export default AuctionView;