<template>
  <div class="evaluate evaluateShow">
    <header class="tac">
      <h3>{{showData.TeacherName}}老师</h3>
    </header>
    <main>
      <h4>合作班级</h4>
      <table class="table mt10 mb15">
      <tbody>
          <tr v-for="(item,index) in showData.AssistCommentResultList">
            <td v-html="item.ClassName"></td>
            <td v-html="item.PrintTime"> </td>
            <td v-html="item.LessonName"></td>
          </tr>
        </tbody>
      </table>
      <h4>请针对以上课次，对{{showData.TeacherName}}老师进行评价</h4>
      <form 
        @submit="checkForm"
        method="post"
        class="checkForm mt15"
        >
        <ul>
          <li class="input-group flex">
            <label for="">优点</label>
            <input 
              type="text" class="input flex_item" 
              placeholder="请描述老师突出的一个优点" 
              autofocus="auto"
              maxlength="50"
              v-model="ValuateData.advantage"
              ref="advantage"
              v-on:input='VerAdvantage'
            >
          </li>
          <li class="input-group ">
              <div class="flex">
              <label for="">缺点</label>
                <textarea 
                  cols="30" rows="5" 
                  maxlength="200"
                  placeholder="请指出老师的缺点，数量不限" 
                  class="flex_item input"
                  v-model="ValuateData.shortcoming"
                  ref="shortcoming"
                  v-on:input='VerShortcoming'
                ></textarea>
              </div>
              <div class="text text-info tar">
                {{ValuateData.shortcoming.length}}/200
              </div>
          </li>
          <li class="input-group tac mt15">
            <input type="submit" value="提交" class="btn w100">
          </li>
        </ul>
      </form>
    </main>

    <!--dialog-->
    <div class="layer dialog" v-show="diaLog">
      <div class="box">
        <div class="text-info tac">请您再次确认评价内容<br>提交后不可修改</div>
        <div class="button tac pt15">
          <a href="javascript:;" class="btn btn-default" @click="clearDiaLog">取消</a>
          <a href="javascript:;" class="btn" 
            @click="submitEvaluate"
          >{{buttonText}}</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import qs from 'qs';
import Request from '../assets/request'
export default {
  name: 'evaluateShow',
  data () {
    return {
      showData:{},
      //班级列表
      cooperativeClassData : [],
      //表单
      ValuateData:{
        advantage:'',
        shortcoming:''
      },
      diaLog: false,
      buttonText:'确定',
      flag: true
    }
  },
  created(params){
    console.log(this.$route.params);
    this.showData = this.$route.params; 
    console.log(this.showData)
  },
  
  methods:{
    // 表单提交验证
    checkForm(e){
      e.preventDefault();
      // 优点
      if(this.ValuateData.advantage.trim().length <= 0 ){
        this.$toast.center('优点不能为空');
        this.$refs.advantage.focus();
        return 
      }
      // 缺点
      if(this.ValuateData.shortcoming.trim().length <= 0){
        this.$toast.center('缺点不能为空');
        this.$refs.shortcoming.focus();
        return 
      }
      this.diaLog = true;
    },

    // 确定提交
    submitEvaluate(){
      if(this.flag == false){
        return
      }
      this.flag = false;
      this.buttonText = '提交中';
      
      let data = {
        TeacherCode: this.showData.TeacherCode,
        AssistCode: this.showData.AssistCommentResultList[0].AssistCode,
        Num: this.showData.AssistCommentResultList[0].Num,
        Merit: this.ValuateData.advantage,
        Defect: this.ValuateData.shortcoming,
        Year: this.showData.AssistCommentResultList[0].Year,
        Semester: this.showData.AssistCommentResultList[0].Semester,
        TimeQuantum: this.showData.AssistCommentResultList[0].TimeQuantum
      }

      let query = {
        timestamp:new Date().getTime(),
        appid: this.appid,
        token: this.showData.token
      }

      let option = {
        type:'post',
        api: '/api/AssistTeacher/SubReserveClass',
        query: query,
        data: qs.stringify(data)
      }
      Request(option, (res)=>{
        console.log(res);
        if(res.data.ResultType == 0){
          this.$toast.center(res.data.Message);
          this.diaLog = false;
          this.$router.go(-1);
          this.flag = true;
          this.buttonText = '确定';
          
        }else{
          this.$toast.center(res.data.Message);
        }
      })
    },
    // 关闭弹窗
    clearDiaLog(){
      this.diaLog = false;
      this.buttonText = '确定';
      this.flag = true
    },

    VerAdvantage (){
       console.log(this.ValuateData.advantage.length);
        if(this.ValuateData.advantage.length >=50){
          this.$toast.center('优点最多可输入50字');
          return
        }
    },
    VerShortcoming(){
      if(this.ValuateData.shortcoming.length >=200){
        this.$toast.center('缺点最多可输入200字');
        return
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .evaluate {
    padding: .2rem;
    h3 {
      font-size: 0.30rem;
      color: #1fba21;
    }
    main {
      margin-top:.15rem;
    }
    .section {
      box-shadow: 0 0 10px #dcdcdc;
      border-radius: .05rem;
      padding: .1rem .25rem;
      margin-bottom: .3rem;
      background: #fff;
    }
  }
  .evaluateShow {
    .table {
      width: 100%;
      td {
        border:1px solid #dcdcdc;
        text-align: center;
        padding:.1rem .05rem;
        font-size: 0.24rem;
        line-height: .4rem;
        &:first-child {
          max-width: 100px;
        }
      }
      
    }
    .checkForm {
      .text-info {
        color: #999;
      }
      .btn {
        width: 60%;
      }
    }
  }
</style>