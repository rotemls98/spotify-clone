


export const actions = {
    PLAYER_READY: 'PLAYER_READY',
    SET_PLAYER_STATE: 'SET_PLAYER_STATE',
}

const initialState = {
    playerState: null,
    isPlayerReady: false,
    deviceId: null,
    loading: false,
    error: null,
}

const currentTrack = (state, action) =>  {
    switch(action.type) {
        case actions.PLAYER_READY: {
            return {...state, isPlayerReady: true, deviceId: action.device_id};
        }
        case actions.SET_PLAYER_STATE: {
            return {...state, playerState: action.playerState};
        }
        default:
            return state;
    }
}


export default currentTrack;