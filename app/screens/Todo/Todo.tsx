import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from './styles';
import { fireStore, firebaseAuth } from '../../../firebaseConfig';
import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import authSlice from '../../store/slices/authSlice';
import todoSlice from '../../store/slices/todosSlice';

interface ITask {
  id: string,
  text: string,
  completed: boolean,
}

const Todo = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const todos = useAppSelector(state => state.todo.todos);

  const [newTask, setNewTask] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [taskToUpdate, setTaskToUpdate] = useState<string>('');

  useEffect(() => {
    const todoRef = collection(fireStore, 'todos');

    const unsubscribe = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: ITask[] = [];
        snapshot.docs.forEach(doc => {
          console.log("🚀 ~ useEffect ~ doc:", doc)
          /* if (doc.userId === user?.uid) { */
            todos.push({
              id: doc.id,
              ...doc.data(),
            } as ITask)
          /* }  */         
        });
        dispatch(todoSlice.actions.setTodos(todos))
      }
    });
    return () => unsubscribe();
  }, [])

  const handleAddTask = async () => {
    if (!newTask) return Alert.alert('Please type a valid task')
    await addDoc(collection(fireStore, 'todos'), { text: newTask, completed: false, userId: user?.uid });
    setNewTask('')
  };

  const handleEditTask = async (taskRef: DocumentReference<DocumentData, DocumentData>, task: ITask) => {
    if (!taskToUpdate) return Alert.alert('Please type a valid task');
    await updateDoc(taskRef, { text: taskToUpdate});
    setSelectedTaskId('');
    setTaskToUpdate('');
  }

  const handleRemoveTask = async (taskRef: DocumentReference<DocumentData, DocumentData>) => await deleteDoc(taskRef);

  const toggleTaskCompletion = async (taskRef: DocumentReference<DocumentData, DocumentData>, task: ITask) => {
    await updateDoc(taskRef, { completed: !task.completed})
  }

  const renderTask = ({ item }: any) => {
    const taskRef = doc(fireStore, 'todos/' + item.id); 
      
    return (
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, flexDirection: 'row', padding: 7}}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(taskRef, item)}>
          {
            item.completed ?
              <MaterialIcons name="radio-button-checked" size={24} color="black" />
              : <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
          }
          
        </TouchableOpacity>
        {
          selectedTaskId === item.id ? (
            <TextInput
              value={taskToUpdate}
              onChangeText={(text) => setTaskToUpdate(text)}
              style={{ backgroundColor: '#999999', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, width: '70%', color: '#fff'}}
            />
          )
          : <Text style={{ width: '70%' }}>{item.text}</Text>
        }
        { selectedTaskId === item.id ? (
            <>
              <TouchableOpacity onPress={() => handleEditTask(taskRef, item)}>
                <AntDesign name="checksquare" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTaskId('')}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            </>          
          ) : (
            <>
              <TouchableOpacity onPress={() => setSelectedTaskId(item.id)}>
                <Ionicons name="pencil" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveTask(taskRef)}>
                <Ionicons name="trash-bin" size={24} color="black" />
              </TouchableOpacity>
            </>            
          )
        }
      </View>
    )
  }

  const handleLogout = () => {
    firebaseAuth.signOut();
    dispatch(authSlice.actions.clear());
  }

  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5 }}>
        <TextInput
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          style={{ backgroundColor: '#999999', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, width: '50%', color: '#fff' }}
        />
        <Button title='Add Task' onPress={handleAddTask}/>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(task: ITask) => task.id}
        renderItem={renderTask}
      />      
      <Button title='Logout' onPress={handleLogout} color='grey'/>
    </KeyboardAvoidingView>
  )
}

export default Todo;
