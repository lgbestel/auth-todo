import { Alert } from 'react-native'
import React, { useState } from 'react'
import { firebaseAuth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Container, Input, Text } from './styles';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
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
    <Container>
      <Input placeholder='E-mail' value={email} onChangeText={(text: string) => setEmail(text)}/>
      <Input placeholder='Pasword'value={password} onChangeText={(text: string) => setPassword(text)} secureTextEntry/>
      <Button title='Log In' onPress={handleLogin}/>
      <Button title='Sign In' onPress={handleSignUp}/>
    </Container>
  )
}

export default Login;
