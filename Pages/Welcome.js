import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-native-gesture-handler";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import styles from "../welcomeStyle";

const Welcome = () => {
  let history = useHistory();
  const [start,setStart] = useState(false);
  const [next, setNext] = useState(0);
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={styles.header}>
        <Text style={[styles.title]}>
          Bienvenid@ a <b>Traits.</b>
        </Text>
      </View>

      {next == 0 && (
        <View style={styles.sliderSection}>
          <Image
            source={require("../media/img/welcome.jpg")}
            style={[styles.img]}
          />
          <Text style={[styles.subtitle]}>
            Define tu personalidad con un simple test.
          </Text>
        </View>
      )}
      {next == 1 && (
        <View style={styles.sliderSection}>
          <Image
            source={require("../media/img/hero.jpg")}
            style={[styles.img]}
          />
          <Text style={[styles.subtitle]}>
            Descubre y conoce personas afines a ti.
          </Text>
        </View>
      )}

      {next == 2 && (
        <View style={styles.sliderSection}>
          <Image
            source={require("../media/img/hero1.jpg")}
            style={[styles.img]}
          />
          <Text style={[styles.subtitle]}>
            Chatea y crea una conexión especial.
          </Text>
        </View>
      )}

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.startButton]}
          onPress={() => {
            setNext(next + 1);
            if (next == 1) {
              setStart(true);
            } 
            if (next > 1){
              history.push("/login");
            }
          }}
        >
          <Text style={[styles.startButtonText]}>
            {start ? "Empezar" : "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
