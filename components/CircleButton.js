import React, {Component} from 'react';
import { TouchableHighlight, Image, Linking, StyleSheet } from 'react-native'

import colors from '../res/colors.js'

export default class CircleButton extends Component {

  constructor(props) {
    super(props);
  }

  openURL = () => {
    Linking.openURL(this.props.link)
  }

  render() {
    return (
      <TouchableHighlight style={styles.circle} onPress={() => this.openURL()} underlayColor={colors.transparent}>
        <Image style={styles.img} source={this.props.src} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 30,
    height: 30,
  }
})
