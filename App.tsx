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
    flexDirection:"column"
  };
  useEffect(() => {
    getData().then((result) => {
      let data = result.data.users;
      let oldest = data
        .map((item: any) => item.age)
        .sort((a: any, b: any) => b - a)
        .slice(0, 10);
      console.log("oldest", oldest);
      let oldestTen = data.filter((item: { age: number }) => oldest.includes(item.age))
      console.log(
        "result oldestTen",
        oldestTen
      );
      let heightData = oldestTen.filter((item: { height: number }) => item.height<170)
      console.log(
        "result heightData",
        heightData
      );
      setData(oldestTen);
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
        {/* <Header /> */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
    paddingHorizontal: 8,
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
    width:250,
    maxWidth: "45%",
    height: 100,
    borderWidth:1,
    borderColor:"#f0f0f0"
  },
});

export default App;
