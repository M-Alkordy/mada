<template>
    <div class="Check-details">
        <div class="background">
            <div class="cities">
                <div class="arrival-city">
                    <p class="head">مدينة المغادرة</p>
                    <p class="city">{{ arrivalCity }}</p>
                </div>
                <img src="./../assets/img/destination.png">
                <div class="Departure-city">
                    <p class="head">مدينة الوصول </p>
                    <p class="city">{{ departureCity }}</p>
                </div>
            </div>
            <div class="details-trip">
                <div>
                    <h3>الدرجة</h3>
                    <p>{{ Class }}</p>
                </div>
                <div class="airline">
                    <img :src="test">
                    <p>{{ airlineName }}</p>
                </div>
                <div>
                    <h3>التاريخ</h3>
                    <p>{{ date }}</p>
                </div>
                <div>
                    <h3>نوع الحجز</h3>
                    <p>{{ bookingType }}</p>
                </div>
                <div>
                    <h3>نوع الرحلة</h3>
                    <p>{{ JourneyKind }}</p>
                </div>
            </div>
            <div class="detail">
                <h2>Details التفاصيل</h2>
                <div v-for="i in NewBookingInfo.travelers.length" style="width: 100%;">
                    <div>
                        <p>المسافر {{ i }}</p>
                        <p>{{ NewBookingInfo.travelers[i - 1].cost }} $</p>
                    </div>
                </div>
                <div>
                    <p>المجموع غير شامل الضريبة</p>
                    <p>{{NewBookingInfo.cost}}$</p>
                </div>
            </div>
            <div class="total">
                <p>Final Total المجموع الكلي</p>
                <p>{{NewBookingInfo.cost}}$</p>
            </div>
            <div class="btns">
                <button class="btn"><RouterLink to="/booking">ادفع عبر حاسب</RouterLink></button>
                <button class="btn"><RouterLink to="/booking">ادفع عبر كاش</RouterLink></button>
                <button class="btn"><RouterLink to="/booking">او ادخال رقم سند التحويل المالي</RouterLink></button>
            </div>
        </div>
    </div>
</template>

<style>
.Check-details{
    width: 63.2233%;
/*     height: 70.5084vh; */
}
.Check-details .background{
    background-image: url('../assets/img/paper.svg');
    background-size: cover;
    margin-right: -1.3909vw;
    width: 100%;
    height: 100%;
    padding: 5.08474vh 1.6105vw;
}

.Check-details .cities{
    display: flex;
    margin:3.1881% 4.2708vw 0;
}

.Check-details .cities img{
    width: 25vw;
    transform: translateY(-20%);
}

.Check-details .cities .head{
    color: #767676;
    font-size: 0.833vw;
    width: max-content;
    margin-bottom: 0.5555%;
}

.Check-details .cities .city{
    color: #2E3092;
    font-size: 0.9375vw;
    width: 100%;
    text-align: center;
}

.Check-details .details-trip{
    width: 45vw;
    height: 17.2154vh;
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: repeat(3 , auto);
    grid-template-rows: repeat(2 , auto);
    padding:0 4.2708vw 0 6.2708vw;
    border-bottom: 1px solid #ACACAC;
    position: relative;
    top: -3.08166vh;
}

.Check-details .details-trip div{
    text-align: center;
}

.Check-details .details-trip h3{
    color: #FBB03F;
    font-size: 0.9375vw;
}

.Check-details .details-trip p{
    color: #2E3092;
    font-size: 1.0416vw;
}

.Check-details .details-trip .airline{
    grid-area: 1/2/3/2;
}

.Check-details .details-trip .airline img{
    width: 5.677vw;
}
.Check-details .detail{
    width: 100%;
    margin:0 4.2708vw 0 6.2708vw;
}

.Check-details .detail h2{
    width: 76%;
    height: 4.8821vh;
    padding-right: 11px;
    font-size: 1.0937vw;
    color: #FBB03F;
    background-color: #F8F8F8;
    display: flex;
    align-items: center;
}

.Check-details .detail div div{
    width: 76%;
    height: 3.872vh;
    padding:0 11px;
    font-size: 0.9375vw;
    color: #2F3746;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F8F8F8;
}
.Check-details .detail div div:last-child{
    background-color: white;
}
.Check-details .detail div:last-child{
    width: 76%;
    height: 3.872vh;
    padding:0 11px;
    font-size: 0.9375vw;
    color: #2F3746;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F8F8F8;
    background-color: #F8F8F8;
}

.Check-details .detail div:last-child p:first-child{
    color: #2E3092;
}

.Check-details .total{
    width: 76%;
    height: 3.872vh;
    padding:0 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FCCB81;
    margin: 2.6894% 4.2708vw 0 6.2708vw;
}

.Check-details .total p:first-child{
    font-size: 0.9375vw;
    height: max-content;
    color: #FFFFFF;
}

.Check-details .total p:last-child{
    font-size: 1.3vw;
    color: #2E3092;
    height: max-content;
}

.Check-details .btns{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 5vh;
    margin-right: -13px;
}

.Check-details .btn{
    width: 12.8645vw;
    height: 5.0505vh;
    background-color: #2E3092;
    color: white;
    font-size: 0.8854vw;
    border: none;
    border-radius: 0.7291vw;
    cursor: pointer;
}

.Check-details .btn a{
    display: inline;
    padding-right: 0;
}
</style>

<script>
export default {   
    methods:{
    passEvent()
    {
        this.$emit('ChangeDone',true)
    }
    },
    props: {
        arrivalCity: String,
        departureCity: String,
        Class: String,
        date: String,
        airlineLogo: String,
        airlineName: String,
        bookingType: String,
        JourneyKind: String,
        NewBookingInfo: Object
    },
    created(){
        this.test=imageUrl+this.airlineLogo;
    },
}
</script>
