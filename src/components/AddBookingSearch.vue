<template>
        <div class="search">
            <div>
                <p>مدينة المغادرة</p>
                <select v-model="start_city_id" required>
                    <option value="" disabled>يرجى تحديد مدينة المغادرة</option>
                    <option v-for="Airline in allAirlines" :value="Airline.id">{{ Airline.name }}</option>
                </select>
            </div>
            <div>
                <p>مدينة الوصول</p>
                <select v-model="end_city_id" required>
                    <option value="" disabled>يرجى تحديد مدينة الوصول</option>
                    <option v-for="Airline in allAirlines" :value="Airline.id">{{ Airline.name }}</option>
                </select>            
            </div>
            <div class="date-pkg">
                <div>
                    <p>موعد المغادرة</p>
                    <input type="date" placeholder="يرجى تحديد موعد السفر" class="date" v-model="start_date" required>
                    <div v-for="(item, index) in v$.start_date.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                </div>
                <div>
                    <p>موعد العودة</p>
                    <input type="date" placeholder="يرجى تحديد موعد العودة" class="date" v-model="back_date">
                </div>
            </div>
            <div>
                <label for="adult">عدد البالغين</label>
                <div class="radio">
                    <input v-model="adult_count" :min="1" type="number" style="width:100%;border:0;outline:0;text-align:center">
                </div>
            </div>
            <div>
                <label for="adult">عدد الأطفال</label>
                <div class="radio">
                    <input v-model="children_count" :min="0" type="number" style="width:100%;border:0;outline:0;text-align:center">
                </div>
            </div>
            <div>
                <label for="adult">عدد الرضع</label>
                <div class="radio">
                    <input v-model="baby_count" :min="0" type="number" style="width:100%;border:0;outline:0;text-align:center">
                </div>
            </div>
            <div>
                <p>نوع الرحله</p>
                <div class="radio">
                    <div>
                        <input type="radio" name="travel_det" id="goBack" value="go-back" @click="TravelDetHandel($event)">
                        <label for="goBack">ذهاب وعوده </label>
                    </div>
                    <div>
                        <input type="radio" name="travel_det" id="go" value="go" @click="TravelDetHandel($event)" checked>
                        <label for="go">ذهاب فقط</label>
                    </div>
                </div>
            </div>
            <div>
                <p>الدرجة</p>
                <div class="radio">
                    <div>
                    <input type="radio" name="class" id="vip" value="vip" @click="TravelTypeHandel($event)">
                    <label for="vip">رجال اعمال</label>
                </div>
                <div>
                    <input type="radio" name="class" id="economic" value="economic" @click="TravelTypeHandel($event)" checked>
                    <label for="economic">درجة السياحه</label>
                </div>
                <div>
                    <input type="radio" name="class" id="both" value="both" @click="TravelTypeHandel($event)">
                    <label for="both">الاثنين</label>
                </div>
                </div>
            </div>
            <button @click='passEvent'>بحث</button>
            <img src="../assets/img/from-to-booking.svg">
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
</template>

<style>
.Add-booking .search{
    width: 94.875%;
    border-radius: 14px;
    background-color: #ffff;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3,auto);
    justify-content: space-between;
    align-items: center;
    justify-items:center ;
    row-gap: 2.1204vh;
    padding: 2.3324vh 2.3854vw;
    margin-bottom: 2.0356vh;
}
.valid_msg{
        color: red;
        font-size: 13px;
        padding-left: 10px;
    }
.Add-booking .search p{
    font-size: 0.9375vw;
    padding-bottom: 2.0562%;
}

.Add-booking .search input[type=date],
.Add-booking .search select{
    width: 18.2187vw;
    height: 4.3256vh;
    background-color: #EDF0F5;
    border-radius: 0.7291vw;
    border: none;
    outline: none;
    padding-right: 19px;
    padding-left: 15px;
    font-size: 0.8854vw;
    appearance: button;
}

.Add-booking .search input[type=date]{
    width: 10.2187vw;
}

.Add-booking .search input[type=radio]{
    margin-right: 0.9895vw;
}

.Add-booking .search .date-pkg{
    display: flex;
    gap: 1.4641vw ;
}

.Add-booking .search .date::placeholder{
    background-image: url('../assets/img/date.svg');
    background-repeat: no-repeat;
    background-position: left;
}

.Add-booking .search .radio{
    width: 18.2187vw;
    height: 4.3256vh;
    background-color: #EDF0F5;
    border-radius: 0.7291vw;
    display: flex;
    align-items: center;
}

.Add-booking .search .radio div{
    display: flex;
    align-items: center;
}
.Add-booking .search .radio label{
    margin-right: 5px;
    font-size: 0.9375vw;
}
.Add-booking .search img{
    width: 4.8177vw;
    position: absolute;
    top: 21px;
    right: 28%;
}
.Add-booking .search button{
    width: 9.375vw;
    height: 5.8961vh;
    background-color: #2E3092;
    color: white;
    font-size: 0.8854vw;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}
</style>

<script>
import axios from 'axios';
import  useVuelidate  from '@vuelidate/core'
import { required ,helpers, numeric} from '@vuelidate/validators'
import { useBookingStore } from '../stores/booking'
import { mapState } from 'pinia'

export default {  
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
    emits:["adult_count","children_count","baby_count"],
    data(){
        return{
            allAirlines: [],
            FilteredJourney: [],
            start_city_id:"",
            end_city_id:"",
            adult_count:'1',
            children_count:'0',
            baby_count:'0',
            travel_type: "economic",
            travel_det: "go",
            start_date:"",
            count:0,
            message:"",
            back_date: null,
            loading: false,
            error: false,
            vuelidateExternalResults:{
                start_date:[],
            },
        }
    }, 
    validations() {
        var optional = (value) => true;
        var required_if_add = (value) => { return this.operation != 'edit' || value }
        return {
            start_date:{ required: helpers.withMessage('موعد المغادرة مطلوب', required)}
        }
    },
    computed:{
        ...mapState(useBookingStore,['booking'])
    },
    methods:{
    async passEvent()

    {  

        this.count=Number(this.baby_count) + Number(this.adult_count) + Number(this.children_count);

        this.vuelidateExternalResults.start_date=[];
        this.v$.$touch();
            if (this.v$.$invalid) {
                return;
        }
        this.loading=true;
        await axios.get(fetchUrl+"/travels?start_city_id=" + this.start_city_id + "&end_city_id=" + this.end_city_id + "&start_date=" + this.start_date + "&travel_type=" + this.travel_type + "&travel_det=" + this.travel_det + "&adult_count=" + this.adult_count + "&children_count" +this.children_count + "&infant_count" + this.baby_count,
            {headers: {
                Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
            }}, 
            )
            .then(res =>{
                localStorage.setItem("adult", this.adult_count );
                useBookingStore().booking.adults=this.adult_count;
                localStorage.setItem("childs", this.children_count );
                useBookingStore().booking.childs=this.children_count;
                localStorage.setItem("babies", this.baby_count );
                useBookingStore().booking.babies=this.baby_count;
                localStorage.setItem("count", this.count );
                useBookingStore().booking.count=this.count;
                this.loading=false;
                useBookingStore().loadBooking();
                this.FilteredJourney=res.data;
                this.$emit('adults',this.adult_count)
            }
            )
            .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
                      
            this.$emit('ChangeSearch',{
                search:true,
                go_date:this.start_date,
                back_date:this.back_date,
                FilteredJourney:this.FilteredJourney,
                })
    },
    TravelDetHandel(event){
        this.travel_det=event.target.value;
    },
    TravelTypeHandel(event){
        this.travel_type=event.target.value;
    }
  },
  created(){
    this.loading=true;
    axios.get(fetchUrl+"/cities" + `?paginate=0`, 
        {headers: {
            Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
        }}, 
        )
        .then(res =>{
            this.loading=false;
            this.allAirlines=res.data;
        })
        .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
    },
    watch:{
    }
}
</script>