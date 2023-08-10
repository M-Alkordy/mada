<template>
    <div class="journey-card" :class="{active:booking}" @click='passEvent'>
        <div class="right" :class="{big:booking}">
            <div class="line" :class="{column:booking}">
                <div class="Airline" :class="{row:booking}">
                    <img :src=test alt="">
                    <P>{{ airlineName }}</P>
                    <p style="color: #FBB03F;margin-right: 22px; width: 100px;">{{degree}}</p>
                </div>
                <div class="journey-info">
                    <div class="top">
                        <div class="from">
                            <p v-if="!booking">من</p>
                            <p v-if="booking" class="booking-from">مدينة المغادرة</p>
                            <p class="info">{{ from }}</p>
                        </div>
                        <img src="../assets/img/destination.png" v-if="booking" class="booking-img">
                        <div class="time-weight" v-if="!booking">
                            <p class="time"> وقت المغادرة <span class="info">{{ time }}</span></p>
                            <img src="../assets/img/from-to.svg">
                            <p class="weight"> الوزن المسموح <span class="info">{{ weight }}  kg</span></p>
                        </div>
                        <div class="to">
                            <p v-if="!booking">إلى</p>
                            <p v-if="booking" class="booking-to">مدينة الوصول</p>
                            <p class="info">{{ to }}</p>
                        </div>
                    </div>
                    <div class="days" v-if="!booking">
                        <p v-for="day in days" class="day" v-if="!booking">{{ day }}</p>
                        <button v-if="!booking" @click="EditEvent"><img src="../assets/img/more.svg"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="left" :class="{flex:booking}">
            <h1 v-if="booking">{{ price }} $</h1>
            <h2 v-if="booking">سعر التذكرة</h2>
            <div class="select" v-if="!booking">
                <div>
                    <input type="radio" :name="'price' +id" :id="'go' + id" @click="ChangeGo">
                    <label :for="'go' + id" :class="{active:go}">سعر الذهاب لكل درجة</label>
                </div>
                <div>
                    <input type="radio" :name="'price' +id" :id="'go_back' + id" @click="ChangeBack" checked>
                    <label :for="'go_back' + id" :class="{active:back}">سعر الذهاب والعودة لكل درجه</label>
                </div>
            </div>
            <div class="price" v-if="!booking">
                <p>درجة السياحه </p>
                <p class="ticket">سعر التذكرة <span v-for="e in economic"><span v-if="e.det === 'go-back' && back">$ {{e.price}}|</span><span v-if="e.det === 'go' && go">$ {{e.price}}|</span></span></p>
                <p>درجة رجال الاعمال </p>
                <p class="ticket">سعر التذكرة <span v-for="v in vip"><span v-if="v.det === 'go-back' && back">$ {{v.price}}</span><span v-if="v.det === 'go' && go">$ {{v.price}}</span></span></p>
            </div>
        </div>
    </div>
    </template>
    
    <style>
    .journey-card{
        direction: rtl;
        display: flex;
    }
    .journey-card .right{
        width: 59.3979%;
        height: 19.16vh;
        padding: 3.6vh 1.927vw 2.2vh 0;
        border-radius: 20px;
        background-color: #ffff;
    }

    .journey-card .right.big{
        width: max-content;
    }

    .journey-card .right .line{
        height: 100%;
        width: 100%;
        border-left: 1px dashed #FBB03F;
        display: flex;
        justify-content: space-between;
        padding-left: 49px;
    }

    .journey-card .right .line.column{
        flex-direction: column-reverse;
    }

    .journey-card .right .line .Airline{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .journey-card .right .line .Airline.row{
        flex-direction: row;
        gap: 1.5625vw;
        justify-content: flex-start;
    }

    .journey-card .right .line .Airline.row img{
        width: 3.8541vw;
    }

    .journey-card .right .line .Airline.row p{
        font-size: 0.9895vw;
    }

    .journey-card .right .line .Airline img{
        width: 5vw;
    }

    .journey-card .right .line .Airline p{
        width: max-content;
        font-size: 1.1458vw;
        font-weight: normal;
        color: #2E3092;
    }

    .journey-card .journey-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .journey-card .right .line .journey-info .top{
        display: flex;
    }

    .journey-card .from p
    ,.journey-card .to p {
        font-size: 17px;
        color: #767676;
    }

    .journey-card .from .info
    ,.journey-card .to .info{
        width: max-content;
        font-size: 1vw;
        color: #2E3092;
    }

    .journey-card .time-weight{
        position: relative;
    }

    .journey-card .time
    ,.journey-card .weight
    {
        width: max-content;
        font-size: 17px;
        color: #767676;
        position: absolute;
        top: 0;
        right: 50%;
        transform: translateX(50%);
    }

    .journey-card .time .info
    {
        color: #FBB03F;
    }

    .journey-card .time-weight img{
        width: 21.7187vw;
    }

    .journey-card .weight{
        top: 3.2407vh;
    }
    .journey-card .weight .info
    {
        color: #2E3092;
    }
    .journey-card .journey-info .days{
        display: flex;
        margin-top: 0.8703vh;
        justify-content: space-evenly;
    }

    .journey-card .journey-info .days .day{
        width: 5.4166vw;
        height: 42px;
        border-radius: 14px;
        font-size: 1.0416vw;
        color: #2E3092;
        background-color: #F7F8FA;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .journey-card .journey-info .days button{
        width: 42px;
        height: 42px;
        border-radius: 10px;
        border: none;
    }

    .journey-card .left{
        width: 40.6021%;
        height: 19.16vh;
        border-radius: 20px;
        background-color: #ffff;
        padding: 1.074vh 2.1354vw 0;
    }

    .journey-card .left .select{
        display: flex;
        justify-content: space-between;
        padding-bottom: 2.037vh;
        border-bottom: 1px solid #C0BFBF;
    }
    .journey-card .left .select div{
        display: flex;
        align-items: center;
    }

    .journey-card .left .select label{
        font-size: 0.9375vw;
        color: #A7ADBF;
        margin-right: 5px;
    }

    .journey-card .left .select label.active{
        color: #2E3092;
    }

    .journey-card .left .price{
        margin-top: 1.2037vh;
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: repeat(3 , 1fr);
        justify-content: space-between;
        row-gap: 0.5925vh;
    }

    .journey-card .left .price p{
        font-size: 0.8854vw;
        color: #767676;
    }

    .journey-card .left .price .ticket{
        font-size: 0.625vw;
    }

    .journey-card .left .price .ticket span{
        font-size: 1.25vw;
        color: #FBB03F;
    }

    .journey-card .booking-img{
        width: 12.65625vw;
    }

    .journey-card .from .booking-from, .journey-card .to .booking-to{
        width: max-content;
        font-size: 0.8854vw;
    }

    .journey-card .left.flex{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 21%;
        margin-bottom: 20PX;
    }
    .journey-card .left h1{
        width: max-content;
        font-size: 2.1875vw;
        color: #FBB03F;
    }
    .journey-card .left h2{
        width: max-content;
        font-size: 0.7291vw;
        color: #717B8C;
    }

    .journey-card.active{
        cursor: pointer;
    }

    .journey-card.active:hover .right,
    .journey-card.active:hover .left{
        border: 1px solid #2E3092;
    }
    </style>
    
    <script>
    import { useBookingStore } from '../stores/booking'
    import { mapState } from 'pinia'
    export default {
        data(){
        return{
            go:false,
            back:true,
            test:"" 
        }
        },
        props: {
            airlineLogo: String,
            airlineName: String,
            from: String,
            to:String,
            time:String,
            weight:String,
            days:Array,
            vip:Array,
            economic:Array,
            booking:Boolean,
            price:String,
            id:String,
            degree_id:String,
            degree:String,
            journey: Array
        },    
        methods:{
            EditEvent()
        {
            console.log({edit:true, journey:this.journey})
            this.$emit('ChangeEdit',{edit:true, journey:this.journey})
        },
        passEvent()
        {
            console.log(this.booking.adults);
            this.$emit('ChangeComplete',{Complete:true, id:this.id,degree_id:this.degree_id})
        },
        ChangeGo(){
            this.go=true;
            this.back=false;
        },
        ChangeBack(){
            this.go=false;
            this.back=true;
        }
      },
      computed:{
        ...mapState(useBookingStore,['booking'])
        },
    created(){
        this.test=imageUrl+this.airlineLogo;
    }
    }
    </script>