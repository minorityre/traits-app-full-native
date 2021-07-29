import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
  },
  area: {
    margin: 0,
    flex: 1,
    paddingBottom: 20,
    padding: "10%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:"-10vh",
    backgroundColor:"white",

  },
  heading: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 22,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 600,
    color: "#424242",
  },
  inputDesc: {
    fontSize: 16,
    fontWeight: 500,
    color: "#848484",
    marginTop: 24,
  },
  logo: {
    width: "100%",
    height: "40vh",
    
  },
  register: {
    flex: 3,
    paddingBottom: 20,
  },
  login: {
    flex: 3,
    paddingBottom: 20,
  },
  center: {
    textAlign: "center",
  },
  textInput: {
    fontFamily: "FontAwesome",
  },
  loginSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: "#f1f3f2",
    borderRadius: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginIcon: {
    paddingLeft: 30,
    color: "grey",
  },
  loginInput: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: "black",
    paddingRight: 10,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 24,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
});

export default styles;
