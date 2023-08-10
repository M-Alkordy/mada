<template>
        <div class="main">
            <Nav/>
            <div class="Add-booking">
                <div class="head">
                    <h2 v-if="!Check">إضافة حجز جديد</h2>
                    <p v-if="!Check">يمكنك حجز تذاكر الطيران وادارتها في تطبيقك</p>
                    <h2 v-if="Check">تفاصيل فاتورة الحجز</h2>
                    <p v-if="Check">يمكنك الإطلاع على  تفاصيل فاتورة الحجز والقيام بعمليه الدفع للتأكيد</p>
                </div>
                <AddBookingSearch
                @ChangeSearch="ChangeS($event)"
                v-if="!travelers" />
                <div class="your-place" v-if="!search">
                    <div>
                        <img src="../assets/img/place.svg">
                        <h3>حدد وجهتك</h3>
                        <p>لم يتم تقدم أي بيانات حتى الان</p>
                    </div>
                </div>
                <div class="your-place" v-if="empty">
                    <div>
                        <img src="../assets/img/not-found.png" class="not-found">
                        <h3>لم يتم العثور على رحلة مناسبة</h3>
                        <p>الرجاء ادخال معلومات مختلفة</p>
                    </div>
                </div>
                <div class="body"  v-if="!empty">
                    <AddBookingDetails
                    :JourneyKind="JourneyKind"
                    :from=chosenjourney[0].destination.start_city.name
                    :to=chosenjourney[0].destination.end_city.name
                    :Class="class"
                    :date="go_date"
                    :airlineLogo="chosenjourney[0].destination.airline.image"
                    :airlineName="chosenjourney[0].destination.airline.name"
                    :price="price"
                    :bookingType=bookingTypeHundle()
                    :numberTraveler=count
                    :old=adult_count
                    :child=child_count
                    :baby=infant_count
                    :travelers=travelers
                    v-if="!Check && Complete" />
                    <div class="prices" v-if="!Complete">
                        <div v-for="journey in FilteredJourney">
                            <BigCard v-if="journey.economic"
                                :booking = true
                                :from=journey.destination.start_city.name
                                :to=journey.destination.end_city.name
                                :airlineLogo=journey.destination.airline.image
                                :airlineName=journey.destination.airline.name
                                :price=journey.price_economic
                                :degree_id=journey.economic[0].id
                                degree="درجة سياحية"
                                :id=journey.id
                                @ChangeComplete="ChangeC($event)"
                            />
                            <BigCard v-if="journey.vip"
                                :booking = true
                                :from=journey.destination.start_city.name
                                :to=journey.destination.end_city.name
                                :airlineLogo=journey.destination.airline.image
                                :airlineName=journey.destination.airline.name
                                :price=journey.price_vip
                                :degree_id =journey.vip[0].id
                                degree="درجة رجال الأعمال"
                                :id=journey.id
                                @ChangeComplete="ChangeC($event)"
                            />
                        </div>

                    </div>
                    <CompleteReservation
                    :Complete=Complete
                    @ChangeCreateAccount="ChangeA($event)"
                    @Cancel="ChangeC($event)"
                    @ChangeAdd="ChangeAddAcount($event)"
                    v-if="!Completetravelers" />
                    <TravelerData 
                    v-if="travelers && !Check && !Add"
                    :count= count
                    :adult_count= adult_count
                    :child_count=child_count
                    :infant_count=infant_count
                    @ChangeCheck="ChangeCh($event)"/>
                    <CheckDetails 
                    v-if="Check"
                    :arrivalCity=chosenjourney[0].destination.start_city.name
                    :departureCity=chosenjourney[0].destination.end_city.name
                    :Class=ClassHundel()
                    :date=go_date
                    :airlineLogo=chosenjourney[0].destination.airline.image
                    :airlineName=chosenjourney[0].destination.airline.name
                    :bookingType=bookingTypeHundle()
                    :JourneyKind=JourneyKind
                    :NewBookingInfo = NewBookingInfo
                    @ChangeDone="ChangeD($event)"
                    />
                </div>
                <Add
                v-if="AddAcount"
                :account=true 
                :clients=true 
                api="/register"
                title=" بيانات الحساب المطلوبة"
                firstInput="الاسم الكامل"
                firstPlaceholder="يرجى كتابة الاسم كامل"
                thirdInput="رقم الجوال"
                thirdPlaceholder="يرجى إدخال رقم الجوال"
                FifthInput="البريد الالكتروني"
                FifthPlaceholder="يرجى إدخال البريد الإلكتروني"
                SixthInput="كلمة السر"
                SixthPlaceholder="يرجى إدخال كلمة السر"
                @ChangeAdd="ChangeAddAcount2($event)"
                @ChangeClose="ChangeClose($event)" />
            </div>
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
    <SideBar :open=true />

    
</template>

<style>
.booking{
    width: 85%;
    position: relative;
    top: 14px;
    right: -243px;
    height: 86%;
}
.Add-booking{
    direction: rtl;
    margin: 1.948vh 3.5vw;
}

.Add-booking .head h2{
    font-size: 1.25vw;
    color: #2F3746;
}

.Add-booking .head p{
    font-size: 0.833vw;
    color: #717B8C;
    margin-top: 0.8928vh;
    margin-bottom: 1.4259vh;
}

.Add-booking .your-place{
    width: 92.875%;
    height: 48.3553vh;
    border-radius: 14px;
    background-color: #ffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Add-booking .your-place div{
    text-align: center;
}

.Add-booking .your-place div h3{
    width: max-content;
    margin: 0 auto;
    font-size: 22px;
    color: #4C535F;
}

.Add-booking .your-place div p{
    font-size: 20px;
    color: #8D98AA;
}

.Add-booking .body{
    display: flex;
    gap: 1.4583vw;
/*     height: 54.7209vh; */
}

.Add-booking .body .prices{
    position: absolute;
    left: 7.0191vw;
    width: max-content;
    height: 280px;
    overflow-y: auto;

}

.Add-booking .not-found{
    width: 100px;
}
</style>

<script>
import AddBookingSearch from '../components/AddBookingSearch.vue';
import AddBookingDetails from '../components/AddBookingDetails.vue';
import BigCard from '../components/BigCard.vue';
import CompleteReservation from '../components/CompleteReservation.vue';
import Add from '../components/Add.vue';
import TravelerData from '../components/TravelerData.vue';
import CheckDetails from '../components/CheckDetails.vue';
import SideBar from '../components/SideBar.vue';
import Nav from '../components/Nav.vue';
import { nextTick } from 'vue';
import axios from 'axios';
export default {
    data(){
        return{
            search:false,
            Complete:false,
            travelers:false,
            Completetravelers:false,
            Check:false,
            loading: false,
            error: false,
            Add:false,
            done:false,
            empty:false,
            AddAcount:false,
            clients:true,
            JourneyKind:"",
            class:"",
            go_date:"",
            back_date:"",
            price:"",
            count: '',
            sure:'',
            adult_count: '',
            child_count: '',
            infant_count: '',
            user_id: '',
            degree_id: '',
            message: '',
            user_info: JSON.parse(localStorage.getItem("user_info")),
            fetchBody: {},
            chosenjourney:[],
            FilteredJourney:[],
            Alltravelers:[],
            NewBookingInfo : {}
        }
        },   
    methods:{
        bookingTypeHundle(){return (this.sure=='1') ? "مؤكد" : "مؤقت"},
        ClassHundel(){return (this.chosenjourney[0].economic) ? "الدرجة السياحية" : "درجة رجال الأعمال"},
        ChangeA({travelers,sure,count,adult_count,child_count,infant_count,user_id}){
            this.travelers=travelers;
            this.Completetravelers=travelers;
            this.sure=sure;
            this.count=count;
            this.adult_count=adult_count;
            this.child_count=child_count;
            this.infant_count=infant_count;
            this.user_id=user_id;
        },
        ChangeS({search,FilteredJourney,go_date , back_date}){
            this.search=search;
            this.FilteredJourney=FilteredJourney;
            if(this.FilteredJourney.length == 0){
                this.empty=true
            }
            else {
                this.empty=false
            }
            this.go_date=go_date;
            this.back_date=back_date;
        },
        ChangeC({Complete,id,degree_id}){
            this.Complete=Complete;
            this.chosenjourney=this.FilteredJourney.filter((Journey)=>{return Journey.id==id});      
            if (this.chosenjourney[0].economic && this.chosenjourney[0].economic[0].det=='go') {
                this.JourneyKind='ذهاب فقط';
            } else if (this.chosenjourney[0].economic && this.chosenjourney[0].economic[0].det !='go') {
                this.JourneyKind='ذهاب وعودة';
            } else if (this.chosenjourney[0].vip && this.chosenjourney[0].vip[0].det =='go') {
                this.JourneyKind='ذهاب فقط';
            } else if (this.chosenjourney[0].vip && this.chosenjourney[0].vip[0].det !='go') {
                this.JourneyKind='ذهاب وعودة';
            }
            this.class=(this.chosenjourney[0].economic) ? 'درجة السياحة' : 'درجة رجال الأعمال'
            this.price=(this.chosenjourney[0].economic) ?  this.chosenjourney[0].economic[0].price : this.chosenjourney[0].vip[0].price
            this.degree_id=degree_id;
        },
        async ChangeCh({Check,Alltravelers}){
            this.loading=true;
            this.Alltravelers=Alltravelers;
            this.fetchBody = {
                degree_id : this.degree_id,
                user_id: this.user_id,
                sure:this.sure,
                go_date :this.go_date,
                back_date :this.back_date,
                count  :this.count ,
                adult_count :this.adult_count ,
                child_count :this.child_count ,
                infant_count  :this.infant_count  ,
                traveler  :this.Alltravelers  ,
            }
                await axios.post(fetchUrl+"/reservations",this.fetchBody,
                    {
                    headers: {
                        Authorization: "Bearer " + this.user_info.token,
                        "Content-Type": "multipart/form-data",
                    },
                    }
                )
                .then((res) => {this.loading=false;
                    this.NewBookingInfo=res.data
                })
                .catch(error => {this.error=true
                                this.loading=false
                                this.message = error.response.data.message;});
                if (!this.error) {
                    this.Check=Check;
                }
        },
        async ChangeAdd({add,message , error}){
            this.Add=add;
            this.travelers = true;
            this.Completetravelers = true;
            await nextTick();
            this.travelers = false;
            this.Completetravelers = false;
            this.message = message
            this.error =error
        },
        async ChangeAddAcount(add){
            this.AddAcount=add;
        },
        async ChangeAddAcount2({add,message,error}){
            this.AddAcount=add;
            this.Completetravelers = true;
            await nextTick();
            this.Completetravelers = false;
            this.message = message
            this.error =error
        },
        async ChangeClose(Add){
            this.AddAcount=Add;
        },
        ChangeD(done){
            this.done=done;
        },
  },
  components: {
    AddBookingSearch,
    AddBookingDetails,
    Add,
    BigCard,
    CompleteReservation,
    TravelerData,
    CheckDetails,
    Nav,
    SideBar
    }
}
</script>