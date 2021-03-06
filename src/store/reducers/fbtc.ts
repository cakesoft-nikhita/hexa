import {
  ACCOUNT_SYNC_FAIL,
  ACCOUNT_SYNC_SUCCESS,
  ACCOUNT_SYNC_CLEAR,
  GET_QUOTE_FAIL,
  GET_QUOTE_SUCCESS,
  EXECUTE_ORDER_FAIL,
  EXECUTE_ORDER_SUCCESS,
  GET_BALANCES_FAIL,
  GET_BALANCES_SUCCESS,
  CLEAR_QUOTE_DETAILS,
  CLEAR_ORDER_DETAILS,
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
  accountSyncFail: false,
  accountSyncFailMessage: null,
  getQuoteFail: false,
  getQuoteFailMessage: null,
  executeOrderFail: false,
  executeOrderFailMessage: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  //const { payload } = action;
  switch (action.type) {
    case ACCOUNT_SYNC_FAIL:
      console.log(
        'action.payload.accountSyncFailMessage',
        action.payload.accountSyncFail,
        action.payload.accountSyncFailMessage,
      );
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncFail: action.payload.data.accountSyncFail,
        accountSyncFailMessage: action.payload.data.accountSyncFailMessage,
      };
    case ACCOUNT_SYNC_SUCCESS:
      console.log(
        'payload.accountSyncDetails',
        action.payload.accountSyncDetails,
      );
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncDetails: action.payload.accountSyncDetails,
      };
    case ACCOUNT_SYNC_CLEAR:
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncDetails: null,
      };
    case GET_QUOTE_FAIL:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: null,
        getQuoteFail: action.payload.data.getQuoteFail,
        getQuoteFailMessage: action.payload.data.getQuoteFailMessage,
      };
    case GET_QUOTE_SUCCESS:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: action.payload.getQuoteDetails,
      };
    case CLEAR_QUOTE_DETAILS:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: null,
      };
    case EXECUTE_ORDER_FAIL:
      return {
        ...state,
        executeOrderRequest: false,
        getQuoteDetails: null,
        executeOrderDetails: null,
        executeOrderFail: action.payload.data.executeOrderFail,
        executeOrderFailMessage: action.payload.data.executeOrderFailMessage,
      };
    case EXECUTE_ORDER_SUCCESS:
      return {
        ...state,
        executeOrderRequest: false,
        executeOrderDetails: action.payload.executeOrderDetails,
      };
    case CLEAR_ORDER_DETAILS:
      return {
        ...state,
        executeOrderRequest: false,
        executeOrderDetails: null,
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
        getBalancesDetails: action.payload.getBalancesDetails,
      };
    default:
      return state;
  }
};
export default reducer;
