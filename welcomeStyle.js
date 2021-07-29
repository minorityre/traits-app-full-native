import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  //sections
  header: {
    margin: 0,
    backgroundColor: "#fff",
    flex: 1,
  },
  sliderSection: {
    margin: 0,
    backgroundColor: "#fff",
    alignItems:"center",
    justifyContent:"center",
    flex: 2,
  },
  
  img: {
    width: "100%",
    height: "200px",
    marginBottom: 10
    
  },
  buttonSection: {
    margin: 0,
    backgroundColor: "#fff",
    alignItems:"flex-end",
    flexDirection:"initial",
    justifyContent:"center",
    flex: 1,
  },

  //Components
  title: {
    marginTop: "5%",
    fontSize: 40,
    fontWeight: 600,
    color: "#3c3c3c",
  },
  subtitle: {
    fontSize: 22,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 600,
    color: "#3c3c3c",
  },
  startButton: {
    backgroundColor: "black",
    paddingRight: 10,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 24,
    paddingLeft: 10,
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default styles;
