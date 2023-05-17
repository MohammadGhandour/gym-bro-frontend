import React, { createContext, useReducer } from "react";
import { Workout } from "../App";

const initialState = {
    workouts: []
};

type State = { workouts: Workout[] };

type Action =
    | { type: "SET_WORKOUTS", payload: Workout[] }
    | { type: "CREATE_WORKOUT", payload: Workout }
    | { type: "EDIT_WORKOUT", payload: Workout }
    | { type: "DELETE_WORKOUT", payload: Workout }

export function workoutsReducer(state: State, action: Action) {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "EDIT_WORKOUT":
            const workoutsWithoutTheUpdatedOne = state.workouts.filter((workout) => workout._id !== action.payload._id);
            return {
                workouts: [action.payload, ...workoutsWithoutTheUpdatedOne]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContext = createContext<{
    state: State,
    dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => [] });

export const WorkoutsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    return (
        <WorkoutsContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
};
