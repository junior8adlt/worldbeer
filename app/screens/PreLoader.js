import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Text, Image} from 'react-native';
import {Font} from 'expo';
export default class PreLoader extends Component {
  constructor(){
    super();
    this.state={
      fontLoaded: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'campus': require('../../assets/fonts/campus.ttf')
    }).then(() => {
      this.setState({fontLoaded: true})
    })
  }
  render(){
    return(
      <View style={styles.preLoaderView}>
         <Image
        source={require('../../assets/img/beer.png')}
        style={{width: 350, height: 350}}
        />
        {this.state.fontLoaded == true ? (
        <Text style={styles.parrafo2}>
          WORLD BEER
        </Text>

      ) : (<Text  style={styles.parrafo1}></Text>)
      }
       {this.state.fontLoaded == true ? (
      <Text style={styles.parrafo3}>
         Designed By Alberto Ochoa
       </Text>

      ) : (<Text  style={styles.parrafo1}></Text>)
      }
      <ActivityIndicator size="large" color="#F7B048" />
      <Text style={styles.fetch}>Fetching Data..</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
preLoaderView:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#463C3B',
  marginTop: -300
},
parrafo1: {
  margin: 24,
  fontSize: 18,
  textAlign: 'center',
  color: '#fff'
},
parrafo2: {
  fontSize: 62,
  textAlign: 'center',
  color: '#F7B048',
  fontFamily: 'campus',
  marginTop: -100,
},
parrafo3: {
  fontSize: 25,
  textAlign: 'center',
  color: '#F7B048',
  fontFamily: 'campus',
  position: 'absolute',
  bottom: 0
},
fetch: {
  fontSize: 20,
  color: '#F7B048',
  fontWeight: 'bold',
}
});
