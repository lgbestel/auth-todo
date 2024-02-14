import styled from "styled-components/native";

export const TodoButton = styled.TouchableOpacity`
background-color: #088F8F;
border-radius: 10px;
padding-horizontal: 20px;
padding-vertical: 10px;
width: 30%;
display: flex;
align-items: center;
justify-content: center;
`

export const Input = styled.TextInput`
  border: grey;
  border-radius: 10px;
  width: 50%;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`

export const TaskInput = styled.TextInput`
  border: grey;
  border-radius: 10px;
  width: 70%;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`

export const ButtonText = styled.Text`
  color: #fff
`

export const Text = styled.Text`
  color: #000
`
export const Container = styled.KeyboardAvoidingView`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 90%;
`

export const InputContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
  margin-vertical: 5px;
`

export const TaskContainer = styled.View`
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  gap: 6px;
  flex-direction: row;
  padding: 7px;
`