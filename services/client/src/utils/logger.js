export const middlewareLogger = action => {
    console.group(action.type)
    console.info('dispatching', action)
    console.groupEnd()
}
