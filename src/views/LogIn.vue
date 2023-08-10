<template>
  <div class="all">
    <section class='login' id='login'>
      <div class="logo" style="">
        <img src="../assets/img/logo.png" style="width: 440px;">
      </div>
      <div class='form'>
        <form @submit.prevent="submit" >
          <input type="test" name="name" placeholder='ادخل اسم المستخدم' class='name' required v-model="name">
          <input type="password" name="password" placeholder='••••••••••••••' class='password' required v-model="password">
          <button type="submit" class='btn-login'>Login</button>
        </form>
      </div>
      <div class="loading" v-if="loading">
        <p>loading...</p>
        <img src="./../assets/img/loading.gif" alt="">
      </div>
      <div class="error" v-if="error">
        <div class="info">
          <button @click="error=!error">X</button>
          <p>{{ message }}</p>
          <img src="./../assets/img/error.png" alt="">
        </div>
      </div>
      </section>
  </div>
</template>

<style>
.all {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(109.6deg, #ffd876 11.2%, #ffd8a4 100.2%); 
  display: flex;
  justify-content: center;
  align-items: center;
  user-select:none;
}
.login {
  background: linear-gradient(103.9deg, rgb(12, 166, 180) 3%, rgb(100, 51, 161) 93.9%);
  margin: auto;
  box-shadow: 
    0px 2px 10px rgba(0,0,0,0.2), 
    0px 10px 20px rgba(0,0,0,0.3), 
    0px 30px 60px 1px rgba(0,0,0,0.5);
  border-radius: 8px;
  padding: 0 20px;
}

.login .logo{
  margin: 0 auto;
  width: max-content;
}

.login .form{
  position: relative;
  top: -43px;
  margin: 20px auto;
  width: max-content;
}

.login .form .phone {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: #D3D3D3;
  font-size: 1em;
  outline: none;
}
.login .form .phone::placeholder {
  color: #D3D3D3;
}
.login .form .password,
.login .form .name {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
  margin-bottom: 50px;
  margin-top: 50px;
}
.login .form .name::placeholder,
.login .form .password::placeholder {
  color: #D3D3D3;
}
.login .form .btn-login {
  background-color: #fbb03f;
  text-decoration: none;
  color: white;
  box-shadow: 0px 0px 0px 2px #fbb03f;
  border-radius: 3px;
  padding: 5px 2em;
  transition: 0.5s;
  display: block;
  width: max-content;
  margin: auto;
  cursor: pointer;
  
}
.login .form .btn-login:hover {
  background: white;
  color: #fbb03f;
  box-shadow: 0px 0px 0px 2px white;
  transition: 0.5s;
}

.login select{
  font-size: small;
  appearance: button;
  width: 70px;
  border: 2px solid #D3D3D3;
  color: #D3D3D3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login select option{
  font-size: small;
  color: black;
}

.login .form .phone_code{
  width: 50px;
  margin-left: 10px;
  color: #D3D3D3;
  box-shadow: 0px 2px 0px 0px white;
}

.login .form .number{
  display: flex;
  justify-content: space-between;
}

.loading, .error{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.29);
  backdrop-filter: blur(5px);
  z-index: 101; 
}

.loading img,
.loading p{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75px;
}

.loading p{
  width: max-content;
  color: rgb(12, 166, 180);
  font-size: 15px;
}

.error .info{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  width: 500px;
  height: 300px;
  background-color: #D3D3D3;
  border-radius: 15px;
}

.error .info button{
  color: #fbb03f;
  position: absolute;
  right: 5%;
  top: 5%;
  font-size: 50px;
}

.error .info p{
  position: absolute;
  right: 50%;
  top: 40%;
  transform: translate(50% , -50%);
  font-size: 30px;
  text-align: center;
  width: 100%;
}

.error .info img{
  width: 150px;
  position: absolute;
  right: 50%;
  top: 70%;
  transform: translate(50% , -50%);
}
</style>

<script>

import axios from 'axios'
  export default {
    data(){
        return{
          password : '',
          name : '',
          loading: false,
          error: false,
          message: ''
        }
    },
    methods:{
      login() {
        this.$router.push('/home')
      },
      submit() {
        this.loading = true;
        axios.post(fetchUrl+"/login_admin", {
          name:this.name,
          password: this.password,
        })
        .then(res => {
          this.loading=false
          this.success (res.data)
        })
        .catch(error => { this.error=true
          this.loading=false
          this.message = error.response.data.message
          });
      },
      success(res){
        localStorage.setItem("user_info",JSON.stringify(res))
        this.$router.push({name:"root"})
      },
    }, 
    beforeCreate(){
      localStorage.removeItem("user_info")
    }
    }
  </script>