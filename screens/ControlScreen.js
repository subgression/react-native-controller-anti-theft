import React, {Component} from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import SendSMS from 'react-native-sms'

import List from '../components/List.js';

import Antifurto from '../classes/Antifurto.js';

import colors from '../res/colors.js';

const Images = {
  Erika: require('../assets/erika.png'),
  Cri: require('../assets/cri.png'),
  Miki: require('../assets/miki.png'),
  Sara: require('../assets/sara.png'),
};



type Props = {};
export default class ControlScreen extends Component<Props> {

  constructor(props) {
    super(props);

    var antifurto = this.props.navigation.getParam("a");

    if (antifurto == null) {
      this.state = {
        error: true,
      }
    }
    else {
      this.state = {
        nomeAntifurto: antifurto.nome,
        modelloAntifurto: antifurto.modello,
        numeroAntifurto: antifurto.numero,
        srcAntifurto: antifurto.src,
        pinAntifurto: antifurto.pin,
        prefissoAntifurto: antifurto.prefisso,
        antifurto: antifurto,
      };
    }
  }

  static navigationOptions = {
    title: "Controlla antifurto",

    headerStyle: {
      backgroundColor: colors.bgDark,
    },

    headerTintColor: '#fff',
  };

  sendSMS = (stato) => {
    SendSMS.send({
        body: this.state.antifurto.generaCodice(stato),
        recipients: [this.state.numeroAntifurto],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: false
    }, (completed, cancelled, error) => {
        //alert('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        if (completed) {
          alert("Messaggio inviato correttamente!");
        }
    });
  }

  removeAntifurto = () => {
    new List().removeAntifurto(this.state.antifurto);
    this.props.navigation.navigate("Home", {r: true});
  }

  render() {

    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Image
            style={{width: 150, height: 150}}
            source={require("../assets/error.png")}
          />
          <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
            Ooops...
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Questo cane ha rubato tutti i dati
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Vaga da applicazione ad applicazione
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Solo per disturbare gli utenti
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Non ha ne storia ne padrone
          </Text>
          <Text style={{color: '#fff', fontSize: 20}}>
            Riprovare prego, magari se ne va
          </Text>
          <View style={{margin: 20}}>
            <Button
              title="Bark!"
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/*Container dell'immagine*/}
        <View style={{flex: 4}}>
          <Image
            style={styles.antifurtoImage}
            source={this.state.srcAntifurto}
          />
        </View>
        {/*Container del titolo*/}
        <View style={{flex: 1}}>
          <Text style={{color: '#fff', fontSize: 25}}>{this.state.nomeAntifurto} ({this.state.modelloAntifurto})</Text>
        </View>
        {/*Container dei bottoni*/}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableHighlight style={styles.lockIcon} onPress={() => this.sendSMS(2)} underlayColor={colors.transparent}>
            <View>
              <Image
                style={styles.lockIconImage}
                source={require("../assets/lockOpen.png")}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.lockIcon} onPress={() => this.sendSMS(1)} underlayColor={colors.transparent}>
            <View>
              <Image
                style={styles.lockIconImage}
                source={require("../assets/lockClosed.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1}}>
          <TouchableHighlight style={styles.deleteIcon} onPress={() => this.removeAntifurto()}>
            <View>
              <Image
                style={styles.deleteIconImage}
                source={require("../assets/delete.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
        {/*Container del bottone*/}
        <View style={styles.bottom}>
          <Button
            title="Esci"
            color={Platform.OS === 'android' ? colors.bgDark : '#fff'}
            style={{borderRadius: 20}}
            onPress={() => this.props.navigation.navigate("Home")}
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
    textAlign: 'center',
    margin: 10,
  },
  bottom: {
    backgroundColor: colors.bgLight,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  lockIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: 20,
    borderColor: colors.bgDark,
    borderWidth: 1,
    margin: 10,
    elevation: 5,
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd1d1d',
    borderRadius: 20,
    borderColor: '#990000',
    borderWidth: 1,
    margin: 10,
    elevation: 5,
  },
  lockIconImage: {
    width: 50,
    height: 50,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconImage: {
    width: 30,
    height: 30,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  antifurtoImage: {
    flex: 1,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'stretch'
  }
});
