const loggerAction = (data) => {
    if (process.env.NODE_ENV === 'development') {
        if (data.isGroup) {
            console.group(`(${data.type}) - Player: '${data.playerName}' Room: '${data.roomName}'`)
        }
        if (data.isError) console.error(`-> ${data.message}`)
        else console.log(`-> ${data.message}`)
        if (data.isEnd) console.groupEnd()
    }
}

module.exports = {
    loggerAction
}
