import React from 'react';
import { Image,  View, Text, ActivityIndicator, ScrollView, Button, } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Login from './screens/Login';
import Home from './screens/Home';
import { Card } from 'react-native-elements';
import Style from './styles/Style';
import Touchables from './components/Touchables';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'ROOMAH',
  };
  render() {
    return (
      <ScrollView style={Style.container}>
        <Card>
          <Home />
         <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </Card>
      </ScrollView>
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <ScrollView style={Style.container}>
        <Image
             style={{marginLeft: 55,width: 250, height: 250}}
              source={require('./assets/btn.png')}
            />
        <Card>
            
          <Login />
          <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        </Card>
      </ScrollView>
    );
  }
}
class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };
  render() {
    return (
      <ScrollView style={Style.container}>
        <Touchables text="Ajukan KPR" onPress={() => this.props.navigation.navigate('Pengajuan')} />
      </ScrollView>
    );
  }
}

class PengajuanScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://ussouthcentral.services.azureml.net/workspaces/e05e052b8a15476fa081614cb6bff057/services/ba1c4f5edbaf421e90f1745bcd728713/execute?api-version=2.0&format=swagger', {
        'method': 'POST',
        'headers': {
        'Authorization':'Bearer gH4oPRhi+JHbKxi2pQei0T/qganDbAyGoanLNbFD9+DUWdPIGvORkmWq0UQzikP7KIwzhJ8ZjHdvkS3GLneWYA==',
        },
        'body': JSON.stringify({
          'Inputs':{
            'input1': [
              {
                '1': '1',
                '2': '2',
                '4': '4',
                '6': '6',
                '67': '67',
                '1169': '1169',
                'A11': 'A11',
                'A34': 'A34',
                'A43': 'A43',
                'A65': 'A65',
                'A75': 'A75',
                'A93': 'A93',
                'A101': 'A101',
                '4 (2)': '4',
                'A121': 'A121',
                'A143': 'A143',
                'A152': 'A152',
                'A173': 'A173',
                'A192': 'A192',
                'A201': 'A201',
                '1 (2)': '1'
              }
            ]  
          },
          'GlobalParameters': {}
        }/*
        {
	'Inputs': {
		'input1': [
			{
				'1': '1',
				'2': '1',
				'4': '2',
				'6': '48',
				'67': '22',
				'1169': '5951',
				'A11': 'A12',
				'A34': 'A32',
				'A43': 'A43',
				'A65': 'A61',
				'A75': 'A73',
				'A93': 'A92',
				'A101': 'A101',
				'4 (2)': '2',
				'A121': 'A121',
				'A143': 'A143',
				'A152': 'A152',
				'A173': 'A173',
				'A192': 'A191',
				'A201': 'A201',
				'1 (2)': '2'
			}
		]
  },
 "GlobalParameters": {}
}*/),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.Results.output1[0]["Scored Labels"],
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    let hasil = this.state.dataSource
    if (hasil == '2') {
      return(
        <ScrollView style={Style.container}>
        <Image
             style={{marginLeft: 55,width: 250, height: 250}}
              source={require('./assets/btn.png')}
            />
          <Card styles={{ card: { backgroundColor: 'red' }}}>
            <Text style={Style.textInfoKPRMerah}>Credit Risk Anda Terbilang Buruk</Text>
          </Card>
        </ScrollView>
      );
    } else {
      return(
        <ScrollView style={Style.container}>
        <Image
             style={{marginLeft: 55,width: 250, height: 250}}
              source={require('./assets/btn.png')}
            />
          <Card style={Style.cards}>
            <Text style={Style.textInfoKPRHijau}>Credit Risk Anda Terbilang Baik</Text>
            <Touchables text="Input Data Pengajuan KPR" onPress={() => this.props.navigation.navigate('KPR')} />
          </Card>
          
        </ScrollView>
      );
    }
    
  }
}

class KPRScreen extends React.Component {
  static navigationOptions = {
    title: 'Input Data Pengajuan KPR',
  };
  render() {
    return (
      <ScrollView style={Style.container}>
        
        <Touchables text="Submit" onPress={() => this.props.navigation.navigate('Dashboard')} />
      </ScrollView>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Dashboard: {
      screen: DashboardScreen,
    },
    Pengajuan: {
      screen: PengajuanScreen,
    },
    KPR: {
      screen: KPRScreen,
    }
    
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
