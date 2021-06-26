<template>
  <div class="home">
    <button @click="lock" v-show="lockshow">锁定</button>
    <button @click="uplock" v-show="uplockshow" ref="lockbtn">锁定</button>
    <br />
    所在城市：
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.value"
        :value="item.value"
        :disabled="isDisabled"
      >
      </el-option> </el-select
    ><br />
    用户名：<input
      type="text"
      v-model="username"
      :disabled="isDisabled"
    /><br />
    年龄：<input type="text" v-model="age" :disabled="isDisabled" /><br />
    <button @click="add" :disabled="isDisabled">提交</button><br />
    <hr />

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55">
        <template slot-scope="scope">
          <input
            type="checkbox"
            @click="change(scope.$index)"
            :checked="scope.row.flag"
          />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="city" label="城市" width="120"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <button @click="plsc">批量删除</button>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      options: [],
      value: "",
      username: "",
      age: "",
      tableData: [],
      bol: false,
      lockshow: true, //控制锁定是否触发
      uplockshow: false, //控制解绑是否触发
      isDisabled: false, //决定锁定元素是否可点击
      index: null,
      timer: null,
    };
  },
  async created() {
    // 渲染页面
    let res = await this.$http.get("/data.json");
    res.data.data.map((item) => {
      item.label = item.id;
      item.value = item.name;
    });
    this.options = res.data.data;
  },
  methods: {
    // 添加
    add() {
      // 修改
      if (this.bol) {
        this.tableData[this.index] = Object.assign(this.tableData[this.index], {
          username: this.username,
          age: this.age,
          city: this.value,
        });
        this.bol = false;
      } else {
        // 添加
        this.tableData.push({
          username: this.username,
          age: this.age,
          city: this.value,
          flag: false,
        });
        this.tableData.map((item, index) => {
          item.id = index + 1;
        });
        this.username = "";
        this.age = "";
        this.value = "";
      }
    },
    handleEdit(index, row) {
      this.username = row.username;
      this.age = row.age;
      this.value = row.city;
      this.bol = true;
      this.index = index;
    },
    // 删除
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.tableData.map((item, index) => {
        item.id = index + 1;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    lock() {
      // 锁定事件
      this.lockshow = false; //锁定的时候锁定需要隐藏
      this.isDisabled = true; //禁止使用
      this.uplockshow = true;
    },
    uplock() {
      // 解锁事件

      let seconds = 3;
      this.$refs.lockbtn.innerText = "3秒后解锁";
      this.timer = setInterval(() => {
        seconds--;
        this.$refs.lockbtn.innerText = seconds + "s秒后解锁";
        if (seconds <= 0) {
          clearInterval(this.timer);
          this.lockshow = true;
          this.isDisabled = false;
          this.uplockshow = false;
        }
      }, 1000);
    },
    // 批量删除
    plsc() {
      this.tableData = this.tableData.filter((item) => {
        return item.flag == false;
      });
    },
    change(index) {
      this.tableData[index].flag = !this.tableData[index].flag;
    },
  },
};
</script>
<style >
</style>