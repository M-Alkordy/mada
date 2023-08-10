<template>
    <div class="Complete-reservation" v-if="Complete">
        <h2>لإتمام عملية الحجز يرجى ملئ الحقول ادناه</h2>
        <p class="head">حساب المستخدم</p>
        <div class="account">
            <div class="choose-account" @click="OpenList=!OpenList">
                <img src="./../assets/img/person.svg" class="person" v-if="!hide">
                <span v-if="!hide">يرجى تحديد اسم المستخدم</span>
                <img src="./../assets/img/arrow-down-grey.svg" class="arrow" v-if="!hide">
                <img :src=AccountPicture alt="" v-if="hide" style="width: 30px; height: 30px;">
                <span>{{ selected }}</span>
            </div>
            <div class="list" v-if="OpenList">
                <p @click='passAdd'>+ إضافة مستخدم جديد </p>
                <div class="list-item" v-for="user in allUsers" @click="SelectedValue([user.name , user.image , user.id])">
                    <img :src=user.image style="width: 20px; height: 20px;">
                    <span>{{user.name}}</span> 
                </div>
            </div>
            <form @submit='passCreate($event)'>
                <div class="number-traveler">
                    <p>حدد عددالمسافرين</p>
                    <input type="text" v-model="count">
                </div>
                <div v-for="(item, index) in v$.count.$errors" :key="index" class="error-box">
                    <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                </div>
                <div class="kind-traveler">
                    <div class="old">
                        <p>كبير</p>
                        <input type="text" v-model="adult_count" disabled>
                    </div>
                    <div v-if="$props.validate=='true'" v-for="(item, index) in v$.adult_count.$errors" :key="index" class="error-box">
                    <span class="valid_msg p-lg-0">{{item.$message}}</span>
                </div>
                    <div class="child">
                        <p>طفل</p>
                        <input type="text" v-model="child_count" disabled>
                    </div>
                    <div v-if="$props.validate=='true'" v-for="(item, index) in v$.child_count.$errors" :key="index" class="error-box">
                    <span  class="valid_msg p-lg-0">{{item.$message}}</span>
                </div>
                    <div class="baby">
                        <p>رضيع</p>
                        <input type="text" v-model="infant_count" disabled>
                    </div>
                    <div v-for="(item, index) in v$.infant_count.$errors" :key="index" class="error-box">
                    <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                </div>
                </div>
                <div class="Reservation-type">
                    <p style="margin-top: 10px;">حدد نوع الحجز</p>
                    <div class="radio">
                        <input type="radio" name="type" id="temporary" value="0" @click="SureTypeHandel($event)">
                        <label for="temporary">حجز مؤقت</label>
                        <input type="radio" name="type" id="Certain" value="1" @click="SureTypeHandel($event)">
                        <label for="Certain">حجز مؤكد</label>
                    </div>
                </div>
                <div class="btns">
                    <button class="next" type="submit">التالي</button>
                    <button class="close" @click='passBack'>إلغاء الأمر</button>
                </div>
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
    </div>
</template>

<style>
.Add-booking .body .Complete-reservation{
    width: calc(92.875% - 34.3749vw);
    height: 110%;
    border-radius: 22px;
    padding: 1.357vh 0;
    background-color: #ffff;
    position: relative;
    top: -19px;
    transform: scale(0.9);
}

.Add-booking .body .Complete-reservation h2{
    font-size: 1.0416vw;
    color: #2E3092;
    margin-bottom: 2.0534vh;
    margin-right: 3.6458vw;
}

.Add-booking .body .Complete-reservation .account{
    margin-right: 3.6458vw;
    display: flex;
    flex-direction: column;
    gap: 1.7811vh;
}
.Add-booking .body .Complete-reservation p{
    font-size: 1.0416vw;
    color: #2F3746;
    margin-bottom: 1.1874vh;
}

.Add-booking .body .Complete-reservation .head{
    margin-right: 3.6458vw;
}

.Add-booking .body .Complete-reservation .choose-account{
    width: 30.5729vw;
    height: 6.8702vh;
    border-radius: 14px;
    background-color: #EDF0F5;
    display: flex;
    align-items: center;
    padding-right: 19px;
    cursor: pointer;
    position: relative;
}

.Add-booking .body .Complete-reservation .number-traveler input{
    width: 30.5729vw;
    height: 5.8702vh;
    border-radius: 14px;
    background-color: #EDF0F5;
    padding-right: 19px;
    border: none;
    outline: none;
}

.Add-booking .body .Complete-reservation .choose-account span{
    padding-right: 14px;
    font-size: 0.8854vw;
    color: #CCD3DF;
}

.Add-booking .body .Complete-reservation .choose-account .arrow{
    margin-right: 13.4583vw;
}

.Add-booking .body .Complete-reservation  .list{
    width: 26.927vw;
    height: 27.5657vh;
    background-color: #ffff;
    position: absolute;
    top: 23%;
    right: 52%;
    transform: translateX(50%);
    border-radius: 6px;
    padding: 1.1874vh 0;
    overflow-y: auto;
    cursor: pointer;
}

.Add-booking .body .Complete-reservation .list p{
    color: #2E3092;
    font-size: 0.9895vw;
    padding-right: 1.2864vw;
    padding-bottom: 1.5097vh;
    margin: 0 0.625vw;
    border-bottom: 1px solid #707070;
}

.Add-booking .body .Complete-reservation .list .list-item{
    display: flex;
    align-items: center;
    margin-top: 1.5267vh;
    margin-right: 1.9114vw;
}

.Add-booking .body .Complete-reservation .kind-traveler{
    display: flex;
    justify-content: space-between;
    margin-left: 4.5833vw;
}

.Add-booking .body .Complete-reservation .kind-traveler input{
    width: 8.90625vw;
    height: 5.6157vh;
    border-radius: 14px;
    outline: none;
    border: none;
    background-color: #EDF0F5;
    padding-right: 10px;
}

.Add-booking .body .Complete-reservation .Reservation-type .radio{
    display: flex;
    align-items: center;
}
.Add-booking .body .Complete-reservation .Reservation-type label{
    font-size: 0.9895vw;
    margin-left: 65px;
    margin-right: 5px;
}

.Add-booking .body .Complete-reservation .btns{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 1.8668vh;
    margin-right: -1.3020vw;
}
.valid_msg{
        color: red;
        font-size: 13px;
        padding-left: 10px;
        margin: 10px 40px;
    }
.Add-booking .body .Complete-reservation .next , .Add-booking .body .Complete-reservation .close{
    width: 9.375vw;
    height: 5.8961vh;
    background-color: #2E3092;
    color: white;
    font-size: 0.8854vw;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}

.Add-booking .body .Complete-reservation .close{
    background-color: #EDF0F5;
    color: #8D98AA;
}
</style>

<script>
import axios from 'axios';
import { useBookingStore } from '../stores/booking'
import { mapState } from 'pinia'
import AddBookingSearch from '../components/AddBookingSearch.vue';
import  useVuelidate  from '@vuelidate/core'
import { required ,helpers, numeric} from '@vuelidate/validators'

export default {
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
        data(){
        return{
            search:false,
            OpenList:false,
            hide:false,
            selected:'',
            AccountPicture:'',
            count: '',
            sure:'',
            adult_count: '',
            child_count: '',
            infant_count: '',
            user_id: '',
            message: '',
            allUsers: [],
            loading: false,
            error: false,
            vuelidateExternalResults:{
                count:[],
                adult_count:[],
                child_count:[],
                infant_count:[]
            },
            }
        },
        validations() {
            return{
                count:{ required: helpers.withMessage('العدد الكلي مطلوب', required)},
                adult_count:{ required: helpers.withMessage('عدد البالغين مطلوب', required)},
                child_count:{ required: helpers.withMessage('عدد الأطفال مطلوب', required)},
                infant_count:{ required: helpers.withMessage('عدد الرضع مطلوب', required)},
                }
             
        },
        props: {
            Complete:Boolean,
        },  
        mounted(){
            this.adult_count=this.booking?.adults;
            this.child_count=this.booking?.childs;
            this.infant_count=this.booking?.babies;
            this.count=this.booking?.count;

            console.log(this.adult_count);
        } , 
        methods:{
            SelectedValue(array){
                

            this.selected=array[0];
            this.AccountPicture=array[1];
            this.user_id=array[2];
            console.log(this.booking);
            this.OpenList=false;
            this.hide=true;
        },
        passCreate(event)
            {
                this.vuelidateExternalResults.count=[];
                this.vuelidateExternalResults.adult_count=[];
                this.vuelidateExternalResults.child_count=[];
                this.vuelidateExternalResults.infant_count=[];
                if (this.v$.$invalid){
                           return;
                        }
            event.preventDefault();
            this.$emit('ChangeCreateAccount',{
                        travelers:true,
                        sure:this.sure,
                        user_id:this.user_id,
                        count:this.count,
                        adult_count:this.adult_count,
                        child_count:this.child_count,
                        infant_count:this.infant_count,
                    })
            },
        passBack()
            {
            this.$emit('Cancel',false)
            },
            passAdd()
            {
            this.$emit('ChangeAdd',true)
            },
            SureTypeHandel(event){
                this.sure=event.target.value;
            }
        },
        components: {
        AddBookingSearch
        },
        computed:{
        ...mapState(useBookingStore,['booking'])
        },
        created(){
            this.count=Number(this.booking.babies) + Number(this.booking.childs) + Number(this.booking.babies);
            this.loading=true;
            axios.get(fetchUrl+"/users", 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading=false;
                    this.allUsers=res.data.filter((user) =>{return user.role == "user"});
                    this.allUsers.forEach(user => {
                        user.image= (user.image)? imageUrl+user.image : './src/assets/img/profile-pic.svg';
                    })
                })
                .catch(error => {this.error=true
                                this.loading=false
                                this.message = error.response.data.message;});
            },
            watch:{
                booking: {
                        handler(val){
                            this.adult_count=this.booking.adults;
                            this.child_count=this.booking.childs;
                            this.infant_count=this.booking.babies;
                            this.count=this.booking.count
                            console.log(this.booking);
                        },
                        deep: true,
                    },
                    // adult_count(_new,_old){
                    //     this.count=Number(this.booking.babies) + Number(this.booking.childs) + Number(this.booking.babies);
                    // }

                },
        }  
        </script>