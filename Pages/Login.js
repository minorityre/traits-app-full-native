import Axios from "axios";
import React from "react";
import "react-native-gesture-handler";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../loginStyle.js";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [userList, setUserList] = useState([]);
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [letsLogIn, setletsLogIn] = useState(true);

  const history = useHistory();

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3000/register", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      if (!response.data.auth) {
        setRegisterError(response.data.message);
        setLoginStatus(false);
        console.log(response);
      } else {
        setLoginStatus(true);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
        
        history.push({
          pathname: "/test",
        });
      }
    });
  };

  const login = () => {
    Axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
        setLoginStatus(true);
        history.push({
          pathname: "/dashboard",
        });
      }
      //console.log(response.data);
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const showUsers = () => {
    Axios.get("http://localhost:3000/users").then((response) => {
      setUserList(response.data);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/login").then((response) => {
      console.log(response.data);
      if (response.data.loggedIn == true) {
        setLoginStatus(true);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../media/img/hero1.jpg")}
        style={[styles.logo]}
        resizeMode={"cover"}
      />
      <View style={styles.area}>
        {!letsLogIn ? (
          <View style={[styles.register]}>
            <Text style={[styles.loginText]}>
              <b>Regístrate</b>
            </Text>
            <Text style={[styles.inputDesc]}>Nombre de usuario</Text>
            <View style={[styles.loginSection]}>
              <FontAwesomeIcon
                style={[styles.loginIcon]}
                size={18}
                icon={faUser}
              />
              <TextInput
                style={[styles.loginInput]}
                placeholder="Username"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </View>
            <Text style={[styles.inputDesc]}>Tu Email</Text>
            <View style={[styles.loginSection]}>
              <FontAwesomeIcon
                style={[styles.loginIcon]}
                size={18}
                icon={faEnvelope}
              />
              <TextInput
                style={[styles.loginInput]}
                placeholder="Email"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            </View>
            <Text style={[styles.inputDesc]}>Password</Text>
            <View style={[styles.loginSection]}>
              <FontAwesomeIcon
                style={[styles.loginIcon]}
                size={18}
                icon={faUnlockAlt}
              />
              <TextInput
                style={[styles.loginInput]}
                placeholder="Password"
                secureTextEntry={true}
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </View>
            <TouchableOpacity style={[styles.loginButton]} onPress={register}>
              <Text style={[styles.loginButtonText]}>Registrarme</Text>
            </TouchableOpacity>
            <Text style={[styles.error]}>{registerError}</Text>
          </View>
        ) : (
          <View style={[styles.login]}>
            <Text style={[styles.loginText]}>
              <b>Iniciar sesión</b>
            </Text>
            <Text style={[styles.inputDesc]}>Email</Text>
            <View style={[styles.loginSection]}>
              <FontAwesomeIcon
                style={[styles.loginIcon]}
                size={18}
                icon={faEnvelope}
              />
              <TextInput
                style={[styles.loginInput]}
                placeholder="ejemplo@gmail.com"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </View>

            <Text style={[styles.inputDesc]}>Password</Text>
            <View style={[styles.loginSection]}>
              <FontAwesomeIcon
                style={[styles.loginIcon]}
                size={18}
                icon={faUnlockAlt}
              />
              <TextInput
                style={[styles.loginInput]}
                secureTextEntry={true}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </View>

            <TouchableOpacity style={[styles.loginButton]} onPress={login}>
              <Text style={[styles.loginButtonText]}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => setletsLogIn(!letsLogIn)}>
          {letsLogIn ? (
            <Text style={styles.center}>
              ¿No estás registrado? <b>Crear cuenta</b>
            </Text>
          ) : (
            <Text style={styles.center}>
              ¿Ya tienes una cuenta? <b>Entrar</b>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
