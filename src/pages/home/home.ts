import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { pydic,find } from '../home/translib';

@Component({
  selector: 'page-home',
  templateUrl:'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  transOuput = (FirstName: string,Name: string) => {
    this.cleanHtml();
    if(FirstName){
      this.trans(FirstName," ");
      document.getElementById('NationalFirstStyle').innerHTML += ',';
      document.getElementById('ChinesePinyin').innerHTML += ',';
      document.getElementById('GeneralPinyin').innerHTML += ',';
      document.getElementById('NationalSecondStyle').innerHTML += ',';
      document.getElementById('WG').innerHTML += ',';
    }
    if(Name){
      this.trans(Name,"-");
    }
  }

  trans = (name: string,divdual:string) => {
    let s:number;
    let temp:string = '';
    for(let i=0;i<name.length;i++){
      if(pydic.indexOf(name.charAt(i))!=-1&&name.charCodeAt(i)>200){
        s=1;//第一個字開始
        temp = '';
        while(pydic.charAt(pydic.indexOf(name.charAt(i))+s)!=","){
          temp +=pydic.charAt(pydic.indexOf(name.charAt(i))+s);
          s++;
        }
        temp = temp.trim().toUpperCase();
        let result = find[Object.keys(find)[Object.keys(find).indexOf(temp)]];
        let NationalFirstStyle = result[0];
        let GeneralPinyin = result[1];
        let NationalSecondStyle = result[2];
        let WG = result[3];
        
        if(i+1 !== name.length){
          temp +=divdual;
          GeneralPinyin +=divdual;
          NationalSecondStyle +=divdual;
          WG +=divdual;
        }

        if(temp === "LYU"){
          temp = "LU";
        }
        document.getElementById('NationalFirstStyle').innerHTML += '( ' + NationalFirstStyle + ' )';
        document.getElementById('ChinesePinyin').innerHTML += temp;
        document.getElementById('GeneralPinyin').innerHTML += GeneralPinyin;
        document.getElementById('NationalSecondStyle').innerHTML += NationalSecondStyle;
        document.getElementById('WG').innerHTML += WG;
        
      }
    }
  }

  cleanHtml = () => {
    document.getElementById('NationalFirstStyle').innerHTML = '';
    document.getElementById('ChinesePinyin').innerHTML = '';
    document.getElementById('GeneralPinyin').innerHTML = '';
    document.getElementById('NationalSecondStyle').innerHTML = '';
    document.getElementById('WG').innerHTML = '';
  }
}
