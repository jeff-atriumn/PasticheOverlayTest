/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Auth, API} from 'aws-amplify';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // const [onLoadText, setText] = useState('');
  const [emailText, setUserEmail] = useState('');
  const [overlay, setOverlay] = useState({});

  const onScreenLoad = () => {
    // setText('HI User');
  };

  async function signIn() {
    try {
      const user = await Auth.signIn('admin@example.com', 'Passw0rd!');
      setUserEmail(user.attributes.email);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function getData() {
    const apiName = 'notes';
    const path = '/overlays';

    // return await API.get(apiName, path);
    API.get(apiName, path)
      .then(response => {
        setOverlay(response[0]);
        console.log(overlay);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  // (async function () {
  //   const response = await getData();
  //   console.log(response);
  // })();

  useEffect(() => {
    signIn();
    getData();
    onScreenLoad();
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Auth Check">
            <Text style={styles.highlight}>{emailText}</Text>
          </Section>
          <Section title="Overlays">
            <Text>
              Overlay Name:{' '}
              <Text style={styles.highlight}>{overlay.overlayName}</Text>
            </Text>
          </Section>
          <Section>
            <Text>
              Overlay Id:{' '}
              <Text style={styles.highlight}>{overlay.overlayId}</Text>
            </Text>
          </Section>
          <Section>
            <Text>
              Overlay Path:{' '}
              <Text style={styles.highlight}>{overlay.overlayPath}</Text>
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
