import React, {Component} from 'react';
import {Platform, Button, StyleSheet, Text, View, Image} from 'react-native';

import List from '../components/List.js';
import CircleButton from '../components/CircleButton.js';

import colors from '../res/colors.js';

type Props = {};
export default class MainScreen extends Component<Props> {

  static navigationOptions = {
    title: "Controller Antifurto",

    headerStyle: {
      backgroundColor: colors.bgDark,
    },

    headerTintColor: '#fff',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Image
            source={require("../assets/logo.png")}
            style={{maxWidth: 100, maxHeight: 100, resizeMode: 'contain'}}
          />
        </View>
        <View style={{flex: 5}}>
          <List navigation={this.props.navigation} refreshList={this.props.navigation.getParam("r")}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 50}}>
          <CircleButton src={require('../assets/facebook.png')} link="https://www.facebook.com/profile.php?id=286282228241746&ref=content_filter"/>
          <CircleButton src={require('../assets/youtube.png')} link="https://www.youtube.com/channel/UCVvCWEHSBLJC1k1ewSeLWPg"/>
          <CircleButton src={require('../assets/shop.png')} link="https://www.mapishop.it"/>
        </View>
        <View style={styles.bottom}>
          <Button
            title="Aggiungi nuovo antifurto"
            color={Platform.OS === 'android' ? colors.bgDark : '#fff'}
            onPress={() => this.props.navigation.navigate("Add")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: colors.bgLight,
  },
  welcome: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    margin: 10,
  },
  bottom: {
    backgroundColor: colors.bgLight,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
