//import { stripIgnoredCharacters } from "graphql"
import React, {useState, useEffect} from "react"

const AuctionView = (props) => {
    //Ei rekisteröi fronttiin alle 10 tehtyä muutosta
    //Vertaa endtime ja timeLeft erot
    const[endTime, setEndTime] = useState(props.nominatedPlayer !== null ? props.nominatedPlayer.timeLeft : Date.now()+30000)//Noudetaan tarjouksesta
    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const playerBeingSold = props.nominatedPlayer //props.currentBid!==null ? props.currentBid.currentPrice : 1)
    //const [bid, setBid] = useState(null)
    
    useEffect( () => {
        setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
            } else {
                console.log("SOLD!!!")
            }
        }, 1000)
    })   

    //const [mockNappi, setMockNappi] = useState(true)
    // if (endTime<Date.now()){
    //     // props.lähetys()
    //     setMockNappi(false)
    //    setEndTime(Date.now()+30000)
    // }
    //<button disabled={mockNappi}>Mock</button>






    // const sold = () => {
    //     if (endTime<Date.now()){
    //         console.log("SOLD!")
    //         console.log(Date.now())
    //     }
    // }
    //console.log(props)
    //console.log(props.playerToNominate)
    // const plusOne = () => {
    //     setPrice(price+1)
    //     console.log("NEW PRICE, ", price)
    // }
    //Tähän joku nominate from queue setti
    if (playerBeingSold===null){
        return(
            <div>
                Waiting for {props.turn.owner}
            </div>
        )
    }

    //console.log(props)
    return (
        <div>
                <h2>Countdown</h2>
                <h3>Price: {playerBeingSold.currentPrice} Timeleft: {Math.trunc(timeLeft) >= 0 ? Math.trunc(timeLeft) : 0}</h3>
                {/* <button onClick={()=>plus10()}>+10sek</button> */}
                {/* <button onClick={()=>plusOne()}>Bid +1</button> */}
        </div>
    )
}

export default AuctionView;