import styled from "styled-components/native";

export const TodoButton = styled.TouchableOpacity`
background-color: #088F8F;
border-radius: 10px;
padding-horizontal: 8px;
padding-vertical: 8px;
width: 30%;
display: flex;
align-items: center;
justify-content: center;
`

export const Input = styled.TextInput`
  border: grey;
  border-radius: 10px;
  width: 50%;
  padding-horizontal: 8px;
  padding-vertical: 4px;
`

export const Text = styled.Text`
  color: #fff
`
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center
`

export const InputContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5
`

export const TaskContainer = styled.View`
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  gap: 6;
  flex-direction: row;
  padding: 7
`