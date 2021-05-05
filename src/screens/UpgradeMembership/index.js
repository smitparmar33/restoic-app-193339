import React, { useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, View, StatusBar, Platform } from 'react-native';
import styles from './styles';
import { Button } from 'react-native-elements';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import { useFocusEffect } from '@react-navigation/native';

// Subscriptions
const SUBSCRIPTION_IDS = Platform.select({
  ios: ['com.crowdbotics.restoic.monthly', 'com.crowdbotics.restoic.yearly'],
  android: ['com.crowdbotics.restoic.monthly', 'com.crowdbotics.restoic.yearly'],
});

const UpgradeMembership = () => {

  const purchaseUpdateRef = useRef();
  const purchaseErrorRef = useRef();

  StatusBar.setBarStyle('light-content');

  useEffect(() => {
    initializeIAP()
    return () => {
      
    }
  }, []);

  useFocusEffect(useCallback(
    () => {
      getSubscriptions();
    },
    [],
  ));

  const initializeIAP = async () => {
    try {
      const result = await RNIap.initConnection();
      console.log('[initializeIAP]', result);

      purchaseUpdateRef.current = purchaseUpdatedListener(async (purchase) => {
        console.log('[purchaseUpdatedListener]', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          console.log(receipt);
          await RNIap.finishTransaction(purchase);
        }
      });
  
      purchaseErrorRef.current = purchaseErrorListener((error) => {
        console.log('[purchaseErrorListener]', error);
      });

      restorePurchases();
    } catch (error) {
      console.error('[initializeIAP]', error);
    }
  }

  const restorePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.log('[restorePurchases]', purchases);
    } catch (error) {
      console.error('[restorePurchases]', error);
    }
  }

  const getSubscriptions = async () => {
    try {
      const subs = await RNIap.getSubscriptions(SUBSCRIPTION_IDS);
      console.log('[getSubscriptions]', subs);
    } catch (error) {
      console.error('[getSubscriptions]', error.code, error.message);
    }
  }

  const purchaseSubscription = async (subId) => {
    try {
      await RNIap.requestSubscription(subId);
    } catch (error) {
      console.error('[purchaseSubscription]', error);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Button
          title='Monthly'
          style={{ width: 100, }}
          onPress={() => {
            purchaseSubscription(SUBSCRIPTION_IDS[0])
          }}
        />
        <Button 
          title='Yearly'
          style={{ width: 100, }}
          nPress={() => {
            purchaseSubscription(SUBSCRIPTION_IDS[1])
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default UpgradeMembership;
