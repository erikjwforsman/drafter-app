export const teamInfo = (teamSize, teamSalary) =>{
    const moneyAtStart = 200
    const moneyLeft = moneyAtStart-teamSalary
    const maxRosterSize= 19
    const seatsLeft = maxRosterSize-teamSize

    const avgPrice = moneyLeft/seatsLeft
    const maxBid = moneyLeft-(seatsLeft-1)

    return {moneyAtStart:moneyAtStart, moneyLeft:moneyLeft, maxRosterSize:maxRosterSize, avgPrice:Math.trunc(avgPrice), maxBid:maxBid, seatsLeft:seatsLeft} 
}

export const rosterInfo = (team) => {
    const qb = team.filter(p => p.position ==="QB")
    const rb = team.filter(p => p.position ==="RB")
    const wr = team.filter(p => p.position ==="WR")
    const te = team.filter(p => p.position ==="TE")
    const d = team.filter(p => p.position ==="D")
    const k = team.filter(p => p.position ==="K")
    const idp = team.filter(p => p.position ==="IDP")

    return { qb: qb.length, rb: rb.length, wr: wr.length, te: te.length, k: k.length, d: d.length, idp: idp.length}
}

export const validateBid = (currentBid, newBid, managerRestrictions) => {
    if(isNaN(Number(newBid.currentPrice))){
        alert("Olet aasi, et hakkeri")
        return false
    }

    if(currentBid.bidder===newBid.bidder){
        alert("Sinulla on jo johtava tarjous")
        return false
    }

    if (currentBid.currentPrice >= newBid.currentPrice){
        alert("Liian pieni tarjous") 
        return false
    } else if (managerRestrictions.seatsLeft===0){
        alert("Joukkueesi on jo täynnä")
        return false
    } else if (managerRestrictions.maxBid<newBid.currentPrice){
        alert("VITUN KÖYHÄ")
        return false
    } else {
        return true
    }  
}

export const bidButtonDisabled = (nominatedPlayer, manager) => {
    const seatsLeft=19-manager.players.length
    const moneyLeft = 200-manager.salary 
    const manMaxBid=moneyLeft-seatsLeft+1

    if (manager.players.length>=19){
        return false
    }

    if (nominatedPlayer===null){
        return false
    }
    if(nominatedPlayer.currentPrice>=manMaxBid){
        return false
    }
    if(nominatedPlayer.bidder===manager.id){
        return false
    }
    return true
} 

export const nominateButtonDisabled = (nominatedPlayer, manager, turn) => {
    if (nominatedPlayer===null | nominatedPlayer===undefined){
        if (turn===null){
            return false
        }
        return manager.id===turn.id
    }  
    return false
}

export const finalizeSaleButtonDisabled = (nominatedPlayer) => {
    if (nominatedPlayer===null | nominatedPlayer===undefined) {
        return true
    }
    return Date.now()<nominatedPlayer.timeLeft
}

export const playerNextInLine = (playerList, nextPlayer) => {
    if (playerList===null | playerList.length===0){
        return nextPlayer
    }
    return playerList[0]
}