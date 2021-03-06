import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { call, all, spawn } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import storageReducer from './reducers/storage';
import setupAndAuthReducer from './reducers/setupAndAuth';
import accountsReducer from './reducers/accounts';
import sssReducer from './reducers/sss';
import manageBackupReducer from './reducers/manageBackup';
import GetBittrReducer from './reducers/bittr';
import fBTCReducers from './reducers/fbtc'
import notificationsReducer from './reducers/notifications';
import trustedContactsReducer from './reducers/trustedContacts';
import sendReducer from './reducers/sendReducer';

import {
  initDBWatcher,
  fetchDBWatcher,
  fetchSSSDBWatcher,
  insertDBWatcher,
  insertSSSDBWatcher,
  servicesEnricherWatcher,
  updateSSSDBWatcher,
} from './sagas/storage';

import {
  initSetupWatcher,
  initRecoveryWatcher,
  credentialStorageWatcher,
  credentialsAuthWatcher,
  changeAuthCredWatcher,
} from './sagas/setupAndAuth';

import {
  fetchAddrWatcher,
  fetchBalanceWatcher,
  fetchTransactionsWatcher,
  transferST1Watcher,
  transferST2Watcher,
  testcoinsWatcher,
  transferST3Watcher,
  accumulativeTxAndBalWatcher,
  accountsSyncWatcher,
  fetchBalanceTxWatcher,
  exchangeRateWatcher,
  alternateTransferST2Watcher,
  generateSecondaryXprivWatcher,
  resetTwoFAWatcher,
  testWatcher,
  fetchDerivativeAccXpubWatcher,
  fetchDerivativeAccBalanceTxWatcher,
  fetchDerivativeAccAddressWatcher,
} from './sagas/accounts';

import {
  initHCWatcher,
  generateMetaSharesWatcher,
  uploadEncMetaShareWatcher,
  downloadMetaShareWatcher,
  updateMSharesHealthWatcher,
  checkMSharesHealthWatcher,
  overallHealthWatcher,
  uploadRequestedShareWatcher,
  requestShareWatcher,
  updateDynamicNonPMDDWatcher,
  downloadDynamicNonPMDDWatcher,
  recoverMnemonicWatcher,
  recoverWalletWatcher,
  restoreDynamicNonPMDDWatcher,
  generatePDFWatcher,
  checkPDFHealthWatcher,
  restoreShareFromQRWatcher,
  shareHistoryUpdateWatcher,
} from './sagas/sss';

import {
  sharePdfWatcher,
  dbUpdatePdfSharingWatcher,
} from './sagas/manageBackup';

import {
  sendEmailWatcher,
  createUserWatcher,
  sendSmsWatcher,
  verifyEmailWatcher,
  verifyXpubWatcher,
} from './sagas/bittr';

import {
  accountSyncWatcher,
  getQuoteWatcher,
  executeOrderWatcher,
  getBalancesWatcher,
} from './sagas/fbtc'

import {
  updateFCMTokensWatcher,
  sendNotificationWatcher,
  fetchNotificationsWatcher,
} from './sagas/notifications';

import {
  initializedTrustedContactWatcher,
  approveTrustedContactWatcher,
  fetchTrustedChannelWatcher,
  fetchEphemeralChannelWatcher,
  updateEphemeralChannelWatcher,
  updateTrustedChannelWatcher,
} from './sagas/trustedContacts';

import { fromPrivateKey } from 'bip32';
import reducer from './reducers/fbtc';

// const rootSaga = function*() {
//   yield all([
//     // database watchers
//     fork(initDBWatcher),
//     fork(fetchDBWatcher),
//     fork(insertDBWatcher),

//     // wallet setup watchers
//     fork(initSetupWatcher),

//     // accounts watchers
//     fork(fetchAddrWatcher),
//     fork(fetchBalanceWatcher),
//     fork(fetchTransactionsWatcher)
//   ]);
// };

const rootSaga = function* () {
  const sagas = [
    // database watchers
    initDBWatcher,
    fetchDBWatcher,
    fetchSSSDBWatcher,
    insertDBWatcher,
    insertSSSDBWatcher,
    servicesEnricherWatcher,
    updateSSSDBWatcher,

    // wallet setup watcher
    initSetupWatcher,
    initRecoveryWatcher,
    credentialStorageWatcher,
    credentialsAuthWatcher,
    changeAuthCredWatcher,

    // accounts watchers
    fetchAddrWatcher,
    fetchBalanceWatcher,
    fetchTransactionsWatcher,
    fetchBalanceTxWatcher,
    transferST1Watcher,
    transferST2Watcher,
    alternateTransferST2Watcher,
    transferST3Watcher,
    testcoinsWatcher,
    accumulativeTxAndBalWatcher,
    accountsSyncWatcher,
    exchangeRateWatcher,
    generateSecondaryXprivWatcher,
    resetTwoFAWatcher,
    fetchDerivativeAccXpubWatcher,
    fetchDerivativeAccAddressWatcher,
    fetchDerivativeAccBalanceTxWatcher,
    testWatcher,

    // sss watchers
    initHCWatcher,
    generateMetaSharesWatcher,
    uploadEncMetaShareWatcher,
    downloadMetaShareWatcher,
    generatePDFWatcher,
    updateMSharesHealthWatcher,
    checkMSharesHealthWatcher,
    checkPDFHealthWatcher,
    overallHealthWatcher,
    uploadRequestedShareWatcher,
    requestShareWatcher,
    updateDynamicNonPMDDWatcher,
    downloadDynamicNonPMDDWatcher,
    restoreDynamicNonPMDDWatcher,
    recoverMnemonicWatcher,
    recoverWalletWatcher,
    restoreShareFromQRWatcher,
    shareHistoryUpdateWatcher,

    // manage backup
    sharePdfWatcher,
    dbUpdatePdfSharingWatcher,

    //GetBittr
    sendEmailWatcher,
    createUserWatcher,
    sendSmsWatcher,
    verifyEmailWatcher,
    verifyXpubWatcher,

    //fBTC
    accountSyncWatcher,
    getQuoteWatcher,
    executeOrderWatcher,
    getBalancesWatcher,

    // Notifications
    updateFCMTokensWatcher,
    fetchNotificationsWatcher,
    sendNotificationWatcher,

    // Trusted Contacts
    initializedTrustedContactWatcher,
    approveTrustedContactWatcher,
    updateEphemeralChannelWatcher,
    fetchEphemeralChannelWatcher,
    updateTrustedChannelWatcher,
    fetchTrustedChannelWatcher,
  ];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
};

const rootReducer = combineReducers({
  storage: storageReducer,
  setupAndAuth: setupAndAuthReducer,
  accounts: accountsReducer,
  sss: sssReducer,
  manageBackup: manageBackupReducer,
  bittr: GetBittrReducer,
  fbtc: fBTCReducers,
  notifications: notificationsReducer,
  trustedContacts: trustedContactsReducer,
  sendReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export { store, Provider };
