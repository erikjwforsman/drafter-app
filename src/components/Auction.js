import React, {useEffect, useState} from "react";
import styles from "../AppStyles.module.css"
import Counter from "./Counter";


const Auction = (props) => {
//     //console.log(props)
    const[endTime, setEndTime] = useState(Date.now()+30000)//Noudetaan tarjouksesta
//    console.log("OG:", endTime)

    const calculateTimeLeft = () => {
        return (endTime-Date.now())/1000
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect( () => {
        const timer = setTimeout( () => {
            if (timeLeft>0){
                setTimeLeft(calculateTimeLeft())
            }
        }, 1000)
    })

    const plus10 = () => {
        console.log("TEST")
        if(endTime-Date.now()<10000){
            setEndTime(Date.now()+11000)
        }
    }

    //let now = Date.now()

    
    
    //console.log("Current:", calculateTimeLeft())

//    //console.log(props.playerQueue)
//     //const data = props.playerQueue
    const filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
//     //console.log(filteredQueue)
//     //Vanha kello
    
//     let now = Date.now()
//     let plus30 = Date.now()+30000
//     let timeLeft = 30
//     let intervalli

//     //console.log(now)
//     //console.log(plus30)
//     //console.log(((plus30-now)/1000))
    

//     const countDown = () => {
//         if (plus30+1000>now){
//             timeLeft = ((plus30-now)/1000)
//             //setTimer(timeLeft)
//             console.log("Time left",timeLeft)
//             //setTimer(timeLeft)
//             //console.log((plus30-now)/1000)
//             now+=1000
//         } else {
//             console.log("SOLD!!!!")
//             clearInterval(intervalli)
//         }
        
//     }
    
//     let määrä = 0

//     intervalli = setInterval(countDown, 1000)
//     const klikki = () =>{
//         console.log("Lisätään")
//         määrä=määrä+1
//         console.log(määrä)
//     }

//     const plus10 = () => {
//         klikki()
//         if(timeLeft<10){
//             plus30 += (11000-timeLeft*1000)
//         }
//     }

    return(
        
        <div className={styles.BigScreen}>
            <div>
                <h2>Sold Players: (Tähän tulee myyntikohta)</h2>
                {props.soldPlayers.map(p => <p key={p.playerName}>{p.playerName}</p>)}
            </div>
            <div>
                <h2>Countdown</h2>
                <h3>{Math.trunc(timeLeft)}</h3>
                <button onClick={()=>plus10()}>+10sek</button>
                {/* <Counter määrä={määrä}/> */}
                {/* <button onClick={()=>plus10()}>+1</button> */}
            </div>
            <div>
                <h2>Jono</h2>
                {filteredQueue.map(p => <p>{p.playerName}</p>)}
            </div>

        </div>
    )
}

export default Auction;