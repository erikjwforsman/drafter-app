import React, {useState, useEffect} from "react"
import styles from "../AppStyles.module.css"

const AuctionView = (props) => {
    const endTime = props.nominatedPlayer !== null ? props.nominatedPlayer.timeLeft : 30000
    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())    
    useEffect( () => {
        setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
                if(props.xfinalizeSaleButton===false ){
                    props.lähetys(true)
                }
            } else {
                setTimeLeft(calculateTimeLeft())
                if(props.xfinalizeSaleButton===true & props.nominatedPlayer!==null){
                    props.lähetys(false)
                }                          
            }
        }, 1000)
    })

    if (props.turn===null){
        return <div><h1>Starting soon</h1></div>
    }

    //const playerBeingSold = props.nominatedPlayer
    if (props.nominatedPlayer===null){
        return(
            <div>
                <h1>{props.turn.owner} is nominating...</h1>
            </div>
        )
    }

    return (
        <div className={styles.Timer}>
            <h2>0:{Math.trunc(timeLeft)<10 ? "0":null}{Math.trunc(timeLeft) >= 0 ? Math.trunc(timeLeft) : 0}</h2>
        </div>
    )
}

export default AuctionView;