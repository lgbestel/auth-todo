
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login/Login';
import Todo from './app/screens/Todo/Todo';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './firebaseConfig';
import { useAppDispatch, useAppSelector } from './app/store/hooks';
import authSlice from './app/store/slices/authSlice';

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('User email: ', user?.email);
      dispatch(authSlice.actions.setUser(user));
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {
          user ?
            <Stack.Screen name='Todo' component={Todo} options={{ headerShown: false }} />
            : <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        }        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
