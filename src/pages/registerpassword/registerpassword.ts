import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {

  public num:number ;   /*倒计时的数量*/
  public isShowSend=true;   /*是否显示发送验证码的按钮*/
  public registerinfo = {
    userTel:'',
    userName:'',
    regist:'',
    rpassword:'',
    password:'',
    ckecked:false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider,public storage:StorageProvider,
      public config:ConfigProvider,public http: Http) {

  }

  ionViewWillLoad() {
    this.getRem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }

  agreeSheet(){
    document.getElementById('background').style.display = "block";  
  }

  closePopup(){
    document.getElementById('background').style.display = "none";
  }

  enSureStop(){
    this.registerinfo.ckecked = true;
  }

  //注册信息发送
  doRegister(){
      if(this.registerinfo.password!=this.registerinfo.rpassword){
        alert('确认密码和密码不一样');
      }else if(this.registerinfo.password.length<6){
        alert('密码长度不能小于6位');
      }else{
        var api = this.config.apiUrl + '/api/user/register?userName=' + this.registerinfo.userName + "&userPwd=" + this.registerinfo.password +
        "&mobile=" + this.registerinfo.userTel + "&code=" + this.registerinfo.regist;
        this.http.get(api).map(res => res.json()).subscribe(data =>{
          if (data.errcode === 0 && data.errmsg === 'OK') {
            this.storage.set('userName',data.model.loginname);
            this.storage.set('password',this.registerinfo.password);
            this.storage.set('token',data.model.token);
            this.storage.set('username1',data.model.username);
            this.navCtrl.popToRoot(); /*回到根页面*/
          } else {
            alert(data.errmsg);
          }
        })
      }

  }

  //发送验证码
  ownRegist(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.registerinfo.userName))){
      alert('请输入正确的手机号码');
      return;
    }
    var tel = this.registerinfo.userName
    var data= {
      "mobile": tel
    }
    console.log(JSON.stringify(data))
    var api = this.config.apiUrl + '/api/vcode/register';
    this.http.post(api,JSON.stringify(data)).map(res => res.json()).subscribe(data =>{
      if (data.errcode === 0 && data.errmsg === 'OK') {
        this.num = 60;
        this.isShowSend = false;
        this.doTimer();  /*倒计时*/
      } else {
        alert(data.errmsg);
      }
    })
  }
  //倒计时的方法
  doTimer(){
    var timer=setInterval(()=>{
          --this.num; 
          if(this.num==0){
              clearInterval(timer);
              this.isShowSend=true;
          }
    },1000)
  }

  getRem(){
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (w / 750 * 115) + 'px';
  }
}


