<template>
    <div class="edit">
        <div class="layout"></div>
        <div class="type">
            <p class="title">{{ title }}</p>
            <div class="Request">
                    <div class="person">
                        <img :src=ProfileImageHundel() alt="">
                        <p>{{ specificsInfo.name }}</p>
                    </div>
                    <p><img src="../assets/img/phone.svg" alt=""><span>رقم الجوال</span>{{ specificsInfo.phone_number}}</p>
                    <p><img src="../assets/img/ticket.svg" alt=""><span>رقم التذكرة </span>{{ specificsInfo.ticket_id }}</p>
                    <p><img src="../assets/img/order.svg" alt=""><span>حالة الطلب </span> {{ (specificsInfo.status=="new") ? "جديد" : (specificsInfo.status=="pending") ? "قيد التنفيذ" : "تم التنفيذ" }}</p>
            </div>
            <div class="edit-order">
                <p>تعديل حالة الطلب</p>
                <input type="radio" name="type" id="Underway" value="pending" @click="StatusHandel($event)">
                <label for="Underway">قيد التنفيد </label>
                <input type="radio" name="type" id="done" value="done" @click="StatusHandel($event)">
                <label for="done">تم التنفيذ</label>
            </div>
            <div class="btns">
                <button class="add-btn" @click='passEvent'>تعديل</button>
                <button class="close" @click='passCloseEvent'>إلغاء الأمر</button>
            </div>
            <img src="./../assets/img/destination.png" v-if="destination">
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
    </div>
</template>

<style>
.edit .layout{
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: #2F3746;
    opacity: 0.6;
}

.edit .type {
    width: 40.2083vw;
    background-color: white;
    border-radius: 14px;
    direction: rtl;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    z-index: 2;
}

.edit .type .title{
    font-size: 25px;
    color: #4C535F;
    padding: 1.574vh 1.875vw 2.1296vh;
    border-bottom: 1px solid #F4F6F9;
}

.edit .type .Request{
    width: 33.2812vw;
    border-radius: 14px;
    margin-right: 2.875vw;
    background-color: #EDF0F5;
    padding:2.5vh 9.8177vw ;
}

.edit .type .Request .person{
    display: flex;
    align-items: center;
}

.edit .type .Request p{
    width: max-content;
    margin-top: 20px;
    color: #717B8C;
    font-size: 1.0416vw;
}

.edit .type .Request p span{
    color: #2E3092;
    margin:0 12px;
}
.edit .type .edit-order{
    margin: 23px 60px;
}
.edit .type .edit-order p{
    color: #2F3746;
    font-size: 0.9375vw;
    margin:0 12px;
}

.edit .type .edit-order label{
    color: #2E3092;
    font-size: 0.9375vw;
    margin:0 10px 0 9.2972vw;
}

.type .btns{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 57px;
    margin-bottom: 22px;
}

.type .add-btn , .type .close{
    width: 226px;
    height: 60px;
    background-color: #2E3092;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}

.type .close{
    margin-right: 12.0312vw;
    background-color: #EDF0F5;
    color: #8D98AA;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
    return {
        status:'',
        message:'',
        loading: false,
        error: false,
        user_info: JSON.parse(localStorage.getItem("user_info"))
    }
  },
    props: {
        title: String,
        name: String,
        profilePic: String,
        ticketNumber: String,
        phoneNumber: String,
        bokkingType: String,
        specificsInfo: Object,
    },    
    methods:{
    StatusHandel(event){
        this.status=event.target.value;
    },
    async passEvent()
    {
        this.loading=true;
        await axios.post(fetchUrl + `/reservations/cancelRequests/status`,
        {
            cancelRequest_id: this.specificsInfo.id,
            status:this.status,
            _method: "PUT"
        },
                    {
                    headers: {
                        Authorization: "Bearer " + this.user_info.token,
                        "Content-Type": "multipart/form-data",
                    },
                    }
                )
                .then((res) => {this.loading=false;
                })
                .catch(error => {this.error=true
                                this.loading=false
                                this.message = error.response.data.message;});
      this.$emit('ChangeEdit',false)
    },
    passCloseEvent()
    {
      this.$emit('ChangeClose',false)
    },
    ProfileImageHundel(){
          return imageUrl +this.specificsInfo.image ;
        },
  },
}
</script>