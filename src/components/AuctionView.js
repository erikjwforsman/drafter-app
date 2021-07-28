import React, {useState, useEffect} from "react"

const AuctionView = (props) => {
    const[endTime, setEndTime] = useState(Date.now()+30000)//Noudetaan tarjouksesta
    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [price, setPrice] = useState("WIP")//props.currentBid!==null ? props.currentBid.currentPrice : 1)
    const [bid, setBid] = useState(null)

    useEffect( () => {
        setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
            } else {
                console.log("SOLD!!!")
            }
        }, 1000)
    })   
    
    const sold = () => {
        if (endTime<Date.now()){
            console.log("SOLD!")
            console.log(Date.now())
        }
    }

    //console.log(props.playerToNominate)
    // const plusOne = () => {
    //     setPrice(price+1)
    //     console.log("NEW PRICE, ", price)
    // }
    if (props.currentBid===null){
        if (props.playerToNominate===null){
            return(<div>Loading</div>)
        }

        return (
            <div>
                <h2>Waiting</h2>
                <p>{props.playerToNominate.playerName}</p>
            </div>
        )
    }

    return (
        <div>
                <h2>Countdown</h2>
                <h3>Price: {price} Timeleft: {Math.trunc(timeLeft)}</h3>
                {/* <button onClick={()=>plus10()}>+10sek</button> */}
                {/* <button onClick={()=>plusOne()}>Bid +1</button> */}
                <button onClick={ () => sold() }>Sold</button>
        </div>
    )
}

export default AuctionView;