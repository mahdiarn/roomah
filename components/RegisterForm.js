import React, { Component } from 'react';
import {  Alert, TextInput, View, StyleSheet, ActivityIndicator} from 'react-native';
import Touchables from './Touchables';

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = { nama: '', namaIbu: '', nik:'', tanggalLahir:'',isLoading: false, statusCode:'', cif_number: '', nomor_rekening: '' };
    
  }
  
  buatRekening(){
    let cif = this.state.cif_number;
    var details = {
    nomor_cif: cif,
    amount: '1',
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    var request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey':'a8AS6CMmDkGn8fpE0aUy0ETF5z90XsUs',
      },
      body: formBody
    };
    return fetch('http://mortgtech-eval-prod.apigee.net/btn-mortgtech/account-creation', request)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        nomor_rekening: responseJson.payload.nomor_rekening.toString(),
      }, function(){});
      let info = "Nomor Rekening : " + this.state.nomor_rekening;
      Alert.alert(info);
    })
    .catch((error) =>{
      console.error(error);
    });
    
    
  }
  
  _register() {
    let nama = this.state.nama;
    let tanggalLahir = this.state.tanggalLahir;
    let namaIbu = this.state.namaIbu;
    let nik = this.state.nik;
    
    var details = {
    nik: nik,
    nama: nama,
    tgl_lahir: tanggalLahir,
    nama_ibu_kandung: namaIbu,
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    var request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey':'a8AS6CMmDkGn8fpE0aUy0ETF5z90XsUs',
      },
      body: formBody
    };
    return fetch('http://mortgtech-eval-prod.apigee.net/btn-mortgtech/user-register', request)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
        statusCode: responseJson.statusCode.toString(),
      }, function(){});
      let statusKode = this.state.dataSource.statusCode.toString();
      if (statusKode === '200') {
        this.setState({
          cif_number: this.state.dataSource.payload.cif_number,
        }, function(){});
        this.buatRekening();
      } else if (statusKode === '500') {
        let info = this.state.dataSource.payload.errors[0].message;
        Alert.alert(info);
      }
    
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    return (
      <View>
        <TextInput
          style={styles.input}
          ref= {(el) => { this.nama = el; }}
          onChangeText={ nama => this.setState({ nama }) }
          value={this.state.nama}
          placeholder="Nama"
        />
        <TextInput
          style={styles.input}
          ref= {(el) => { this.tanggalLahir = el; }}
          onChangeText={ tanggalLahir => this.setState({ tanggalLahir }) }
          value={this.state.tanggalLahir}
          placeholder="Tanggal Lahir"
        />
        
        <TextInput
          style={styles.input}
          ref= {(el) => { this.nik = el; }}
          onChangeText={ nik => this.setState({ nik }) }
          value={this.state.nik}
          placeholder="NIK"
        />
        
        <TextInput
          style={styles.input}
          ref= {(el) => { this.namaIbu = el; }}
          onChangeText={ namaIbu => this.setState({ namaIbu }) }
          value={this.state.namaIbu}
          placeholder="Nama Ibu"
        />
        <Touchables text="Daftar" onPress={this._register.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
