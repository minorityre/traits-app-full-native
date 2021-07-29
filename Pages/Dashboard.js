import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../dashboardStyle.js";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [matchesList, setMatchesList] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3000/getMatchesByUser", {
      userId: user[0].id,
    }).then((response) => {
      console.log(response.data.result);
      setMatchesList(response.data.result);
    });
  }, []);

  console.log(user);
  console.log(matchesList);

  return (
    <View style={styles.dashboard}>
      <Text>Bienvenido {user[0].name}</Text>
      <Text>Nuevos Matches:</Text>

      <View style={styles.matchesBox}>
        {matchesList.map((val, key) => {
          return (
            <View key={key}>
              <Image
                source={require(`../media/img/${val.profileImg}`)}
                style={[styles.imgBox]}
              ></Image>
            </View>
          );
        })}
      </View>
      <Text>Chats</Text>
      {matchesList.map((val, key) => {
        return (
          <View key={key} style={styles.matchesChats}>
            <Image
              source={require(`../media/img/${val.profileImg}`)}
              style={[styles.imgChat]}
            ></Image>
            <View style={styles.chatBox}>
              <Text style={styles.matchText}><b>{val.name}</b></Text>
              <Text style={styles.mmsgText}>Tk venguita</Text>
            </View>
          </View>
        );
      })}
      
    </View>
  );
}

export default Dashboard;
