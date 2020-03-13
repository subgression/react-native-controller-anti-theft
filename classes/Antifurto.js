const Images = {
  Erika: require('../assets/erika.png'),
  Cristian: require('../assets/cri.png'),
  Miki: require('../assets/miki.png'),
  Sara: require('../assets/sara.png'),
  Florence: require('../assets/florence.png'),
  Clarence: require('../assets/clearance.png')
};

class Antifurto {
  nome: string;
  modello: string;
  numero: int;
  src: string;
  pin: int;
  dimensionePin: int;

  constructor(nome, modello, numero, pin, dimensionePin) {
    this.nome = nome;
    this.modello = modello;
    this.numero = numero;
    if (modello == "Sara e Alessia") {
      this.src = Images["Sara"];
    }
    else {
      this.src = Images[modello];
    }
    this.pin = pin;
    this.dimensionePin = dimensionePin;
  }

  getNome = () => {
    return this.nome;
  }

  toJSON = () => {
    var json = {
      "nome" : this.nome,
      "numero" : this.numero,
      "modello" : this.modello,
      "src" : this.src,
      "pin" : this.pin,
      "dimensionePin" : this.dimensionePin
    };
    return JSON.stringify(json);
  }

  generaCodice = (stato) => {
    if (this.modello == "Sara e Alessia") {
      return this.pin + stato;
    }
    if (this.modello == "Erika") {
      return this.pin + "#" + stato + "#";
    }
    if (this.modello == "Miki") {
      return this.pin + "#" + stato + "#";
    }
    if (this.modello == "Cristian") {
      return this.pin + stato;
    }
  }
}

export default Antifurto
