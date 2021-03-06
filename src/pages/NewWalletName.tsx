import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../common/Fonts';
import Colors from '../common/Colors';
import CommonStyles from '../common/Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import DeviceInfo from 'react-native-device-info';
import HeaderTitle from '../components/HeaderTitle';
import BottomInfoBox from '../components/BottomInfoBox';

export default function NewWalletName(props) {
  const [walletName, setWalletName] = useState('');
  const [inputStyle, setInputStyle] = useState(styles.inputBox);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View style={CommonStyles.headerContainer}>
          <TouchableOpacity
            style={CommonStyles.headerLeftIconContainer}
            onPress={() => {
              props.navigation.navigate('RestoreAndRecoverWallet');
            }}
          >
            <View style={CommonStyles.headerLeftIconInnerContainer}>
              <FontAwesome
                name="long-arrow-left"
                color={Colors.blue}
                size={17}
              />
            </View>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : ''}
          enabled
        >
          <ScrollView>
            <HeaderTitle
              firstLineTitle={'New Hexa Wallet'}
              secondLineTitle={''}
              infoTextNormal={'Please name your '}
              infoTextBold={'wallet'}
            />
            <TextInput
              style={inputStyle}
              placeholder={'Enter a name for your wallet'}
              placeholderTextColor={Colors.borderColor}
              value={walletName}
              keyboardType={
                Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'
              }
              maxLength={20}
              onChangeText={(text) => {
                text = text.replace(/[^A-Za-z]/g, '');
                setWalletName(text);
              }}
              onFocus={() => {
                setInputStyle(styles.inputBoxFocused);
              }}
              onBlur={() => {
                setInputStyle(styles.inputBox);
              }}
            />
          </ScrollView>

          <View style={styles.bottomButtonView}>
            {walletName.trim() != '' ? (
              <View
                style={{
                  elevation: 10,
                  shadowColor: Colors.shadowBlue,
                  shadowOpacity: 1,
                  shadowOffset: { width: 15, height: 15 },
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('NewWalletQuestion', {
                      walletName,
                    });
                  }}
                  style={styles.buttonView}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={styles.statusIndicatorView}>
              <View style={styles.statusIndicatorActiveView} />
              <View style={styles.statusIndicatorInactiveView} />
            </View>
          </View>

          {walletName.trim() == '' ? (
            <View style={{ marginBottom: DeviceInfo.hasNotch ? hp('3%') : 0 }}>
              <BottomInfoBox
                title={'We do not store this'}
                infoText={
                  'Only your contacts will see this when you transact with them, to identify you'
                }
              />
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: Colors.blue,
    fontSize: RFValue(25),
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: Fonts.FiraSansRegular,
  },
  labelStyle: {
    color: Colors.textColorGrey,
    fontSize: RFValue(12),
    marginLeft: 15,
    fontFamily: Fonts.FiraSansRegular,
  },
  inputBox: {
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: hp('5%'),
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 15,
    fontSize: RFValue(13),
    color: Colors.textColorGrey,
    fontFamily: Fonts.FiraSansRegular,
    marginBottom: 20,
  },
  inputBoxFocused: {
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: hp('5%'),
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 15,
    fontSize: RFValue(13),
    color: Colors.textColorGrey,
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 10,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: Colors.white,
    fontFamily: Fonts.FiraSansRegular,
    marginBottom: 20,
  },
  bottomNoteText: {
    color: Colors.blue,
    fontSize: RFValue(13),
    marginBottom: 5,
    fontFamily: Fonts.FiraSansRegular,
  },
  bottomNoteInfoText: {
    color: Colors.textColorGrey,
    fontSize: RFValue(12),
    fontFamily: Fonts.FiraSansRegular,
  },
  buttonView: {
    height: wp('13%'),
    width: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    color: Colors.white,
    fontSize: RFValue(13),
    fontFamily: Fonts.FiraSansMedium,
  },
  bottomButtonView: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: DeviceInfo.hasNotch() ? 70 : 40,
    paddingTop: 30,
    alignItems: 'center',
  },
  statusIndicatorView: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  statusIndicatorActiveView: {
    height: 5,
    width: 25,
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  statusIndicatorInactiveView: {
    width: 5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    marginLeft: 5,
  },
});
