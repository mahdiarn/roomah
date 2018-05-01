import { Constants } from 'expo';

const Style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0fF',
    textAlign: 'center',
    flexGrow: 1
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInfoKPRHijau: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    marginBottom:40,
    marginTop:40,
    color: 'green',
  },
  textInfoKPRMerah: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    marginBottom:40,
    marginTop:40,
    color: 'red',
  }
}

export default Style