
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login/Login';
import Todo from './app/screens/Todo/Todo';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

export type RootStackParamList = {
  Login: undefined,
  Todo: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />        
          <Stack.Screen name='Todo' component={Todo} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
