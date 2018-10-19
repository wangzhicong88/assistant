<template>
  <div class="evaluate evaluateList">
    <header>
      <h3>请评价以下老师：</h3>
    </header>
    <main>
      <section 
        class="section flex" 
        v-for="(item,index) in elaluatsData"
        @click="clickItem(item)"
      >
        <div class="bd flex_item">
          <h4>{{item.TeacherName}}</h4>
          <p class="cRed">{{item.CommentState}}</p>
        </div>
      </section>
      <div class="noText tac" v-show="elaluatsData.length == 0">暂无内容</div>
    </main>
  </div>
</template>
<script>
import Request from '../assets/request'
export default {
  name: 'evaluateList',
  data () {
    return {
      elaluatsData:[]
    }
  },
  created(){
    this.$loading('数据加载中...');
    console.log(JSON.stringify(this.$route.query.token))
    let query = {
      timestamp:new Date().getTime(),
      appid: this.appid,
      token: this.$route.query.token
    }
    let option = {
      type:'get',
      api: '/api/AssistTeacher/GetCommentTeacherInfo',
      query: query,
    }
    Request(option, (res)=>{
      console.log(res);
      if(res.data.ResultType == 0){
        this.elaluatsData = res.data.AppendData;
        this.$loading.close()
      }else {
        this.$toast.center(res.data.Message)
        this.$loading.close()
      }
    })
  },
  methods:{
    clickItem(item){
      console.log(item.AssistCode)
      this.$router.push({
        name:'evaluateShow', 
        params:{
          TeacherCode: item.TeacherCode,
          TeacherName: item.TeacherName,
          TimeQuantum: item.TimeQuantum,
          AssistCommentResultList: item.AssistCommentResultList,
          token: this.$route.query.token
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .noText {
    padding-top: 40%;
    color: #999;
  }
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
      padding: .2rem .25rem;
      margin-bottom: .25rem;
      background: #fff;
    }
  }
  .evaluateList {
    .section {
      p {
        font-size: .24rem;
        padding-top: 0.05rem;
      }
      .cRed {
        color: #f03434
      }
      &:after{
        content: "";
          width: 7px;
        height: 7px;
        border-top: 1px solid #919191;
        border-right: 1px solid #919191;
        transform: rotate(45deg);
      }
    }
    
  }
</style>
