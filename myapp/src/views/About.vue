<template>
  <div class="about">
    <div class="box">
      <div class="left">
        用户名: <input type="text" v-model="username" />
        <button @click="login">登陆</button>
        <button @click="exitopen">退出</button>
      </div>
      <div class="right">
        <div
          style="
            position: absolute;
            height: 300px;
            width: 100%;
            background: rgba(0, 0, 0, 0.9);
          "
          v-if="bol == false"
        ></div>
        <ul v-for="(item, index) in arr" :key="index" v-show="index == num">
          <h3>{{ item.title }}</h3>
          <p v-for="(ele, index1) in item.options" :key="index1">
            <input
              type="radio"
              name="1"
              :value="index1"
              @click="change(index1)"
            />
            <span>{{ ele }}</span>
          </p>
          <button ref="btn" :disabled="isClick" @click="sub(item.right)">
            提交答案
          </button>
          <p ref="djs" v-show="flag==true">{{this.m}}3秒后进入下一题</p>
        </ul>
      <!-- 底部 -->
      <p>
        共有{{num}}/{{arr.length}}道题  
        <span>答对{{isRight}}</span>
        <span>答错{{isWorrg}}</span>
      </p>
      <button v-show="num==4" @click="repeat">重新答题</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      arr: "",
      num: 0,//用来显示第几题的
      username: "",
      bol: false,
      isClick: false,//是否禁止
      bian:null,//单选框选中
      timer:null,//倒计时
      flag:false,
      isRight:0,
      isWorrg:0,
    };
  },
  mounted() {
    this.$http.get("/list.json").then((res) => {
      this.arr = res.data.data;
    });
  },
  methods: {
    login() {
      if (this.username.length >= 6 && this.username.length <= 16) {
        this.bol = true;
      } else {
        alert("请输入正确的用户名格式");
      }
    },
    // 单选框点击的按钮
    change(index){
      this.bian=index
    },
    // 提交答案
    sub(id){
      this.flag=true;//显示123页面
      this.$refs.djs.innerHTML='3s秒后进入下一题';
      let m= 3;
      this.timer= setInterval(()=>{
        m--;
        this.$refs.djs.innerHTML=m+'s后进入下一题';
        if(m<=0){
          clearInterval(this.timer);
          this.flag=false;
          this.num++//进入下一题
          this.$refs.btn[0].innerHTML='提交答案';
          this.isClick=false;
        }
      },1000)
      console.log(this.timer);
      // 回答正确错误文件的操作
      if(this.bian==id){
        this.$refs.btn[this.num].innerHTML='回答正确';
        this.isClick=true;
        this.isRight++;

      }else{
        this.$refs.btn[this.num].innerHTML='回答错误';
        this.isWorrg++;
        this.isClick=true;
      }
    },
    // 重置
    repeat(){
      this.num=0;
    },
    // 退出登录
    exitopen(){
      if(confirm('是否退出登录')){
        this.bol=false
      }
      
    },
  },
};
</script>
<style>
/* html,
body,
#app,
.index {
  width: 100%;
  display: flex;
} */
.box {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
}
.left {
  width: 50%;
  height: 300px;
  background: white;
  border: 1px solid #aaa;
}
.rigth {
  position: relative;
  width: 50%;
  height: 300px;
  background: rgba(0, 0, 0, 0.9);
  overflow: hidden;
}
</style>