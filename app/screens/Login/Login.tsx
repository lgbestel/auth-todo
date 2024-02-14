import { ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebaseAuth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginButton, Container, Input, Text, ButtonsContainer } from './styles';
import { useAppDispatch } from '../../store/hooks';
import authSlice from '../../store/slices/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(authSlice.actions.setUser(user))
        props.navigation.replace('Todo');
      }
    })
  }, [])

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
      Alert.alert('Sign in failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <FontAwesome5 name="tasks" size={40} color="black" />
      <Input placeholder='E-mail' value={email} autoCapitalize='none' onChangeText={(text: string) => setEmail(text)}/>
      <Input placeholder='Pasword'value={password} autoCapitalize='none' onChangeText={(text: string) => setPassword(text)} secureTextEntry/>
      {
        loading ?
        <ActivityIndicator color='#088F8F' style={{ marginTop: 5 }} />
        : <ButtonsContainer>
          <LoginButton onPress={handleLogin}>
            <Text>LOGIN</Text>
          </LoginButton>
          <LoginButton onPress={handleSignUp}>
            <Text>SIGN UP</Text>
          </LoginButton>
        </ButtonsContainer>
      }
      
    </Container>
  )
}

export default Login;
