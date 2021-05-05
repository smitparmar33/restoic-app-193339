import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import AppButton from '../../components/AppButton';
import styles from './styles';
import RNIap, {purchaseErrorListener, purchaseUpdatedListener} from 'react-native-iap';
import {useFocusEffect} from '@react-navigation/native';
import {UserDataContext} from '../../../App';
import {updateUserSubscription} from '../../services/user';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector, tokenSelector, getUser} from '../../redux/user';

// Subscriptions
const SUBSCRIPTION_IDS = Platform.select({
  ios: ['com.restoic.monthly', 'com.restoic.yearly'],
  android: ['com.restoic.monthly', 'com.restoic.yearly'],
});

export const SUBSCRIPTION_TYPE = {
  ANNUALLY: 'annually',
  MONTHLY: 'monthly',
};

const PlanBox = ({active, annually, planTitle, planPrice, planDesc, buttonLabel}) => (
  <View style={[styles.planBox, active && styles.activeBorder, annually && styles.planBoxAnnually]}>
    {annually && (
      <View style={[styles.planValue, !active && {backgroundColor: '#000'}]}>
        <Text style={styles.planValueText}>Best Value</Text>
      </View>
    )}
    <View style={styles.planBoxDesc}>
      <Text style={[styles.planTitle, active && styles.activeTitle]}>{planTitle}</Text>
      <Text style={styles.planPrice}>{planPrice}</Text>
      <Text style={[styles.planDesc, active && styles.activeDesc]}>{planDesc}</Text>
      {annually && <Text style={[styles.planDesc, styles.planDescAnnually]}>Billed annually</Text>}
    </View>
    <View style={[styles.bottomBox, active && styles.activeBackground]}>
      <Text style={styles.bottomBoxTitle}>{buttonLabel}</Text>
    </View>
  </View>
);

const BenefitBox = ({benefitText}) => (
  <View style={styles.benefitBox}>
    <Image style={styles.benefitIcon} source={require('../../assets/images/check-icon.png')} />
    <Text style={styles.benefitDesc}>{benefitText}</Text>
  </View>
);

const UpgradePlanScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  const token = useSelector(tokenSelector);

  const purchaseUpdateRef = useRef();
  const purchaseErrorRef = useRef();
  const [initialized, setInitialized] = useState(false);
  const [activePlan, setActivePlan] = useState(SUBSCRIPTION_TYPE.ANNUALLY);

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('black');
  }
  StatusBar.setBarStyle('light-content');

  // useEffect(() => {
  //   initializeIAP()
  //   return () => {

  //   }
  // }, []);

  useEffect(() => {
    console.log('userData', userData);
    return () => {};
  }, [userData]);

  useFocusEffect(
    useCallback(() => {
      getSubscriptions();
    }, []),
  );

  const initializeIAP = async () => {
    try {
      if (!initialized) {
        const result = await RNIap.initConnection();
        console.log('[initializeIAP]', result);

        purchaseUpdateRef.current = purchaseUpdatedListener(async (purchase) => {
          console.log('[purchaseUpdatedListener]', purchase);
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            // TODO: confirm receipt
            console.log(receipt);
            await onSuccessfulPurchase();
            await RNIap.finishTransaction(purchase);
            Alert.alert('Purchase Successful', 'Plan successfully upgraded!');
          } else {
            Alert.alert('Purchase Failed', 'Unable to confirm receipt validity');
          }
        });

        purchaseErrorRef.current = purchaseErrorListener((error) => {
          console.log('[purchaseErrorListener]', error);
          Alert.alert('Purchase Failed', 'Something went wrong with your purchase.');
        });

        await restorePurchases();
        setInitialized(true);
      }
    } catch (error) {
      console.error('[initializeIAP]', error);
    }
  };

  const restorePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.log('[restorePurchases]', purchases);
    } catch (error) {
      console.error('[restorePurchases]', error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const subs = await RNIap.getSubscriptions(SUBSCRIPTION_IDS);
      console.log('[getSubscriptions]', subs);
    } catch (error) {
      console.error('[getSubscriptions]', error.code, error.message);
    }
  };

  const purchaseSubscription = async () => {
    try {
      const subId = activePlan === SUBSCRIPTION_TYPE.ANNUALLY ? SUBSCRIPTION_IDS[1] : SUBSCRIPTION_IDS[0];
      await RNIap.requestSubscription(subId);
    } catch (error) {
      console.error('[purchaseSubscription]', error);
    }
  };

  const onSuccessfulPurchase = async () => {
    try {
      await updateUserSubscription({
        user: userData,
        subscriptionType: activePlan,
      });
      // await loadUserData()
      if (token) {
        dispatch(getUser(token));
      }
    } catch (error) {
      console.dir('[onSuccessfulPurchase].error', error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <Icon
          containerStyle={styles.backIcon}
          name={'close-outline'}
          onPress={() => {
            navigation.goBack();
          }}
          type="ionicon"
          color="black"
          size={40}
        />
        <View style={styles.pageContainer}>
          <View style={styles.titleBox}>
            <Image style={styles.image} resizeMode="contain" source={require('../../assets/images/restoic-logo.png')} />
            <Text style={styles.title}> / PREMIUM ACCESS</Text>
          </View>
          <BenefitBox benefitText="Unlimited on the go listening with brand new audio experiences added every month" />
          <BenefitBox benefitText="Create a playlist of your favorite tracks, listen offline, and unlock the Skip Intro feature" />
          <BenefitBox benefitText="Exclusive Binaural Beats and Soundscapes for focus, confidence, relaxation, and sleep" />
          <BenefitBox benefitText="Full access to a variety of categories including Sports Psychology, Meditation, Breathwork, and more" />
          <View style={styles.planWrapper}>
            <TouchableOpacity onPress={() => setActivePlan(SUBSCRIPTION_TYPE.MONTHLY)}>
              <PlanBox
                planTitle="Monthly"
                planPrice="$7.99"
                planDesc="Billed monthly"
                buttonLabel="Start today"
                active={activePlan === SUBSCRIPTION_TYPE.MONTHLY}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePlan(SUBSCRIPTION_TYPE.ANNUALLY)}>
              <PlanBox
                planTitle="Annually"
                planPrice="$69.99"
                planDesc="$5.99 per month after free trial"
                buttonLabel="save 27%"
                annually
                active={activePlan === SUBSCRIPTION_TYPE.ANNUALLY}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <AppButton
              disabled={activePlan === null}
              label={activePlan === SUBSCRIPTION_TYPE.MONTHLY ? 'UPGRADE NOW' : 'TRY 7 DAYS FOR FREE'}
              onPress={async () => {
                await initializeIAP();
                purchaseSubscription();
              }}
            />
          </View>
          <View style={styles.infoBox}>
            {activePlan === SUBSCRIPTION_TYPE.MONTHLY && (
              <Text style={styles.infoDesc}>Upgrade to annual to save 27% and get FREE 7-day trial.</Text>
            )}
            {activePlan === SUBSCRIPTION_TYPE.ANNUALLY && (
              <Text style={styles.infoDesc}>69.99 per year after FREE 7-day trial.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpgradePlanScreen;
