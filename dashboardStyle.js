import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  //sections
  dashboard: {
    padding:20,
  },
  matchesBox: {
    width:"100%",
    margin: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  matchesChats: {
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius: "5px",
    padding:5,
  },
  chatBox: {
    marginLeft:10,
    width:"100%",
    height:"75px",
    justifyContent:"center",

  },
  
  imgBox: {
    width: "75px",
    height: "75px", 
    padding: 10,
    borderRadius: "50%",
    marginRight: 10,
    border: "4px solid grey"
  },
  imgChat: {
    width: "75px",
    height: "75px", 
    padding: 10,
    borderRadius: "50%",
    border:"1px solid grey"
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
  matchText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#3c3c3c",
  },
  mmsgText: {
    fontSize: 16,
    fontWeight: 400,
    color: "#a7a7a7",
  },
});

export default styles;
