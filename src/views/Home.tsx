import React, { useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { authorize } from 'react-native-app-auth';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { config } from '../config';
import { UserContext } from '../contexts/UserContext';

export const HomeScreen = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      const result = await authorize(config);

      RNSecureStorage.set('authorizeResponse', JSON.stringify(result), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      }).then(
        _res => {
          setIsLoggedIn(true);
        },
        err => {
          throw err;
        },
      );
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.title}>
        Asgardeo + React Native Authentication Sample
      </Text>
      <TouchableOpacity onPress={signIn} style={homeScreenStyles.signInBtn}>
        <Text style={homeScreenStyles.signInBtnText}>
          {isLoading ? 'Loading...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
      <View />
    </View>
  );
};

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  signInBtn: {
    elevation: 8,
    width: 250,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgb(255,115,0)',
    borderRadius: 25,
    cursor: 'pointer',
  },
  signInBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
