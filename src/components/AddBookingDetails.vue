<template>
            <div class="details" :class="{big:travelers , huge:Specifics}">
                <img src="../assets/img/details.svg" class="bg">
                <div class="discription">
                    <div class="Journey-kind" v-if="!travelers">
                        <h2>نوع الرحلة</h2>
                        <p>{{ JourneyKind }}</p>
                    </div>
                    <div class="grid" :class="{three:Specifics}">
                        <div class="from">
                        <h2>من</h2>
                        <p>{{from}}</p>
                    </div>
                    <div class="to">
                        <h2>إلى</h2>
                        <p>{{to}}</p>
                    </div>
                    <div style="grid-area: 1 / 2;" v-if="Specifics"></div>
                    <div class="class">
                        <h2>الدرجة</h2>
                        <p>{{ Class }}</p>
                    </div>
                    <div class="Reservation-number" v-if="Specifics">
                        <h2>رقم الحجز</h2>
                        <p>{{ ReservationNumber }}</p>
                    </div>
                    <div class="booking-kind" :class="{static:Specifics}" v-if="Specifics">
                        <h2>نوع الحجز</h2>
                        <p>{{ bookingType }}</p>
                    </div>
                    <div class="date">
                        <h2>التاريخ</h2>
                        <p>{{date}}</p>
                    </div>
                    <div class="time" v-if="Specifics">
                        <h2>الوقت</h2>
                        <p>{{time}}</p>
                    </div>
                    <div class="airline" :class="{transform:travelers}">
                        <img :src=test alt="">
                        <p>{{ airlineName }}</p>
                    </div>
                    <div class="price" v-if="!travelers">
                        <h2>سعر التذكرة</h2>
                        <p>$ {{ price }}</p>
                    </div>
                    <div class="booking-kind" v-if="travelers">
                        <h2 :class="{none:Specifics}">نوع الحجز</h2>
                        <p :class="{none:Specifics}">{{ bookingType }}</p>
                    </div>
                    </div>
                </div>
                <div class="traveler" v-if="travelers">
                    <div class="number-traveler">
                        <img src="../assets/img/Traveler2.svg">
                        <div>
                            <p>عدد المسافرين</p>
                            <p>{{ numberTraveler }} مسافرين</p>
                        </div>
                    </div>
                    <div class="type-traveler">
                        <div class="old">
                            <img src="../assets/img/old.svg">
                            <p>{{ old }} كبار</p>
                        </div>
                        <div class="child">
                            <img src="../assets/img/child.svg">
                            <p>{{ child }} طفل</p>
                        </div>
                        <div class="baby">
                            <img src="../assets/img/baby.svg">
                            <p>{{ baby }} رضيع</p>
                        </div>
                    </div>
                </div>
                <div class="foot" v-if="Specifics">
                    <div class="number-transfer">
                            <h2> رقم سند التحويل المالي</h2>
                            <p>{{ numberTransfer }}</p>
                        </div>
                        <div class="booking-status">
                            <h2> حالة الحجز</h2>
                            <p>{{ bookingStatus }}</p>
                        </div>
                    </div>
            </div>
</template>

<style>
.Add-booking .details{
    width: 32.9166vw;
    height: 50.7209vh;
    border-radius: 14px;
    background-color: #ffff;
    position: relative;
}

.Add-booking .details.big{
    height: 58.5516vh;
    background:linear-gradient(103.9deg, #2E3092 3%, #171849 93.9%);
}

.Add-booking .details.huge{
    height: 74.5516vh;
}

.Add-booking .details.huge .traveler{
    top: 48.7459vh;
    padding-bottom: 1.7592vh;
    margin-bottom: 2.2222vh;
    border-bottom: 1px solid #FAFAFA;
}

.Add-booking .details.big .bg{
    width: 84%;
    top: 0%;
    right: 50%;
    transform: translateX(50%);
}

.Add-booking .body .bg{
    width: 84%;
    border-radius: 14px;
    background:linear-gradient(103.9deg, #2E3092 3%, #171849 93.9%);
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50% , -50%);
}

.Add-booking .body .discription{
    width: 81%;
    border-radius: 14px;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50% , -50%);
    z-index: 1;
}

.Add-booking .body .discription .Journey-kind{
    position: absolute;
    top: -8.089vh;
    right: 50%;
    transform: translateX(50%);
}

.Add-booking .body .discription .grid{
    width: 22.3958vw;
    display: grid;
    grid-template-columns: repeat(2 , auto);
    row-gap: 1.6029vh;
    align-items: center;
    justify-content: space-between;
    margin-right: 3vw;
    position: absolute;
    top: -3.95vh;
}

.Add-booking .details.big .grid{
    top: -8.95vh;
    row-gap: 6.371vh;
}

.Add-booking .details.big .grid.three{
    grid-template-columns: repeat(3 , auto);
    row-gap: 3.371vh;
    top: -16.95vh;
}

.Add-booking .body .discription .grid .from h2,
.Add-booking .body .discription .grid .to h2{
    color:#F8F8FC;
}

.Add-booking .body .discription .grid .to{
    margin-right: 31%;
}
.Add-booking .body .discription .grid h2,
.Add-booking .body .discription .Journey-kind h2,
.Add-booking .body .foot h2{
    font-size: 0.8854vw;
    color: #FCCB81;
    width: max-content;
}

.Add-booking .body .discription .grid p,
.Add-booking .body .discription .Journey-kind p,
.Add-booking .body .foot p{
    font-size: 0.9895vw;
    color: #F8F8FC;
    width: max-content;
}

.Add-booking .body .foot{
    width: 22.3958vw;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 3.5185vh;
    right: 50%;
    transform: translateX(50%);
}
.Add-booking .body .discription .grid .price p{
    font-size: 1.3541vw;
}

.Add-booking .body .discription .grid .airline.transform,
.Add-booking .body .discription .booking-kind{
    position: absolute;
    top: -9%;
    right: 46%;
    text-align: center;
    transform: translate(50% , -50%);
    z-index: 1;
}

.Add-booking .body .discription .booking-kind{
    top: 83%;
    right: 52%;
}

.Add-booking .body .discription .booking-kind.static{
    position: static;
    transform: translate(0 , 0);
}

.Add-booking .body .discription .booking-kind .none{
    display: none;
}
.Add-booking .body .discription .grid .airline p{
    font-size: 0.8854vw;
}

.Add-booking .body .discription .grid img{
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: white;
}

.Add-booking .details .traveler{
    position: absolute;
    top: 41.7459vh;
    right: 50%;
    transform: translateX(50%);
    z-index: 2;
}

.Add-booking .details .traveler .number-traveler{
    display: flex;
    justify-content: center;
    width: 22.3958vw;
    height: 4.9728vh;
    background-color: #707070cb;
    border-radius: 9px;
    margin-bottom: 1.6317vh;
}

.Add-booking .details .traveler .number-traveler img{
    width: 2.1197vw;
}

.Add-booking .details .traveler .number-traveler div{
    text-align: center;
    color: white;
    font-size: 0.8333vw;
}

.Add-booking .details .traveler .type-traveler{
    width: 22.3958vw;
    height: 6.9728vh;
    display: flex;
    justify-content: space-between;
}

.Add-booking .details .traveler .type-traveler div{
    width:5.9166vw;
    height: 100%;
    background-color: #707070cb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 9px;
    font-size: 0.8333vw;
}

.Add-booking .details .traveler .type-traveler div p{
    font-size: 0.8333vw;
    color: #ffff;
}

.Add-booking .details .traveler .type-traveler div img{
    width:17px;
}

</style>

<script>
import AddBookingSearch from '../components/AddBookingSearch.vue';
export default {
    data(){
        return{
            search:false,
            test: ''
        }
        },
    props: {
        JourneyKind: String,
        from: String,
        to: String,
        Class: String,
        date: String,
        airlineLogo: String,
        airlineName: String,
        price: String,
        travelers:Boolean,
        Specifics:Boolean,
        bookingType:String,
        numberTraveler:String,
        ReservationNumber:String, 
        ticketNumber:String,
        bookingStatus:String,
        numberTransfer:String,
        time:String,
        old:String,
        child:String,
        baby:String
    },    
    methods:{
        ChangeS(search){
            this.search=search;
        },
  },
  mounted(){
  },
  created(){
        this.test=imageUrl+this.airlineLogo;
    },
  components: {
    AddBookingSearch
    },
    computed:{
        multiple_value_boolean_not() { 
            return !Specifics || !travelers;
    } 
    }
}
</script>