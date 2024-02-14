import { ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebaseAuth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginButton, Container, Input, Text } from './styles';
import { useAppDispatch } from '../../store/hooks';
import authSlice from '../../store/slices/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if(user) props.navigation.replace('Todo');
    })
    return unsubscribe;
  }, [])

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const bla = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      Alert.alert('You are now signed up! Proceed to login')
    } catch (error: any) {
      Alert.alert('Sign up failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
      dispatch(authSlice.actions.setUser(credentials.user))
    } catch (error: any) {
      console.log('error', error);
      Alert.alert('Sign in failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Input placeholder='E-mail' value={email} onChangeText={(text: string) => setEmail(text)}/>
      <Input placeholder='Pasword'value={password} onChangeText={(text: string) => setPassword(text)} secureTextEntry/>
      {
        loading ?
        <ActivityIndicator color='#088F8F' />
        : <>
          <LoginButton onPress={handleLogin}>
            <Text>LOGIN</Text>
          </LoginButton>
          <LoginButton onPress={handleSignUp}>
            <Text>SIGN UP</Text>
          </LoginButton>
        </>
      }
      
    </Container>
  )
}

export default Login;
