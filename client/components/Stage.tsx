export function Stage(props){
    const {gameState, setGameState} = props
    const image = gameState.prompt.image[`${gameState.currentStage - 1}`]
    return (
        <div>
            <p>Current Stage: {`${gameState.currentStage}`}</p>
            <img src={image}></img>
        </div>
    )
}