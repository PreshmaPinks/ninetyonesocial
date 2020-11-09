const HISTORY = 'HISTORY';
const PAYLOAD = 'PAYLOAD';

const initialState = {
  historyData: [],
  payloadData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HISTORY: {
      return {
        ...state,
        historyData: [...action.payload]
      };
    }
    case PAYLOAD: {
      return {
        ...state,
        payloadData: [...action.payload]
      };
    }
    default:
      return state;
  }
}
