import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export const Input = styled.TextInput`
  border: grey;
  border-radius: 10px;
  width: 50%;
  padding-horizontal: 8px;
  padding-vertical: 4px;
`

export const LoginButton = styled.TouchableOpacity`
  background-color: #088F8F;
  border-radius: 10px;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: #fff
`