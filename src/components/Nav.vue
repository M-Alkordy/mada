<template>
    <div class="top-nav">
        <div class="left">
            <div class="user-info">
                <img src="../assets/img/arrow-down-grey.svg">
                <div class="name-job">
                        <p class="name"> {{ user_info.user.name }} </p>
                        <p class="job">{{ user_info.user.role }}</p>
                </div>
                <img src="../assets/img/user.svg" alt="user picture" class="user-pic">
            </div>
            <div class="notification">
                <img src="../assets/img/notification.svg" alt="notification">
                <div class="number"></div>
            </div>
        </div>
        <div class="search">
            <button><img src="../assets/img/search.svg" alt=""></button>
            <input type="text" placeholder="ابحث عن أي شيء في المنصة">
        </div>
        <div class="loading" v-if="loading">
            <p>loading...</p>
            <img src="./../assets/img/loading.gif" alt="">
        </div>
        <div class="error" v-if="error">
            <div class="info">
                <button @click="error=!error">X</button>
                <p>حدث خطأ يرجى المحاولة من جديد</p>
                <img src="./../assets/img/error.png" alt="">
            </div>
        </div>
    </div>
</template>

<style>
.top-nav{
    width: 100%;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4074vh 2.9167vw;
    border-bottom: 1px solid #BAC1CC;
}

.top-nav .user-info{
    width: 13.9583vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.top-nav .user-info .user-pic{
    margin-left: 0.7291vw;
    width: 2.9166vw;
}

.top-nav .user-info .name-job{
    margin-left: 3.3333vw;
    text-align: right;
}

.top-nav .user-info .name-job .name{
    width: max-content;
    font-size: 0.7291vw;
    color: #4C535F;
}

.top-nav .user-info .name-job .job{
    font-size: 0.625vw;
    color: #8D98AA;
    padding-top: 0.5555vh;
}

.top-nav .left{
    display: flex;
}

.top-nav .left .notification{
    margin-left: 1.4583vw;
    position: relative;
    height: 2.9166vw;
}

.top-nav .left .notification img{
    width: 2.9166vw;
}

.top-nav .left .notification .number{
    width: 1.25vw;
    height: 1.25vw;
    background-color: #FAA61A;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: -0.3703vh;
    right: -0.4166vw;
}

.top-nav .search{
    width: 27.3958vw;
    height: 7.1851vh;
    background-color: #f2f3f7;
    border-radius:14px;
    display: flex;
    align-items: center;
}

.top-nav .search button{
    margin-left: 0.8333vw;
    border: none;
    background-color: #f2f3f7;
    cursor: pointer;
}

.top-nav .search input{
    width: 92.3954%;
    height: 100%;
    border: none;
    border-radius:14px;
    background-color: #f2f3f7;
    direction: rtl;
    padding-right: 1.4583vw;
}

.top-nav .search input::placeholder{
    font-size: 1.4583vw;
    color: #CCD3DF;
}

.top-nav .search input:focus{
    outline: none;
}
</style>

<script>
import axios from 'axios'

  export default {
    data(){
        return{
            loading: false,
            error: false,
            user_info: JSON.parse(localStorage.getItem("user_info")),
        }
    },
    }
  </script>