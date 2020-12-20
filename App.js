import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';

// const {width} = Dimensions.get('window').width

export default function App() {
  const [ users, setUsers ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      }) 
  }, []);

  if(loading){
    return <View style={styles.center}>
      <Text>Cargando...</Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <FlatList 
        data={users}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => String(item.id)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 22,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
   },
   center: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
});
