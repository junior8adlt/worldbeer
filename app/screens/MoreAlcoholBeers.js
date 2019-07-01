import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Font } from "expo";
import PreLoader from "./PreLoader";

export default class MoreAlcoholBeers extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      fontLoaded: false,
      preloader: false,
      loadMore: false,
      page: 1,
      numberPages: 1,
      flag: false
    };
  }

  componentDidMount() {
    Font.loadAsync({
      rock: require("../../assets/fonts/Rock.otf"),
      sugar: require("../../assets/fonts/Sugar.otf")
    }).then(() => {
      this.setState({ fontLoaded: true });
    }),
      fetch(
        "http://api.brewerydb.com/v2/beers/?key=d24ec48f42cec3e71dbb13fda0517a5b&abv=8,12",
        {
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataSource: responseJson.data,
            preloader: true,
            numberPages: responseJson.numberOfPages
          });
          console.log(responseJson.numberOfPages);
        });
  }

  loadMoreData = async () => {
    this.state.page++;
    fetch(
      "http://api.brewerydb.com/v2/beers/?key=d24ec48f42cec3e71dbb13fda0517a5b&abv=8,12&p=" +
        this.state.page,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        var helper = false;
        if (this.state.page === this.state.numberPages) {
          helper = true;
        }
        let nuevaLista = this.state.dataSource.concat(responseJson.data);
        this.setState({
          dataSource: nuevaLista,
          flag: helper
        });
      });
  };

  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };


  render() {
    if (this.state.preloader == false) {
      return <PreLoader />;
    } else {
      const { dataSource, flag } = this.state;
      var componentes = [];
      dataSource.forEach(value => {
        const auxiliar =
          value.labels != null
            ? value.labels.large
            : value.labels != undefined
            ? value.labels.large
            : "http://bosquelya.com/img/not-available.png";
        const descripcion =
          value.description != null
            ? value.description
            : value.description != undefined
            ? value.description
            : "Esta Cerveza No Posee Descripcion";
        componentes.push(
          <Card key={value.id} style={styles.mustaceBg}>
            <Card.Content>
              <Card.Cover
                source={{ uri: auxiliar }}
                style={{ marginBottom: 20, borderRadius: 20 }}
              />
              {this.state.fontLoaded == true ? (
                <Title style={styles.brownTitle}>{value.name}</Title>
              ) : (
                <Title style={styles.brownTitle2}>{value.name}</Title>
              )}
              <Paragraph style={styles.brownText}>{descripcion}</Paragraph>
              <Paragraph style={styles.abv}>ABV: {value.abv}%</Paragraph>
            </Card.Content>
          </Card>
        );
      });
      return (
        <View style={styles.viewBody}>
          <ScrollView style={styles.fixed}  ref={c => {
              this.scroll = c;
            }}>
            {/* Card */}

            {componentes}

            {this.state.fontLoaded == true && flag != true ? (
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require("../../assets/img/hand.png")}
                    style={{ width: 30, height: 40, marginRight: 70 }}
                  />
                )}
                mode="contained"
                style={styles.button}
                onPress={this.loadMoreData}
              >
                <Text style={styles.buttonText}>
                  Click Me To Load More Beers
                </Text>
              </Button>
            ) : null}
             <Button
              icon={() => (
                <Image
                  source={require("../../assets/img/arrow.png")}
                  style={{ width: 30, height: 40, marginRight: 70 }}
                />
              )}
              mode="contained"
              style={styles.button}
              onPress={this.goToTop}
            >
              <Text style={styles.buttonText}>Go to the top</Text>
            </Button>
            {/* End of the cards */}
          </ScrollView>
          <Button />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#463C3B"
  },
  textTop: {
    position: "absolute",
    top: 0,
    fontSize: 18,
    fontWeight: "bold",
    color: "#F7B048"
  },
  top10: {
    marginTop: 10
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mustaceBg: {
    backgroundColor: "#F7B048",
    color: "#463C3B",
    padding: 30,
    marginBottom: 20,
    marginTop: 20
  },
  brownTitle: {
    color: "#463C3B",
    textAlign: "center",
    fontFamily: "rock",
    fontSize: 35,
    paddingTop: 10
  },
  brownTitle2: {
    color: "#463C3B",
    textAlign: "center"
  },
  brownText: {
    color: "#463C3B",
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#F7B048",
    marginBottom: 20
  },
  buttonText: {
    color: "#463C3B",
    textAlign: "center",
    fontFamily: "abe",
    fontSize: 30,
    paddingTop: 10
  },
  abv: {
    color: "#E44134",
    textAlign: "center",
    fontFamily: "sugar",
    fontSize: 30,
    paddingTop: 30
  }
});
