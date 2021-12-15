import { createAction, createReducer, INITIAL_STATE, on } from "@ngrx/store";

export const userReducer = createReducer({maskUserName: false},  // INITIAL_STATE
    on( createAction('[user] Toggle login.'), state =>{  // createAction per te krijuar 1 Action
        console.log('original state : ', JSON.stringify(state));
        return {
            ...state,
            maskUserName : !state.maskUserName
        };
    } )
);