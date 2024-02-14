import { FlatList, TouchableOpacity, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, Input, Container, TodoButton, InputContainer, TaskContainer } from './styles';
import { fireStore, firebaseAuth } from '../../../firebaseConfig';
import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import authSlice from '../../store/slices/authSlice';
import todoSlice from '../../store/slices/todosSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Todo'>;
interface ITask {
  id: string,
  text: string,
  completed: boolean,
}

const Todo: React.FC<Props> = (props) => {
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

  const handleLogout = () => {
    try {
      firebaseAuth.signOut();
      props.navigation.replace('Login');
      dispatch(authSlice.actions.clear());      
    } catch (error: any) {
      Alert.alert('Error loggin out', error.message);
    }
  }

  const renderTask = ({ item }: any) => {
    const taskRef = doc(fireStore, 'todos/' + item.id); 
      
    return (
      <TaskContainer>
        <TouchableOpacity onPress={() => toggleTaskCompletion(taskRef, item)}>
          {
            item.completed ?
              <MaterialIcons name="radio-button-checked" size={24} color="black" />
              : <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
          }
          
        </TouchableOpacity>
        {
          selectedTaskId === item.id ? (
            <Input
              value={taskToUpdate}
              onChangeText={(text) => setTaskToUpdate(text)}
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
      </TaskContainer>
    )
  }

  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TodoButton onPress={handleAddTask}>
          <Text>ADD TASK</Text>
        </TodoButton>
      </InputContainer>
      <FlatList
        data={todos}
        keyExtractor={(task: ITask) => task.id}
        renderItem={renderTask}
      />      
      <TodoButton onPress={handleLogout}>
        <Text>LOGOUT</Text>
      </TodoButton>
    </Container>
  )
}

export default Todo;
