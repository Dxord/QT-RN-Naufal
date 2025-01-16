import axios from "axios";
import type { PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [data, setData] = useState<any[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    flexDirection:"column",
  };
  useEffect(() => {
    getData().then((result) => {
      let data = result.data.users;
      let heightData = data.filter((item: { height: number }) => item.height<170)
      console.log(
        "result heightData",
        heightData
      );
      let oldest = heightData
        .map((item: any) => item.age)
        .sort((a: any, b: any) => b - a)
        .slice(0, 10);
      console.log("oldest", oldest);
      
      let oldestTen = heightData.filter((item: { age: number }) => oldest.includes(item.age))
      console.log(
        "result oldestTen",
        oldestTen
      );
     
      setData(oldestTen.slice(0, 10));
    });
  }, []);
  const getData = async () => {
    return await axios.get("https://dummyjson.com/users?limit=100");
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
    alignItems:"center"
            },
          ]}
        >
          {data != null &&
            data.length > 0 &&
            data.map((item: any, index: React.Key) => {
              return (
                <TouchableOpacity key={index} style={[styles.grid, styles.row]}>
                  <Image src={item.image} style={styles.avatar} />
                  <View style={{ marginLeft: 4 }}>
                    <Text style={styles.text}>
                      Nama : {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.text}>Usia : {item.age}</Text>
                    <Text style={styles.text}>Tinggi : {item.height}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'space-between'
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  grid: {
    padding:8,
    width:250,
    maxWidth: "47.5%",
    borderWidth:1,
    borderColor:"#f0f0f0"
  },
});

export default App;
