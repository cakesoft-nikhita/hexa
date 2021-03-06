import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../common/Colors';
import Fonts from '../common/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { credsAuth } from '../store/actions/setupAndAuth';
import BottomSheet from 'reanimated-bottom-sheet';
import LoaderModal from '../components/LoaderModal';
import { syncAccounts, calculateExchangeRate } from '../store/actions/accounts';
import { updateMSharesHealth, checkMSharesHealth } from '../store/actions/sss';
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';
import ErrorModalContents from '../components/ErrorModalContents';
import ModalHeader from '../components/ModalHeader';
import RelayServices from '../bitcoin/services/RelayService';

export default function Login(props) {
  let [message, setMessage] = useState('Getting the latest details');
  const [passcode, setPasscode] = useState('');
  const [Elevation, setElevation] = useState(10);
  const [JailBrokenTitle, setJailBrokenTitle] = useState('');
  const [passcodeFlag, setPasscodeFlag] = useState(true);
  const [checkAuth, setCheckAuth] = useState(false);
  const [loaderBottomSheet, setLoaderBottomSheet] = useState(React.createRef());
  const [ErrorBottomSheet, setErrorBottomSheet] = useState(React.createRef());
  // const releases =[
  //       {
  //           "build": "40",
  //           "version": "0.8",
  //           "releaseNotes": {
  //               "ios": "-Timed notification-Notification UI list implemented on Home-Reset 2FA new UI implemented-Address book UI implemented",
  //               "android": "-Timed notification-Notification UI list implemented on Home-Reset 2FA new UI implemented-Address book UI implemented"
  //           },
  //           "reminderLimit": 2
  //       },
  //       {
  //         "build": "39",
  //         "version": "0.8",
  //         "releaseNotes": {
  //             "ios": "dfsdg",
  //             "android": "-Timed notification-Notification UI list implemented on Home-Reset 2FA new UI implemented-Address book UI implemented"
  //         },
  //         "reminderLimit": -1
  //     },
  //     {
  //       "build": "38",
  //       "version": "0.8",
  //       "releaseNotes": {
  //           "ios": "64356354",
  //           "android": "-Timed notification-Notification UI list implemented on Home-Reset 2FA new UI implemented-Address book UI implemented"
  //       },
  //       "reminderLimit": -1
  //   },
  //   {
  //     "build": "37",
  //     "version": "0.8",
  //     "releaseNotes": {
  //         "ios": "dfgdgdg",
  //         "android": "-Timed notification-Notification UI list implemented on Home-Reset 2FA new UI implemented-Address book UI implemented"
  //     },
  //     "reminderLimit": -1
  // },
  //       {
  //           "build": "35",
  //           "version": "3.40",
  //           "releaseNotes": {
  //               "ios": "ios notes for release 319",
  //               "android": "android notes for release 319"
  //           },
  //           "reminderLimit": -1
  //       }
  //   ];
  const onPressNumber = useCallback(
    (text) => {
      let tmpPasscode = passcode;
      if (passcode.length < 4) {
        if (text != 'x') {
          tmpPasscode += text;
          setPasscode(tmpPasscode);
        }
      }
      if (passcode && text == 'x') {
        setPasscode(passcode.slice(0, -1));
        setCheckAuth(false);
      }
    },
    [passcode],
  );

  const DECENTRALIZED_BACKUP = useSelector(
    (state) => state.storage.database.DECENTRALIZED_BACKUP,
  );
  // const testAccService = accounts[TEST_ACCOUNT].service;
  // const { isInitialized, loading } = useSelector(state => state.setupAndAuth);
  const dispatch = useDispatch();
  const { isAuthenticated, authenticationFailed } = useSelector(
    (state) => state.setupAndAuth,
  );
  const { dbFetched } = useSelector((state) => state.storage);
  // const [balances, setBalances] = useState({
  //   testBalance: 0,
  //   regularBalance: 0,
  //   secureBalance: 0,
  //   accumulativeBalance: 0,
  // });
  // const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const testBalance = accounts[TEST_ACCOUNT].service
  //     ? accounts[TEST_ACCOUNT].service.hdWallet.balances.balance +
  //       accounts[TEST_ACCOUNT].service.hdWallet.balances.unconfirmedBalance
  //     : 0;
  //   const regularBalance = accounts[REGULAR_ACCOUNT].service
  //     ? accounts[REGULAR_ACCOUNT].service.hdWallet.balances.balance +
  //       accounts[REGULAR_ACCOUNT].service.hdWallet.balances.unconfirmedBalance
  //     : 0;
  //   const secureBalance = accounts[SECURE_ACCOUNT].service
  //     ? accounts[SECURE_ACCOUNT].service.secureHDWallet.balances.balance +
  //       accounts[SECURE_ACCOUNT].service.secureHDWallet.balances
  //         .unconfirmedBalance
  //     : 0;
  //   const accumulativeBalance = regularBalance + secureBalance;

  //   const testTransactions = accounts[TEST_ACCOUNT].service
  //     ? accounts[TEST_ACCOUNT].service.hdWallet.transactions.transactionDetails
  //     : [];
  //   const regularTransactions = accounts[REGULAR_ACCOUNT].service
  //     ? accounts[REGULAR_ACCOUNT].service.hdWallet.transactions
  //         .transactionDetails
  //     : [];

  //   const secureTransactions = accounts[SECURE_ACCOUNT].service
  //     ? accounts[SECURE_ACCOUNT].service.secureHDWallet.transactions
  //         .transactionDetails
  //     : [];
  //   const accumulativeTransactions = [
  //     ...testTransactions,
  //     ...regularTransactions,
  //     ...secureTransactions,
  //   ];

  //   setBalances({
  //     testBalance,
  //     regularBalance,
  //     secureBalance,
  //     accumulativeBalance,
  //   });
  //   setTransactions(accumulativeTransactions);
  // }, [accounts]);

  const s3Service = useSelector((state) => state.sss.service);
  useEffect(() => {
    // HC init and down-streaming
    if (s3Service) {
      const { healthCheckInitialized } = s3Service.sss;
      if (healthCheckInitialized) {
        dispatch(checkMSharesHealth());
      }
    }
  }, [s3Service]);

  useEffect(() => {
    // HC up-streaming
    if (DECENTRALIZED_BACKUP) {
      if (Object.keys(DECENTRALIZED_BACKUP.UNDER_CUSTODY).length) {
        dispatch(updateMSharesHealth());
      }
    }
  }, [DECENTRALIZED_BACKUP]);

  useEffect(() => {
    if (JailMonkey.isJailBroken()) {
      ErrorBottomSheet.current.snapTo(1);
      setTimeout(() => {
        setJailBrokenTitle(
          Platform.OS == 'ios'
            ? 'Your device is Jail Broken'
            : 'Your device is Rooted',
        );
        setElevation(0);
      }, 2);
    }
    DeviceInfo.isPinOrFingerprintSet().then((isPinOrFingerprintSet) => {
      if (!isPinOrFingerprintSet) {
        ErrorBottomSheet.current.snapTo(1);
        setTimeout(() => {
          setJailBrokenTitle(
            "Your Phone don't have any Secure entry like Pin or Biometric",
          );
          setElevation(0);
        }, 2);
      }
    });
    console.log(
      'DeviceInfo.getVersion(), DeviceInfo.getBuildNumber()',
      DeviceInfo.getVersion(),
      DeviceInfo.getBuildNumber(),
    );

    RelayServices.fetchReleases(DeviceInfo.getBuildNumber())
      .then(async (res) => {
        console.log('Release note', res.data.releases);
        let releaseCases = JSON.parse(
          await AsyncStorage.getItem('releaseCases'),
        );
        console.log('releaseCases Login', releaseCases);
        if (
          res.data.releases.length &&
          res.data.releases[0].build != DeviceInfo.getBuildNumber()
        ) {
          if (
            releaseCases &&
            releaseCases.build == res.data.releases[0].build &&
            releaseCases.ignoreClick
          )
            return;
          props.navigation.navigate('UpdateApp', {
            releaseData: res.data.releases,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const storedExchangeRates = await AsyncStorage.getItem('exchangeRates');
  //     if (storedExchangeRates) {
  //       const exchangeRates = JSON.parse(storedExchangeRates);
  //       if (Date.now() - exchangeRates.lastFetched < 1800000) {
  //         setExchangeRates(exchangeRates);
  //         return;
  //       } // maintaining an hour difference b/w fetches
  //     }
  //     const res = await axios.get('https://blockchain.info/ticker');
  //     if (res.status == 200) {
  //       const exchangeRates = res.data;
  //       exchangeRates.lastFetched = Date.now();
  //       setExchangeRates(exchangeRates);
  //       await AsyncStorage.setItem(
  //         'exchangeRates',
  //         JSON.stringify(exchangeRates),
  //       );
  //     } else {
  //       console.log('Failed to retrieve exchange rates', res);
  //     }
  //   })();
  // }, []);

  const custodyRequest = props.navigation.getParam('custodyRequest');
  const recoveryRequest = props.navigation.getParam('recoveryRequest');
  const trustedContactRequest = props.navigation.getParam(
    'trustedContactRequest',
  );

  useEffect(() => {
    if (isAuthenticated) {
      AsyncStorage.getItem('walletExists').then((exists) => {
        if (exists) {
          if (dbFetched) {
            // calculate the exchangeRate
            dispatch(calculateExchangeRate());
            setTimeout(() => {
              (loaderBottomSheet as any).current.snapTo(0);
              props.navigation.navigate('Home', {
                custodyRequest,
                recoveryRequest,
                trustedContactRequest,
              });
            }, 2500);
            dispatch(syncAccounts());
          }
        } else props.navigation.replace('RestoreAndRecoverWallet');
      });
    }
  }, [isAuthenticated, dbFetched]);

  const renderLoaderModalContent = useCallback(() => {
    return (
      <LoaderModal
        headerText={message}
        messageText={'This may take a few seconds'}
      />
    );
  }, [message]);

  const renderLoaderModalHeader = () => {
    return (
      <View
        style={{
          marginTop: 'auto',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          height: hp('75%'),
          zIndex: 9999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  };

  const checkPasscode = () => {
    if (checkAuth) {
      setTimeout(() => {
        (loaderBottomSheet as any).current.snapTo(0);
      }, 2);
      
      return (
        <View style={{ marginLeft: 'auto' }}>
          <Text style={styles.errorText}>Incorrect passcode, try again!</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    if (authenticationFailed) {
      setCheckAuth(true);
      checkPasscode();
    } else {
      setCheckAuth(false);
    }
  }, [authenticationFailed]);

  const renderErrorModalContent = useCallback(() => {
    return (
      <ErrorModalContents
        modalRef={ErrorBottomSheet}
        title={JailBrokenTitle}
        info={''}
        proceedButtonText={'Ok'}
        onPressProceed={() => {
          (ErrorBottomSheet as any).current.snapTo(0);
        }}
        isBottomImage={true}
        bottomImage={require('../assets/images/icons/errorImage.png')}
      />
    );
  }, [JailBrokenTitle]);

  const renderErrorModalHeader = useCallback(() => {
    return (
      <ModalHeader
        onPressHeader={() => {
          (ErrorBottomSheet as any).current.snapTo(0);
        }}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <SafeAreaView style={{ flex: 0 }} />
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <Text style={styles.headerTitleText}>Welcome back!</Text>
          <View>
            <Text style={styles.headerInfoText}>
              Please enter your{' '}
              <Text style={styles.boldItalicText}>passcode</Text>
            </Text>
            <View style={{ alignSelf: 'baseline' }}>
              <View style={styles.passcodeTextInputView}>
                <View
                  style={[
                    passcode.length == 0 && passcodeFlag == true
                      ? styles.textBoxActive
                      : styles.textBoxStyles,
                  ]}
                >
                  <Text
                    style={[
                      passcode.length == 0 && passcodeFlag == true
                        ? styles.textFocused
                        : styles.textStyles,
                    ]}
                  >
                    {passcode.length >= 1 ? (
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          textAlignVertical: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FontAwesome
                          size={10}
                          name={'circle'}
                          color={Colors.black}
                        />
                      </Text>
                    ) : passcode.length == 0 && passcodeFlag == true ? (
                      <Text style={styles.passcodeTextInputText}>{'|'}</Text>
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
                <View
                  style={[
                    passcode.length == 1
                      ? styles.textBoxActive
                      : styles.textBoxStyles,
                  ]}
                >
                  <Text
                    style={[
                      passcode.length == 1
                        ? styles.textFocused
                        : styles.textStyles,
                    ]}
                  >
                    {passcode.length >= 2 ? (
                      <Text style={{ fontSize: RFValue(10) }}>
                        <FontAwesome
                          size={10}
                          name={'circle'}
                          color={Colors.black}
                        />
                      </Text>
                    ) : passcode.length == 1 ? (
                      <Text style={styles.passcodeTextInputText}>{'|'}</Text>
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
                <View
                  style={[
                    passcode.length == 2
                      ? styles.textBoxActive
                      : styles.textBoxStyles,
                  ]}
                >
                  <Text
                    style={[
                      passcode.length == 2
                        ? styles.textFocused
                        : styles.textStyles,
                    ]}
                  >
                    {passcode.length >= 3 ? (
                      <Text style={{ fontSize: RFValue(10) }}>
                        <FontAwesome
                          size={10}
                          name={'circle'}
                          color={Colors.black}
                        />
                      </Text>
                    ) : passcode.length == 2 ? (
                      <Text style={styles.passcodeTextInputText}>{'|'}</Text>
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
                <View
                  style={[
                    passcode.length == 3
                      ? styles.textBoxActive
                      : styles.textBoxStyles,
                  ]}
                >
                  <Text
                    style={[
                      passcode.length == 3
                        ? styles.textFocused
                        : styles.textStyles,
                    ]}
                  >
                    {passcode.length >= 4 ? (
                      <Text style={{ fontSize: RFValue(10) }}>
                        <FontAwesome
                          size={10}
                          name={'circle'}
                          color={Colors.black}
                        />
                      </Text>
                    ) : passcode.length == 3 ? (
                      <Text style={styles.passcodeTextInputText}>{'|'}</Text>
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
              </View>
              {checkPasscode()}
            </View>
          </View>

          {passcode.length == 4 ? (
            <View>
              <TouchableOpacity
                disabled={passcode.length == 4 ? false : true}
                onPress={() => {
                  (loaderBottomSheet as any).current.snapTo(1);
                  setTimeout(() => {
                    setElevation(0);
                  }, 2);
                  dispatch(credsAuth(passcode));
                }}
                style={{
                  ...styles.proceedButtonView,
                  elevation: Elevation,
                  backgroundColor:
                    passcode.length == 4 ? Colors.blue : Colors.lightBlue,
                }}
              >
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={{ marginTop: 'auto' }}>
          <View style={styles.keyPadRow}>
            <TouchableOpacity
              onPress={() => onPressNumber('1')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('1')}
              >
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('2')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('2')}
              >
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('3')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('3')}
              >
                3
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyPadRow}>
            <TouchableOpacity
              onPress={() => onPressNumber('4')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('4')}
              >
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('5')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('5')}
              >
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('6')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('6')}
              >
                6
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyPadRow}>
            <TouchableOpacity
              onPress={() => onPressNumber('7')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('7')}
              >
                7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('8')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('8')}
              >
                8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('9')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('9')}
              >
                9
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyPadRow}>
            <View style={styles.keyPadElementTouchable}>
              <Text style={{ flex: 1, padding: 15 }}></Text>
            </View>
            <TouchableOpacity
              onPress={() => onPressNumber('0')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('0')}
              >
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressNumber('x')}
              style={styles.keyPadElementTouchable}
            >
              <Text
                style={styles.keyPadElementText}
                onPress={() => onPressNumber('x')}
              >
                <Ionicons name="ios-backspace" size={30} color={Colors.blue} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          onCloseEnd={() => {}}
          enabledGestureInteraction={false}
          enabledInnerScrolling={true}
          ref={loaderBottomSheet as any}
          snapPoints={[-50, hp('100%')]}
          renderContent={renderLoaderModalContent}
          renderHeader={renderLoaderModalHeader}
        />
      </View>
      <BottomSheet
        onCloseEnd={() => {
          setElevation(10);
        }}
        onOpenEnd={() => {
          setElevation(0);
        }}
        enabledInnerScrolling={true}
        ref={ErrorBottomSheet}
        snapPoints={[
          -50,
          Platform.OS == 'ios' && DeviceInfo.hasNotch() ? hp('25%') : hp('30%'),
        ]}
        renderContent={renderErrorModalContent}
        renderHeader={renderErrorModalHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textBoxStyles: {
    borderWidth: 0.5,
    height: wp('13%'),
    width: wp('13%'),
    borderRadius: 7,
    marginLeft: 20,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  textBoxActive: {
    height: wp('13%'),
    width: wp('13%'),
    borderRadius: 7,
    marginLeft: 20,
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3 },
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  textStyles: {
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
  textFocused: {
    color: Colors.black,
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: 18,
  },
  keyPadRow: {
    flexDirection: 'row',
    height: hp('8%'),
  },
  keyPadElementTouchable: {
    flex: 1,
    height: hp('8%'),
    fontSize: RFValue(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPadElementText: {
    color: Colors.blue,
    fontSize: RFValue(25),
    fontFamily: Fonts.FiraSansRegular,
    fontStyle: 'normal',
  },
  proceedButtonView: {
    marginLeft: 20,
    marginTop: hp('6%'),
    height: wp('13%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: Colors.shadowBlue,
    shadowOpacity: 1,
    shadowOffset: { width: 15, height: 15 },
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: RFValue(13),
    fontFamily: Fonts.FiraSansMedium,
  },
  boldItalicText: {
    fontFamily: Fonts.FiraSansMediumItalic,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  errorText: {
    fontFamily: Fonts.FiraSansMediumItalic,
    color: Colors.red,
    fontSize: RFValue(11),
    fontStyle: 'italic',
  },
  headerTitleText: {
    color: Colors.blue,
    fontSize: RFValue(25),
    marginLeft: 20,
    marginTop: hp('10%'),
    fontFamily: Fonts.FiraSansRegular,
  },
  headerInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(12),
    marginLeft: 20,
    fontFamily: Fonts.FiraSansRegular,
  },
  passcodeTextInputText: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontSize: RFValue(13),
  },
  passcodeTextInputView: {
    flexDirection: 'row',
    marginTop: hp('4.5%'),
    marginBottom: hp('1.5%'),
    width: 'auto',
  },
});
