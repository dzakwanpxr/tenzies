function Die(props) {

    return (
        <div 
            className="dice" 
            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"}}
            onClick={props.handleDice}>
            <h2 className="dice-number">{props.value}</h2>
        </div>
    )
}

export default Die