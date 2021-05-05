import React from 'react';
import {Layout} from 'react-native-ui-kitten';
import {AppText} from '../components';

import styles from './styles';

export default function ErrorBox({errorText}) {
  return (
    <Layout style={styles.container}>
      <AppText category="s1" status="danger" styles={styles.errorText}>
        {errorText}
      </AppText>
    </Layout>
  );
}
