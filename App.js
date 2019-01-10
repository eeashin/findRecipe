import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Image } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [], ingrid: '' };
  }

  findRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingrid;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ recipes: responseJson.results });
      })
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.title}
          renderItem={({ item }) =>
            <View>
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
              <Image
                source={{ url: item.thumbnail }}
                style={{ width: 70, height: 60 }}
              />
            </View>}
          data={this.state.recipes}
          ItemSeparatorComponent={this.listSeparator} />

        <TextInput style={{ fontSize: 18, width: 200 }} placeholder='Ingridients Name' onChangeText={(ingrid) => this.setState({ ingrid})} />
        <Button title="Find" onPress={this.findRecipes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
