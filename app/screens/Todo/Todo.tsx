import { View, Text } from 'react-native'
import React from 'react'
import { Button } from './styles';
import { firebaseAuth } from '../../../firebaseConfig';

const Todo = () => {
  const handleLogout = () => firebaseAuth.signOut();

  return (
    <View>
      <Text>Todo</Text>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default Todo;
