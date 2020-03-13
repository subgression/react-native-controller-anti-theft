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

import List from '../components/List.js';

import Antifurto from '../classes/Antifurto.js';

import colors from '../res/colors.js';

var listaAntifurto = [];
listaAntifurto.push(new Antifurto('Placeholder', 'Erika', '323232232', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Cristian', '323232232', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Miki', '234234234', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Sara e Alessia', '234234234', "0000", 4));

type Props = {};
export default class AddAntifurtoScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      modelloAntifurto: listaAntifurto[0].modello,
      srcAntifurto: listaAntifurto[0].src,
      dimensionePinAntifurto: listaAntifurto[0].dimensionePin,
      _nome: "",
      _numero: "",
      _pin: "",
    };
  }

  static navigationOptions = {
    title: "Aggiungi nuovo",

    headerStyle: {
      backgroundColor: colors.bgDark,
    },

    headerTintColor: '#fff',
  };

  changeAntifurto = () => {
    this.setState({ index: this.state.index + 1});
    if (this.state.index >= listaAntifurto.length - 1) {
      this.setState({ index: 0 });
    }
    var src = listaAntifurto[this.state.index].src;
    var modello = listaAntifurto[this.state.index].modello;
    var prefisso = listaAntifurto[this.state.index].prefisso;
    var dimensionePin = listaAntifurto[this.state.index].dimensionePin;
    this.setState({
      modelloAntifurto: modello,
      srcAntifurto: src,
      prefisso: prefisso,
      dimensionePinAntifurto: dimensionePin,
    });
  }

  addAntifurto = () => {

    if (this.state._nome.length == 0) {
      alert("Dare un nome all'antifurto");
      return;
    }

    if (this.state._numero.includes(",") || this.state._numero.includes(".") || this.state._numero.length == 0) {
      alert("Inserire un numero corretto");
      return;
    }

    if (this.state._pin.includes(",") || this.state._pin.includes(".") || this.state._pin.length != this.state.dimensionePinAntifurto) {
      alert("Inserire un pin corretto, deve essere di " + this.state.dimensionePinAntifurto + " cifre");
      return;
    }

    var nome = this.state._nome;
    var numero = this.state._numero;
    var modello = this.state.modelloAntifurto;
    var pin = this.state._pin;
    var dimensionePin = this.state.dimensionePinAntifurto;
    var a = new Antifurto(nome, modello, numero, pin, dimensionePin);

    if (a === null) {
      alert("Errore nell'aggiunta dell'antifurto, riprovare prego");
      return;
    }

    //alert(a.toJSON());
    new List().addAntifurto(a);
    this.props.navigation.navigate("Home", {r: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Text style={{color: '#fff', fontSize: 20}}>Modello: {this.state.modelloAntifurto}</Text>
          <TouchableHighlight onPress={() => this.changeAntifurto()} underlayColor={colors.transparent}>
            <Image
              style={styles.antifurtoImage}
              source={this.state.srcAntifurto}
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: '#fff', fontSize: 25}}>Nome</Text>
          <TextInput
            onChangeText={(text) => this.setState({_nome: text})}
            style={{color: '#fff', fontSize: 25}}
          />
          <Text style={{color: '#fff', fontSize: 25}}>Numero</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => this.setState({_numero: text})}
            style={{color: '#fff', fontSize: 25}}
          />
          <Text style={{color: '#fff', fontSize: 25}}>Pin</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => this.setState({_pin: text})}
            style={{color: '#fff', fontSize: 25}}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            title="Aggiungi"
            color={colors.bgDark}
            onPress={() => this.addAntifurto()}
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
  antifurtoImage: {
    flex: 1,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'stretch'
  }
});
