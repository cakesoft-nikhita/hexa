import {
  ACCOUNT_SYNC_FAIL,
  ACCOUNT_SYNC_SUCCESS,
  GET_QUOTE_FAIL,
  GET_QUOTE_SUCCESS,
  EXECUTE_ORDER_FAIL,
  EXECUTE_ORDER_SUCCESS,
  GET_BALANCES_FAIL,
  GET_BALANCES_SUCCESS,
} from '../actions/fbtc';

const INITIAL_STATE = {
  accountSyncRequest: false,
  accountSyncDetails: null,
  getQuoteRequest: false,
  getQuoteDetails: null,
  executeOrderRequest: false,
  executeOrderDetails: null,
  getBalancesRequest: false,
  getBalancesDetails: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { payload } = action;

  switch (action.type) {
    case ACCOUNT_SYNC_FAIL:
      return {
        ...state,
        accountSyncRequest: false,
      };
    case ACCOUNT_SYNC_SUCCESS:
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncDetails: payload.accountSyncDetails,
      };
    case GET_QUOTE_FAIL:
      return {
        ...state,
        getQuoteRequest: false,
      };
    case GET_QUOTE_SUCCESS:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: payload.getQuoteDetails,
      };
    case EXECUTE_ORDER_FAIL:
      return {
        ...state,
        executeOrderRequest: false,
      };
    case EXECUTE_ORDER_SUCCESS:
      return {
        ...state,
        executeOrderRequest: false,
        executeOrderDetails: payload.executeOrderDetails,
      };
    case GET_BALANCES_FAIL:
      return {
        ...state,
        getBalancesRequest: false,
      };
    case GET_BALANCES_SUCCESS:
      return {
        ...state,
        getBalancesRequest: false,
        getBalancesDetails: payload.getBalancesDetails,
      };
    default:
      return state;
  }
}
