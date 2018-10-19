 import axios from 'axios'
 import qs from 'qs'
 import md51 from './md51'

//axios.defaults.baseURL = 'http://47.94.40.214:8083';

axios.defaults.baseURL = 'https://teacherapi.gaosiedu.com/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

 export default function request(option,success,fail){
    let sign, url;
    let header = {'Content-Type': 'application/x-www-form-urlencoded'}
    if(option.query){
       option.query = sortQuery(option.query);
    }
    if(option.type=="get"){
      sign = md51.md5(option.query + 'test');
      header = {'Content-Type': 'application/json;charset=utf-8'}
    }else if(option.type=="post"){
      // console.log(option.data)
      sign = md51.md5(option.query+'&'+ option.data +'test')
    }

    option.query = option.query +'&sign='+sign;
    url =  option.api + '?' + option.query;
      
    axios({  
      url: url,
      method: option.type,
      data: option.data,
      headers: header,

    }).then(function(res){
      success(res)
    })
};

function sortQuery(obj){
  // 先获取所有属性名
  var keys = [];
  for (var key in obj){
    keys.push(key);
  }
  // 排序
  keys.sort();
  // 导出新的对象
  var r = {};
  for (var i = 0; i < keys.length; i++){
    key = keys[i];
    r[key] = obj[key];
  }
  // 将排序好的对象转为请求参数
  var str = '';
  for(var k in r){
    str += k+'='+r[k]+'&'
  }
  return str.substr(0,str.length-1);
};