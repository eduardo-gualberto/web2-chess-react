import NetworkWorker from "../../workers/networkWorker"

const moveSenderOfType = (type: string, user_id: string, match_code: string) => {
    const networkWorker = NetworkWorker.getInstance()
    if (type == 'online')
        return ({ sourceSquare, targetSquare, piece }: { sourceSquare: string, targetSquare: string, piece: string }) => {
            networkWorker.sendMove(user_id, match_code!, sourceSquare, targetSquare, piece)
                .then(r => { })
                .catch(e => console.log(e))
        }
    else
        return ({ sourceSquare, targetSquare, piece }: { sourceSquare: string, targetSquare: string, piece: string }) => {
            const event = new CustomEvent("move", { detail: { from: sourceSquare, to: targetSquare, piece } })
            document.dispatchEvent(event)
        }
}

export default moveSenderOfType