<template>
    <nav>
        <img src="../assets/img/logo.png" alt="mada logo" class="logo" style="width: 120%;height: 95px;">
        <div class="nav-items">
            <RouterLink to="/home">الرئيسية <img src="../assets/img/Main.svg" alt=""></RouterLink>
            <RouterLink to="/Users" v-if="(user_role=='super_admin')">المستخدمين <img src="../assets/img/users.svg" alt=""></RouterLink>
            <a href="#">الشقق <img src="../assets/img/flat.svg" alt=""></a>
            <a href="#">السيارات <img src="../assets/img/cars.svg" alt=""></a>
            <a href="#" @click="open = !open" :class="{ active: open }"><img src="../assets/img/arrow-down.svg" :class="{ top: open }" class="arrow"> إدارة حجوزات الطيران <img src="../assets/img/leader.svg" alt=""></a>
            <ul v-if="open">
                <li class="first" v-if="(user_role=='super_admin' || user_role=='admin_basics')"><RouterLink to="/airlines" >شركات الطيران</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_basics')"><RouterLink to="/cities">المدن</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_basics')"><RouterLink to="/destination">الوجهات</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_travels')"><RouterLink to="/journey">الرحلات</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_reservations')"><RouterLink to="/booking">الحجوزات</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_reservations')"><RouterLink to="/CancelBooking">طلبات الغاء الحجز</RouterLink></li>
                <li v-if="(user_role=='super_admin' || user_role=='admin_reservations')"><RouterLink to="/BookingSettings">إعدادات الحجز</RouterLink></li>
            </ul>
            <a href="#">خدمات أخرى <img src="../assets/img/service.svg" alt=""></a>
            <a href="#">الإعدادات <img src="../assets/img/settings.svg" alt=""></a>
            <button @click="logout"><a href="#">تسجيل الخروج <img src="../assets/img/logOut.svg" alt=""></a></button>
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
    </nav>
</template>

<style>
    nav{
        width: 16%;
        background-color: #2E3092;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.55vh;
        font-size: 0.8333vw;
        min-height: 100vh;
    }

    .logo{
        width: 76%;
    }

    .nav-items{
        width: 82.746%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.7vh;
    }

    a , nav button{
        width: 100%;
        height: 5.1851vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4.4728%;
        color: #DBDAD8;
        text-decoration: none;
        padding-right: 8.9456%;
        border-radius: 14px;
    }

    a.active{
        background-color: #fbb03f;
        color: #FAFAFA;
    }

    .arrow.top{
        transform: rotate(180deg);
    }

    ul{
        direction: rtl;
        margin-right: 17.8913%;
    }

    li a , nav button{
        color: #FFFFFF;
        font-family: 'Neo Sans Arabic';
        display: block;
        width: max-content;
    }
    nav button{     
    width: 69%;
    padding-right: 5.9456%;

    }

    li{
        color: #FFFFFF;
    }

    li.first{
        padding-top: 1.4815vh;
    }

    nav a.router-link-exact-active {
        color: #fbb03f;
    }
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        loading: false,
        error: false,
        open: false,
        message: "",
        user_role: JSON.parse(localStorage.getItem("user_info")).user.role,
        user_info: JSON.parse(localStorage.getItem("user_info")),
    }
  },
  methods:{
    logout(){
        axios.post(fetchUrl+"/logout",
            {
            },
            {
                headers: {
                        Authorization: "Bearer " + this.user_info.token,
                },
            })
            .then((res) => {this.loading=false;
                this.success (res.data)})
            .catch(error => {this.error=true
                            this.loading=false
                            this.message = error.response.data.message;});
        },
    success(res){
        localStorage.removeItem("user_info")
        this.$router.push({name:"LogIn"})
    }
  },
  props:{
    open:Boolean
  }}
</script>