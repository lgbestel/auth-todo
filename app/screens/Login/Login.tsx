import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { firebaseAuth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: any) {
      console.log('Sign in failed: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      Alert.alert('You are now signed up! Proceed to login')
    } catch (error: any) {
      console.log('Sign in failed: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login;
