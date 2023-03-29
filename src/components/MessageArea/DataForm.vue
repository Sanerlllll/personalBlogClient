<template>
  <form class="data-form-container" @submit.prevent="handleSubmit" ref="form" id="data-form-container">
    <div class="form-item">
        <div class="input-area">
            <input type="text" maxlength="10" v-model="formData.nickname" placeholder="用户昵称">
            <span class="tip">{{ formData.nickname.length }}/10</span>
        </div>
        <div class="error">{{error.nickname}}</div>
    </div>
    <div class="form-item">
        <div class="text-area">
            <textarea placeholder="输入内容" v-model="formData.content" maxlength="300"></textarea>
            <span class="tip">{{ formData.content.length}}/300</span>
        </div>
        <div class="error">{{error.content}}</div>
    </div>
    <div class="form-item">
        <div class="button-area">
            <button :disabled="isSubmiting">{{isSubmiting ? '提交中...' : '提交'}}</button>
        </div>
    </div>
  </form>
</template>

<script>
export default {
  data(){
    return {
      formData:{
        nickname:"",
        content:""
      },
      error:{
        nickname:"",
        content:""
      },
      isSubmiting:false
    }
  },
  methods:{
    async handleSubmit(){
      this.error.nickname = this.formData.nickname ? '' : '请输入昵称';
      this.error.content = this.formData.content ? '': '请输入内容';
      if(this.error.nickname || this.error.content){
        // 如果有错误则什么也不执行
        return;
      }
      this.isSubmiting = true;//按钮禁用，防止重复点击
      this.$emit('submit',this.formData,(successMsg)=>{
        // 调用showMessage弹窗
        this.$showMessage({
                content:successMsg,
                type:"success",
                duration:500,
                container:this.$refs.form,
                callback:() =>{
                   // 评论提交成功后,按钮取消禁用，清空昵称和内容
                  this.isSubmiting = false;
                  this.formData.nickname = '';
                  this.formData.content = '';
                },                
            })
      })
       
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>