<template>
<div class="card">
    <div class="icon-location" v-if="city">
        <img src="../assets/img/location.svg">
    </div>
    <p class="city-name" v-if="city">{{name}}</p>
    <div class="city-info" v-if="city">
        <div class="airport-name">
            <img src="../assets/img/yellow-plane.svg">
            <p class="name">{{ airportName }}</p>
        </div>
        <div class="barcode">
            <img src="../assets/img/barcode.svg">
            <p class="number">كود: {{ barcode }}</p>
        </div>
    </div>
    <hr v-if="city">
    <div class="title" v-if="destination">
        <div class="arrival-city">
            <p class="head">مدينة المغادرة</p>
            <p class="city">{{ departureCity }}</p>
        </div>
        <img src="./../assets/img/destination.png">
        <div class="Departure-city">
            <p class="head">مدينة الوصول</p>
            <p class="city">{{ arrivalCity }}</p>
        </div>
    </div>
    <div class="info" :class="{ bord: destination }" v-if="!city">
        <img :src=test alt="" :class="{ small: destination }">
        <p>{{ name }}</p>
    </div>
    <button @click='passEvent' :class="{ small: destination , city:city}" >تعديل</button>
</div>
</template>

<style>
.card{
    background-color: white;
    border-radius: 14px;
    padding: 0.729vw;
    position: relative;
}
.card .icon-location{
    width: 3.427vw;
    height: 3.427vw;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: absolute;
    top:0;
    right: 50%;
    transform: translate(50% , -50%);
}

.card .city-name{
    width: max-content;
    margin: 0 auto;
}
.card .title{
    display: flex;
}

.card .title .head{
    color: #767676;
    font-size: 0.833vw;
    width: max-content;
    margin-bottom: 0.5555vh;
}

.card .title img{
    width: 13.2291vw;
}
.card .title .city{
    color: #2E3092;
    font-size: 0.9375vw;
    width: 100%;
    text-align: center;
}

.card .info{
    display: flex;
    align-items: center;
    gap: 1.0416vw;
}

.card .info.bord{
    border-bottom: 1px solid #D8D8D8;
}

.card .info p{
    font-size: 1.0416vw;
    color: #2E3092;
}

.card .info img{
    width: 5.4166vw;
}
.card .info img.small{
    width: 3.8541vw;
}

.card button{
    display: block;
    width: 100%;
    height: 4.4444vh;
    border: none;
    outline: none;
    border-radius: 14px;
    color: #2E3092;
    font-size: 0.8333vw;
    margin-top: 1.2962vh;
    cursor: pointer;
}

.card button.small{
    width: 70%;
    display: block;
    margin: auto;
    margin-top: 0.7407vh;
}

.card button.city{
    width: 20.7291vw;
    display: block;
    margin: auto;
    background-color: white;
    border: 1px solid #2E3092;
}

.card .city-name{
    font-size: 0.1145vw;
    color: #2E3092;
    width: max-content;
    margin: 2.9629vh auto 1.5740vh;
    
}

.card .city-info{
    width: 20.7291vw;
    height: 9.074vh;
    border-radius: 14px;
    background-color: #F5F5F5;
    margin: 0 auto;
    display: flex;
    padding: 0 1.7187vw;
    justify-content: space-between;
    align-items: center;
}

.card .city-info .airport-name .name , .card .city-info .barcode .number{
    font-size: 0.9895vw;
    color: #707070;
}

.card hr{
    width: 20.7291vw;
    margin: 0.9259vh auto;
}
</style>

<script>
export default {
    data(){
        return{
            test:"",
        }
        },
    props: {
        image: String,
        name: String,
        barcode: Number,
        id: Number,
        arrivalCity:String,
        departureCity:String,
        cityName:String,
        airportName:String,
        destination:Boolean,
        city:Boolean,
    },    
    methods:{
    passEvent()
    {
      this.$emit('ChangeEdit',this.id)
    }
  },
    created(){
        this.test=imageUrl+this.image;
  }
}
</script>