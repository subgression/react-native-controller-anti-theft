import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  Button,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';

import Antifurto from '../classes/Antifurto.js';

import colors from '../res/colors.js';

let lista = [];

class List extends Component {

  constructor(props) {
    super(props);
    this.state = { isListEmpty : true };
  }

  componentDidMount = () => {
    //Aggiungo il listener sul focus (quando si ritorna alla schermata MainScreen, si otterrà il focus del componente)
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => this.getDataOnFocus());
  }

  getDataOnFocus = async() => {
    await this.getData();
    if (lista.length != '0') {
      this.setState({ isListEmpty : false });
    }
    else {
      this.setState({ isListEmpty : true });
    }
  }

  removeAntifurto = async(antifurto) => {
    await this.getData();
    if (lista.length != '0') {
      for (let i = 0; i < lista.length; i++) {
        if (antifurto.nome == lista[i].nome) {
          lista.splice(i, 1);
          await this.saveData();
          return;
        }
      }
    }
  }

  addAntifurto = async(antifurto) => {
    if (antifurto === null) {
      alert("Errore nell'aggiunta dell'antifurto, riprovare prego");
      return;
    }
    await this.getData();
    lista.push(antifurto);
    await this.saveData();
  }

  saveData = async() => {
    try {
      let l = lista.length;
      await AsyncStorage.setItem('conteggio', l.toString());
      for (var i = 0; i < lista.length; i++) {
        await AsyncStorage.setItem('antifurto' + i, lista[i].toJSON());
      }
    }
    catch (error) {
      alert(error);
    }
  }

  getData = async() => {
    try {
      const c = await AsyncStorage.getItem('conteggio');
      if (c !== null) {
        lista = [];
        for (let i = 0; i < c; i++) {
          entry = await AsyncStorage.getItem('antifurto' + i);
          if (entry !== null) {
            parse = JSON.parse(entry);
            lista.push(new Antifurto(parse.nome, parse.modello, parse.numero, parse.pin, parse.dimensionePin));
          }
        }
      }
      else {
        //alert("Configura l'antifurto usando il bottone");
      }
    } catch (error) {
      alert("Errore nell'acquisizione dei dati: " + error);
    }
  }

  destroyData = async() => {
    await AsyncStorage.clear();
  }

  getList = () => {
    var output = [];

    for (let i = 0; i < lista.length; i++) {
      output.push(
        <View key={i} style={styles.list}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate("Control", { a: lista[i]})} underlayColor={colors.transparent}>
            <ImageBackground source={lista[i].src} style={{width: '100%', height: '100%', resizeMode: 'contain'}}>
              <View style={styles.listHeading}>
                <Text style={styles.entryName}>
                  {lista[i].nome}
                </Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View>
        <ScrollView>
          {output}
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.state.isListEmpty) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Non hai ancora configurato un antifurto, configuralo ora!</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}> I tuoi antifurti </Text>
          {this.getList()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    width: '100%',
    color: '#ffffff',
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontSize: 25,
  },
  entryName: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  entryNumber: {
    color: '#ffffff',
  },
  list: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 150,
    marginTop: 2,
    marginBottom: 2,
    elevation: 1,
  },
  listHeading: {
    height: "30%",
    flex: 1,
    backgroundColor : 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    bottom: 0,
  }
});

export default List
