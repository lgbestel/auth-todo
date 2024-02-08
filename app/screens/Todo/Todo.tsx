import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from './styles';
import { fireStore, firebaseAuth } from '../../../firebaseConfig';
import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

interface ITask {
  id: string,
  text: string,
  completed: boolean,
}

const Todo = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [taskToUpdate, setTaskToUpdate] = useState<string>('');

  useEffect(() => {
    const todoRef = collection(fireStore, 'todos');

    const unsubscribe = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: ITask[] = [];
        snapshot.docs.forEach(doc => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as ITask)
        });
        setTasks(todos)
      }
    });

    return () => unsubscribe();
  }, [])

  const handleAddTask = async () => {
    if (!newTask) return Alert.alert('Please type a valid task')
    await addDoc(collection(fireStore, 'todos'), { text: newTask, completed: false });
    setNewTask('')
  };

  const handleEditTask = async (taskRef: DocumentReference<DocumentData, DocumentData>, task: ITask) => {
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
      <View>
        <TouchableOpacity onPress={() => toggleTaskCompletion(taskRef, item)} style={{ backgroundColor: item.completed ? 'green' : 'red' }}>
          <Text>Concluir</Text>
        </TouchableOpacity>
        {
          selectedTaskId === item.id ? (
            <TextInput
              value={taskToUpdate}
              onChangeText={(text) => setTaskToUpdate(text)}
              style={{ backgroundColor: 'red' }}
            />
          )
          : <Text>{item.text}</Text>
        }
        { selectedTaskId === item.id ? (
            <>
              <TouchableOpacity onPress={() => handleEditTask(taskRef, item)} style={{backgroundColor: 'grey'}}>
                <Text>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTaskId('')} style={{backgroundColor: 'grey'}}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </>          
          ) : (
            <>
              <TouchableOpacity onPress={() => setSelectedTaskId(item.id)} style={{backgroundColor: 'grey'}}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveTask(taskRef)} style={{backgroundColor: 'grey'}}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </>            
          )
        }
      </View>
    )
  }

  const handleLogout = () => firebaseAuth.signOut();

  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 60 }}>
      <FlatList
        data={tasks}
        keyExtractor={(task: ITask) => task.id}
        renderItem={renderTask}
      />
      <TextInput
        placeholder="Add a new task"
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <Button title='Add Task' onPress={handleAddTask}/>
      <Button title='Logout' onPress={handleLogout}/>
    </KeyboardAvoidingView>
  )
}

export default Todo;
