import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from "react-native";
import { Content, Input, Item } from "native-base";

import Button from "../../../components/button";

import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

import { exampleService } from "../../../services";

import  { colors } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primaryPink,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '80%',
    height: '60%'
  },
  input: {
    marginVertical: 10,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 70
  }
});

function Home({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const [example, setexample]= React.useState();

  function handleexampleResponse(exampleData) {
    navigation.navigate('example', { exampleData });
  }

  function handleSubmit() {
    if (!Validator.validateFeild(example)) return Toast.warning("please fill the example Id");
    setIsLoading(true);
    exampleService
      .getexample(example)
      .then(handleexampleResponse)
      .catch(Toast.error)
      .finally(() => setIsLoading(false));
  };


  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle='light-content' />

      <View style={styles.inputContainer}>

        <Item rounded style={styles.input} >
          <Input
            placeholder='Enter example ID'
            placeholderTextColor={colors.warmGrey}
            value={example}
            onChangeText={setexample}
          />
        </Item>
        <View style={styles.buttonContainer}>
          <Button isLoading={isLoading} onPress={handleSubmit} buttonTitle='SUBMIT' />
        </View>

      </View>

    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
};

Home.defaultProps = {
  navigation: {},
};

module.exports = Home;
