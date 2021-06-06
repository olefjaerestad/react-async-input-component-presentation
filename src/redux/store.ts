import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import { createAction, getType } from "typesafe-actions"
import thunk, { ThunkAction } from "redux-thunk";

interface IState {
  name: string;
}

const initialState: IState = {
  name: 'Min kompnent',
};

function reducer(state: IState = initialState, action: ReturnType<typeof setName>): IState {
  switch (action.type) {
    case getType(setName):
      return {
        ...state,
        name: action.payload.name
      }
    default:
      return state;
  }
}

export function getName(state: IState) {
  return state.name;
}

export const setName = createAction('UPDATE_NAME')<{name: string}>();

export function setNameAsync(payload: {name: string}): ThunkAction<void, IState, unknown, ReturnType<typeof setName>> {
  return async function (dispatch, getState) {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    
    dispatch(setName({name: payload.name}));
  }
}

export const store = createStore(
  reducer,
  composeWithDevTools({
    trace: true,
  })(applyMiddleware(thunk))
);
