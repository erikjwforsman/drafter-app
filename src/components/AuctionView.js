//import { stripIgnoredCharacters } from "graphql"
import React, {useState, useEffect} from "react"

const AuctionView = (props) => {
    //Vertaa endtime ja timeLeft erot
    //const[endTime, setEndTime] = useState(props.nominatedPlayer !== null ? props.nominatedPlayer.timeLeft : Date.now()+30000)//Noudetaan tarjouksesta

    //Tee backiin lisäys, jotta saadaan 8sek => 10sek
    const endTime = props.nominatedPlayer !== null ? props.nominatedPlayer.timeLeft : Date.now()+30000
    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    //Tähän joku ratkaisu, että
    useEffect( () => {
        setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
                if(props.xfinalizeSaleButton===false){
                    props.lähetys(true)
                }
            } else {
                setTimeLeft(calculateTimeLeft())
                if(props.xfinalizeSaleButton===true){
                    props.lähetys(false)
                }       
            }
        }, 1000)
    })


    const playerBeingSold = props.nominatedPlayer //props.currentBid!==null ? props.currentBid.currentPrice : 1)

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
    console.log(props)
    //console.log(props.playerToNominate)
    // const plusOne = () => {
    //     setPrice(price+1)
    //     console.log("NEW PRICE, ", price)
    // }
    //Tähän joku nominate from queue setti
    if (playerBeingSold===null){
        return(
            <div>
                <h2>0.09</h2>
                <h2>{props.turn.owner} is nominating...</h2>
            </div>
        )
    }

    //console.log(props)
    return (
        <div>
                <h2>0:{Math.trunc(timeLeft)<10 ? "0":null}{Math.trunc(timeLeft) >= 0 ? Math.trunc(timeLeft) : 0}</h2>
                <h2>Player: {playerBeingSold.player.playerName},  {playerBeingSold.player.nflTeam}</h2>
                <h3>Position</h3>
                <h3>Price: {playerBeingSold.currentPrice}</h3>
                <h3>Avg price:</h3>
                <h3>Bye Week:</h3>
                {/* <button onClick={()=>plus10()}>+10sek</button> */}
                {/* <button onClick={()=>plusOne()}>Bid +1</button> */}
        </div>
    )
}

export default AuctionView;