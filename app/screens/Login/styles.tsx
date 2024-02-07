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

export const Button = styled.Button`
  background-color: light-blue;
  border-radius: 30px;
  width: 50%;
`

export const Text = styled.Text`
  color: #fff
`