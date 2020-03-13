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
  Linking,
} from 'react-native';

import List from '../components/List.js';

import Antifurto from '../classes/Antifurto.js';

import colors from '../res/colors.js';

var listaAntifurto = [];
listaAntifurto.push(new Antifurto('Placeholder', 'Erika', '323232232', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Cristian', '323232232', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Miki', '234234234', "000000", 6));
listaAntifurto.push(new Antifurto('Placeholder', 'Sara e Alessia', '234234234', "0000", 4));
listaAntifurto.push(new Antifurto('Placeholder', 'Florence', '234234234', "0000", 4));
listaAntifurto.push(new Antifurto('Placeholder', 'Clarence', '234234234', "0000", 4));

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
      statoSelezione: "scegliAntifurto",
    };
  }

  static navigationOptions = {
    title: "Aggiungi nuovo",

    headerStyle: {
      backgroundColor: colors.bgDark,
    },

    headerTintColor: '#fff',
  };

  nextAntifurto = async() => {
    if (this.state.index < listaAntifurto.length - 1) {
      await this.setState({ index: this.state.index + 1});
    } else {
      await this.setState({ index: 0 });
    }
    var src = listaAntifurto[this.state.index].src;
    var modello = listaAntifurto[this.state.index].modello;
    var prefisso = listaAntifurto[this.state.index].prefisso;
    var dimensionePin = listaAntifurto[this.state.index].dimensionePin;
    await this.setState({
      modelloAntifurto: modello,
      srcAntifurto: src,
      prefisso: prefisso,
      dimensionePinAntifurto: dimensionePin,
    });
  }

  prevAntifurto = async() => {
    if (this.state.index > 0) {
      await this.setState({ index: this.state.index - 1});
    }
    else {
      await this.setState({ index: listaAntifurto.length - 1 });
    }
    var src = listaAntifurto[this.state.index].src;
    var modello = listaAntifurto[this.state.index].modello;
    var prefisso = listaAntifurto[this.state.index].prefisso;
    var dimensionePin = listaAntifurto[this.state.index].dimensionePin;
    await this.setState({
      modelloAntifurto: modello,
      srcAntifurto: src,
      prefisso: prefisso,
      dimensionePinAntifurto: dimensionePin,
    });
  }

  isWhiteListed = () => {
    if (this.state.modelloAntifurto == "Clarence") return false;
    if (this.state.modelloAntifurto == "Florence") return false;
    return true;
  }

  gotosHomeStore = () => {
    if (Platform.OS === 'android') {
      Linking.openURL("https://play.google.com/store/apps/details?id=com.ctd.ws1n");
    }
    if (Platform.OS === 'ios') {
      Linking.openURL("https://itunes.apple.com/us/app/s-home/id1130238950?mt=8");
    }
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
    if (this.state.statoSelezione == "scegliAntifurto" && this.isWhiteListed()) {
      return (
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18, margin: 25}}>Selezionare il modello di antifurto da configurare</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => this.nextAntifurto()} underlayColor={colors.transparent}>
              <Image
                style={styles.antifurtoImage}
                source={this.state.srcAntifurto}
              />
            </TouchableHighlight>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18}}>{this.state.modelloAntifurto}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableHighlight style={styles.lockIcon} onPress={() => this.prevAntifurto()} underlayColor={colors.transparent}>
              <View>
                <Image
                  style={styles.lockIconImage}
                  source={require("../assets/left.png")}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.lockIcon} onPress={() => this.nextAntifurto()} underlayColor={colors.transparent}>
              <View>
                <Image
                  style={styles.lockIconImage}
                  source={require("../assets/right.png")}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.bottom}>
            <Button
              title="Avanti"
              color={Platform.OS === 'android' ? colors.bgDark : '#fff'}
              style={{borderRadius: 20}}
              onPress={() => this.setState({ statoSelezione : "immettiDati" })}
            />
            <Button
              title="Esci"
              color='#fd1d1d'
              style={{borderRadius: 20}}
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    }

    if (this.state.statoSelezione == "scegliAntifurto" && !this.isWhiteListed()) {
      return(
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18, margin: 25}}>Per poter configurare questo antifurto, è necessario scaricare l'applicazione S-HOME</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => this.nextAntifurto()} underlayColor={colors.transparent}>
              <Image
                style={styles.antifurtoImage}
                source={this.state.srcAntifurto}
              />
            </TouchableHighlight>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18}}>{this.state.modelloAntifurto}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableHighlight style={styles.lockIcon} onPress={() => this.prevAntifurto()} underlayColor={colors.transparent}>
              <View>
                <Image
                  style={styles.lockIconImage}
                  source={require("../assets/left.png")}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.lockIcon} onPress={() => this.nextAntifurto()} underlayColor={colors.transparent}>
              <View>
                <Image
                  style={styles.lockIconImage}
                  source={require("../assets/right.png")}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.bottom}>
            <Button
              title="Scarica S-Home"
              color='#f37a00'
              style={{borderRadius: 20, marginBottom: 20}}
              onPress={() => this.gotosHomeStore()}
            />
            <Button
              title="Esci"
              color='#fd1d1d'
              style={{borderRadius: 20}}
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    }

    if (this.state.statoSelezione == "immettiDati") {
      return(
        <View style={styles.container}>
          <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: '#fff', fontSize: 18}}>
              Stai configurando l'antifurto {this.state.modelloAntifurto}
            </Text>
            <Text style={{color: '#fff', fontSize: 18}}>Nome</Text>
            <TextInput
              onChangeText={(text) => this.setState({_nome: text})}
              style={{color: '#fff', fontSize: 18, borderWidth: 1, borderRadius: 10, borderColor: '#fff', width: 200, margin: 10}}
            />
            <Text style={{color: '#fff', fontSize: 18}}>Numero di telefono</Text>
            <TextInput
              style={{borderColor: '#fff'}}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({_numero: text})}
              style={{color: '#fff', fontSize: 18, borderWidth: 1, borderRadius: 10, borderColor: '#fff', width: 200, margin: 10}}
            />
            <Text style={{color: '#fff', fontSize: 18}}>Pin antifurto ({this.state.dimensionePinAntifurto} cifre)</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => this.setState({_pin: text})}
              style={{color: '#fff', fontSize: 18, borderWidth: 1, borderRadius: 10, borderColor: '#fff', width: 200, margin: 10}}
            />
          </View>

          <View style={styles.bottom}>
            <Button
              title="Aggiungi"
              color={Platform.OS === 'android' ? colors.bgDark : '#fff'}
              style={{borderRadius: 20, marginBottom: 20}}
              onPress={() => this.addAntifurto()}
            />
            <Button
              title="Esci"
              color='#fd1d1d'
              style={{borderRadius: 20}}
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    }
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
    flex: 2,
    width: 400,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'stretch'
  },
  lockIconImage: {
    width: 35,
    height: 35,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: 20,
    borderColor: colors.bgDark,
    borderWidth: 1,
    margin: 10,
    elevation: 5,
  },
});
