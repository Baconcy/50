import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import $ from 'jquery'
@IonicPage()
@Component({
  selector: 'page-rentsaleadd',
  templateUrl: 'rentsaleadd.html',
})
export class RentsaleaddPage {

 public city;
  public cityName = '西安'
  public cityCode;
  public area;
  public areaCode;
  public aa;
  public Code;
  public RSadd = {
    type: '1',
    title: '',
    space: '',
    room: '',
    restroom: '',
    halls: '',
    priceMin: '0',
    priceMax: '',
    phone: '',
    nature: '1',
    district: '',
    describe: '',
    contacts: '',
    street: '',
    region: '',
    city: '',
  }
  citys = ["北京", "天津", "石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "衡水", "廊坊", "沧州", "太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州",
    "临汾", "吕梁", "呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒盟", "阿拉善盟", "沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东",
    "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛", "长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治州", "哈尔滨", "齐齐哈尔", "鸡西",
    "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭地区", "上海", "南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城",
    "扬州", "镇江", "泰州", "宿迁", "杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "舟山", "衢州", "金华", "台州", "丽水", "合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵",
    "安庆", "黄山", "滁州", "阜阳", "宿州", "巢湖", "六安", "亳州", "池州", "宣城", "福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德", "南昌", "景德镇", "萍乡",
    "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶", "济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州",
    "聊城", "滨州", "菏泽", "郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "济源", "武汉",
    "黄石", "十堰", "宜昌", "襄樊", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州", "仙桃", "潜江", "天门", "神农架林区", "长沙", "株洲", "湘潭",
    "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家族苗族自治州", "广州", "韶关", "深圳", "珠海", "汕头", "佛山", "江门", "湛江", "茂名", "肇庆",
    "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮", "南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色"
    , "贺州", "河池", "来宾", "崇左", "海口", "三亚", "五指山", "琼海", "儋州", "文昌", "万宁", "东方", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县",
    "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县", "西沙群岛", "南沙群岛", "中沙群岛的岛礁及其海域", "重庆", "成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江",
    "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州", "贵阳", "六盘水", "遵义", "安顺", "铜仁地区", "黔西南布依族苗族自治州",
    "毕节地区", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "思茅", "临沧", "楚雄彝族自治州", "红河哈尼族彝族自治州",
    "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "拉萨", "昌都地区", "山南地区", "日喀则地区", "那曲地区", "阿里地区", "林芝地区",
    "西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛", "兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳", "定西", "陇南",
    "临夏回族自治州", "甘南藏族自治州", "西宁", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州", "银川", "石嘴山", "吴忠", "固原",
    "中卫", "乌鲁木齐", "克拉玛依", "吐鲁番地区", "哈密地区", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州",
    "塔城地区", "阿勒泰地区", "石河子", "阿拉尔", "图木舒克", "五家渠", "台北", "高雄", "基隆", "台中", "台南", "新竹", "嘉义", "台北县", "宜兰县", "桃园县", "新竹县", "苗栗县", "台中县", "彰化县",
    "南投县", "云林县", "嘉义县", "台南县", "高雄县", "屏东县", "澎湖县", "台东县", "花莲县", "中西区", "东区", "九龙城区", "观塘区", "南区", "深水埗区", "黄大仙区", "湾仔区", "油尖旺区", "离岛区", "葵青区", "北区",
    "西贡区", "沙田区", "屯门区", "大埔区", "荃湾区", "元朗区", "澳门特别行政区", "海外"];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public config: ConfigProvider,
    public http: Http, public loadingCtrl: LoadingController) {
  }
  ionViewWillEnter() {
    if (this.storage.get('token')) {
    } else {
      this.navCtrl.push(LoginPage);
    }
    if (this.navParams.get('item')) {
      this.RSadd = this.navParams.get('item')
      console.log(this.navParams.get('item'))
      this.ifontime(this.RSadd.type)
      // if(this.RSadd.nature == '1'){
      //  $("input[name='radiofang']").eq(0).attr("checked","checked");
      //   }else if(this.RSadd.nature=='2'){
      //  $("input[name='radiofang']").eq(1).attr("checked","checked");
      //  }
      this.RSadd.priceMin = "0"
    }else{
      this.ifontime(1);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RentsaleaddPage');
  }
  ifontime(type) {
    this.RSadd.type = type;
    $("#typediv ul li").removeAttr("class");
    var span = "#typediv ul li:nth-of-type(" + type + ")"
    $(span).attr("class", "activety");

    if (type == 1 || type == 3) {
      $('.fang').css('display', 'block');
      $('.zu').css('display', 'none');
    } else if (type == 2 || type == 4) {
      $('.zu').css('display', 'block');
      $('.fang').css('display', 'none');
    }
  }

  getRSInfo() {
   if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.RSadd.phone))){
      alert('请输入正确的手机号码');
      return;
    }
    if (!this.navParams.get('item')) {  //判断添加还是修改
      var j = 3;
      let loading = this.loadingCtrl.create({
        showBackdrop: true,
      });
      loading.present();
      var data = {
        "token": this.storage.get("token"),
        "type": this.RSadd.type,
        "title": this.RSadd.title,
        "space": this.RSadd.space,
        "room": this.RSadd.room,
        "restroom": this.RSadd.restroom,
        "halls": this.RSadd.halls,
        "priceMin": this.RSadd.priceMin,
        "priceMax": this.RSadd.priceMax,
        "phone": this.RSadd.phone,
        "nature": this.RSadd.nature,
        "district": this.RSadd.district,
        "describe": this.RSadd.describe,
        "contacts": this.RSadd.contacts,
        "street": this.RSadd.street,
        "region": this.RSadd.region,
        "city": this.RSadd.city,
      }
      var api = this.config.apiUrl + "/api/rental/add";
      this.http.post(api, data).map(res => res.json()).subscribe(data => {
        loading.dismiss();
        if (data.errcode === 0 && data.errmsg === 'OK') {
          this.navCtrl.pop();
        } else if (data.errcode === 40002) {
          j--
          if(j>0){
            this.config.doDefLogin();
            this.getRSInfo();
          }          
        } else {
          alert(data.errmsg);
        }
      });
    } else {
      var j = 3;
      let loading = this.loadingCtrl.create({
        showBackdrop: true,
      });
      loading.present();
      var data = {
        "token": this.storage.get("token"),
        "type": this.RSadd.type,
        "title": this.RSadd.title,
        "space": this.RSadd.space,
        "room": this.RSadd.room,
        "restroom": this.RSadd.restroom,
        "halls": this.RSadd.halls,
        "priceMin": this.RSadd.priceMin,
        "priceMax": this.RSadd.priceMax,
        "phone": this.RSadd.phone,
        "nature": this.RSadd.nature,
        "district": this.RSadd.district,
        "describe": this.RSadd.describe,
        "contacts": this.RSadd.contacts,
        "street": this.RSadd.street,
        "region": this.RSadd.region,
        "city": this.RSadd.city,
      }
      var api = this.config.apiUrl + "/api/rental/edit";
      console.log(data)
      console.log("ghl")
      this.http.post(api, data).map(res => res.json()).subscribe(data => {
        loading.dismiss();
        if (data.errcode === 0 && data.errmsg === 'OK') {
          this.navCtrl.pop();
        } else if (data.errcode === 40002) {
          this.getRSInfo();
        } else {
          alert(data.errmsg);
        }
      });
    }
  }

  //获取城代码
  getCityCode() {
    var index = $.inArray(this.city, this.citys);
    if (index < 0) {
      alert("请输入正确的城市名称");
      this.city="";
      return;
    }
    var api = this.config.apiUrl + '/api/rental/getCity?cityName=' + this.city;
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode == 0 && data.errmsg == 'OK') {
        console.log(data)
        this.cityCode = data.model;
        this.RSadd.city = this.cityCode.code;
        this.getAreaCode();
      } else {
        alert(data.errmsg);
      }
    })
  }
  //获取区代码
  getAreaCode() {
    var api = this.config.apiUrl + '/api/rental/arealist?pId=' + this.RSadd.city;
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode == 0 && data.errmsg == 'OK') {
        this.areaCode = data.list;
      } else {
        alert(data.errmsg);
      }
    })
  }
  getCode() {
    var api = this.config.apiUrl + '/api/rental/arealist?pId=' + this.RSadd.region;
    this.http.get(api).map(res => res.json()).subscribe(data => {
      if (data.errcode == 0 && data.errmsg == 'OK') {
        this.Code = data.list;
      } else {
        alert(data.errmsg);
      }
    })
  }

  backTo() {
    this.navCtrl.pop();
  }
}
