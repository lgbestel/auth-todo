import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const Input = styled.TextInput`
  border: grey;
  border-radius: 10px;
  width: 60%;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`

export const ButtonsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
`

export const LoginButton = styled.TouchableOpacity`
  background-color: #088F8F;
  border-radius: 10px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: #fff
`