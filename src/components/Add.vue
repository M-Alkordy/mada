<template>
    <div class="add">
        <div class="layout"></div>
        <div class="add-popup" :class="{big:account , huge:setting||Class}">
            <p class="title" :class="{book:booking}">{{ title }}</p>
            <p class="description" v-if="booking">{{ description }}</p>
            <div class="logo" v-if="Airlines || employees">
                <p>{{ logo }}</p>
                <label for="image">
                    <img :src=url alt="" v-if="!account" style="width: 100%; height: 100%;">
                    <img :src=url alt="" v-if="account" class="person" style="width: 100%; height: 100%;">
                </label>
                <input type="file" id="image" @change="handleFileUpload($event)" required ref="image">
                <div v-if="$props.validate=='true'" v-for="(item, index) in v$.image.$errors" :key="index" class="error-box">
                    <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                </div>
            </div> 
            <div :class="{grid:account||Class}">
                <div class="input-pkg" :class="{location:city , person:account , pic:booking , small:setting , block:Class , ticket:cancel}" v-if="Airlines || destination ||city || account || booking || setting ||cancel">
                    <p class="name">{{ firstInput }}</p>
                    <input type="text" :placeholder="firstPlaceholder" required v-model="name" v-if="!destination">
                    <div v-if="$props.validate=='true'" v-for="(item, index) in v$.name.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <select v-if="destination" v-model="airline_id" required>
                        <option value="" disabled>يرجى تحديد شركة الطيران</option>
                        <option v-for="Airline in allAirlines" :value="Airline.id">{{ Airline.name }}</option>
                    </select>
                    <div v-if="$props.validate=='destinations'" v-for="(item, index) in v$.airline_id.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <input type="text" :placeholder="settingPlaceholder" v-if="setting" class="baby" v-model="infant">
                </div>
                <div class="input-pkg"  v-if=" booking">
                    <div v-for="traveler in specificsInfo.travelers">
                        <p class="name">رقم تذكرة المسافر ({{ traveler.name}}  {{ traveler.nickname }})</p>
                        <input type="text" @change="handleticket_id($event)">
                    </div>
                </div>
                <div class="input-pkg " :class="{ person: destination||cancel , airport:city||Class , name:account , pic:booking , pic:setting , small:Class}" v-if="destination || city  || setting">
                    <p class="name">{{ secInput }}</p>
                    <select v-if="destination" v-model="start_city_id" required>
                    <option value="" disabled>يرجى تحديد مدينة الإنطلاق للرحلة</option>
                    <option v-for="city in allCities" :value="city.id">{{ city.name }}</option>
                    </select>
                    <div v-if="$props.validate=='destinations'" v-for="(item, index) in v$.start_city_id.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <input type="text" :placeholder="secPlaceholder" v-model="airport_name" v-if="!destination">
                    <div v-if="$props.validate=='cities'" v-for="(item, index) in v$.airport_name.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                </div>
                <div class="input-pkg " :class="{ person: destination , barcode:city , phone:account||cancel , pic:booking , pic:setting , row:Class , airport:Class}" v-if="destination || city || account || setting ||Class">
                    <p class="name">{{ thirdInput }}</p>
                    <div v-if= "!account">
                        <div v-if="!Class">
                            <input type="text" :placeholder="thirdPlaceholder"  v-model="barcode" v-if="!destination">
                            <div v-if="$props.validate=='cities'" v-for="(item, index) in v$.barcode.$errors" :key="index" class="error-box">
                                <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                            </div>
                        </div>
                    </div>
                    <select v-if="destination" v-model="end_city_id" required>
                    <option value="" disabled selected>يرجى تحديد مدينة الوصول</option>
                    <option v-for="city in allCities" :value="city.id">{{ city.name }}</option>
                    </select>
                    <div v-if="$props.validate=='destinations'" v-for="(item, index) in v$.end_city_id.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <select v-if="Class" v-model="travel_id" required @change="handelEconomic()">
                        <option value="" disabled selected>يرجى تحديد الرحلة</option>
                        <option v-for="travel in allTravels" :value="travel.id">شركة الطيران : {{ travel.destination.airline.name }} | مدينة الانطلاق: {{ travel.destination.start_city.name }} | مدينة الوصول: {{ travel.destination.end_city.name }}</option>
                    </select>
                    <div v-if="$props.validate=='close_book'" v-for="(item, index) in v$.travel_id.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <div class="number" v-if= "account">
                        <select v-model="phone_code">
                            <option value="" disabled>اختر البلد</option>
                            <option v-for="item in code" :value= "`+` + item.dial_code">{{ item.name }}</option>
                        </select>
                        <input type="text" name="phone_code" class="phone_code" :value="phone_code" readonly required>
                        <input type="text" placeholder='phone number' class='phone' required v-model="phone">
                    </div>
                </div>
                <div class="input-pkg " :class="{ sec_location: account , pic:booking , small:Class , Class:Class}" v-if="(Class) && !employees ||cancel">
                    <p class="name">{{ FourthInput }}</p>
                    <select v-if="Class" v-model="degree_id" required style="margin-right: 2.489vw; width: 75%;">
                        <option value="" disabled selected>يرجى تحديد الدرجة</option>
                        <option v-for="d in degree" :value="d.id">{{ d.title }}</option>
                    </select>
                    <div v-if="$props.validate=='close_book'" v-for="(item, index) in v$.degree_id.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <p class="name">عدد المقاعد</p>
                    <input type="number" name="phone_code" class="phone_code" v-model="chairs">
                    <div v-if="$props.validate=='close_book'" v-for="(item, index) in v$.chairs.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                    <input type="text" :placeholder="FourthPlaceholder" v-if="!Class" v-model="phone_number">
                </div>
                <div class="input-pkg " :class="{ email: account , small:Class , pic:Class}" v-if="account ||Class">
                    <p class="name">{{ FifthInput}}</p>
                    <input type="text" :placeholder="FifthPlaceholder" v-if="!Class" v-model="email">
                    <input type="date" :placeholder="FifthPlaceholder" v-if="Class" v-model="date">
                    <div v-if="$props.validate=='close_book'" v-for="(item, index) in v$.date.$errors" :key="index" class="error-box">
                        <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                    </div>
                </div>
                <div class="input-pkg " :class="{ person: account}" v-if="clients || employees">
                    <p class="name">{{ SixthInput }}</p>
                    <div v-if="edit" class="pass">
                        <label for="pass">تغيير كلمة السر</label>
                        <input type="checkbox" id="pass" @click="changePass = !changePass" style="width: 15px; display: inline;">
                    </div>
                    <div v-if="changePass && edit">
                        <input :type="type" :placeholder="SixthPlaceholder" v-model="password" style="margin-bottom: 0;">
                        <div class="show" @click="ShowPassword">إظهار</div>
                    </div>
                    <div v-if="!edit">
                        <input :type="type" :placeholder="SixthPlaceholder" v-model="password" style="margin-bottom: 0;">
                        <div class="show" @click="ShowPassword">إظهار</div>
                    </div>
                    
                </div>
                <div class="input-pkg " :class="{ employees: employees}" v-if="employees">
                    <p class="name">الصلاحيات</p>
                    <select v-model="role" required>
                    <option value="" disabled>يرجى إختيار الصلاحيات</option>
                    <option value="super_admin">كامل الصلاحيات</option>
                    <option value="admin_reservations">الحجوزات</option>
                    <option value="admin_travels">الرحلات</option>
                    <option value="admin_basics">الأساسيات</option>
                    </select>             
                </div>
            </div>
            <div class="btns">
                <button class="add-btn" :class="{ none: setting||Class}" @click='passEvent' v-if="!booking && !edit">إضافة</button>
                <button class="add-btn" :class="{ none: setting||Class}" @click='passEdit' v-if="edit">تعديل</button>
                <button class="add-btn" @click='passSpecifics' v-if="booking">تأكيد الحجز</button>
                <button class="add-btn" @click='passEvent()' v-if="setting">حفظ الاعدادات</button>
                <button class="add-btn" @click='savechanges()' v-if="Class">حفظ الاعدادات</button>
                <button class="close" @click='passClose'>إلغاء الأمر</button>
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
          <p> {{ message }}</p>
          <img src="./../assets/img/error.png" alt="">
        </div>
      </div>
    </div>
</template>

<style scoped>
.layout{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: #2F3746;
    opacity: 0.6;
}

.add-popup{
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

.add-popup .btns .none{
    display: none;
}

.add-popup .pass{
    display: flex; 
    justify-content: center; 
    align-items: center;
    padding-right: 2.489vw;
}

.add-popup select{
    appearance:button;
    cursor: pointer;
}

.add-popup.big{
    width: 55.8333vw;
}

.add-popup.huge{
    width: 45.833vw;
}

.add-popup.huge{
    width: 45.833vw;
}

.add-popup .grid{
    display: grid;
    grid-template-columns: repeat(2 , auto);
}

.add-popup .grid .block{
    grid-area: 1/1 /1 /3;
}

.add-popup .grid .input-pkg.block input{
    width: 34.625vw;
    margin-right: 2.489vw;
}

.add-popup .title{
    font-size: 1.3020vw;
    color: #4C535F;
    padding: 17px 36px 23px;
    border-bottom: 1px solid #F4F6F9;
}

.add-popup .title.book{
    font-size: 1.3020vw;
    color: #4C535F;
    padding: 17px 36px 0px;
    border-bottom: none;
}

.add-popup .description{
    font-size: 0.9895vw;
    color: #717B8C;
    padding: 17px 36px 23px;
    border-bottom: 1px solid #F4F6F9;
}

.add-popup .logo{
    margin: 18px 2.489vw;
}
.add-popup .logo p{
    font-size: 17px;
    color: #2F3746;
    margin-bottom: 10px;
}

.add-popup .logo label{
    width: 6.3541vw;
    height: 6.3541vw;
    border: 1px dashed #8D98AA;
    background-color: #EDF0F5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.add-popup .logo label .person{
    width: 40px;
}

.add-popup .logo input{
    display: none;
}

.add-popup .input-pkg .name{
    font-size: 17px;
    color: #2F3746;
    padding: 1.574vh 2.489vw 1.944vh 0;
}

.add-popup .input-pkg input,
.add-popup .input-pkg select
{
    width: 36.1979vw;
    height: 5.5555vh;
    display: block;
    margin: 0 auto;
    background-color: #EDF0F5;
    border-radius: 14px;
    border: none;
    padding-right: 19px;
    padding-left: 19px;
    margin-bottom: 2.5925vh;
}

.add-popup .input-pkg.employees select{
    width: 23.1979vw;
}

.add-popup .grid .input-pkg input{
    width: 25.729vw;
    height: 4.7222vh;
    border-radius: 0.7291vw;
}

.add-popup .input-pkg.small input{
    width: 18.5937vw;
    display: inline;
    margin-right: 2.489vw;
}
.add-popup .input-pkg.row{
    grid-area: 1/1/1/3;
}

.add-popup .input-pkg input::placeholder{
    padding: 46px;
    background-image: url("../assets/img/plane.svg");
    background-repeat: no-repeat;
    background-position: right;
}

.add-popup .input-pkg.pic input::placeholder{
    padding: 46px;
    background-image: none;
}
.add-popup .input-pkg.small.pic input::placeholder{
    padding: 46px;
    background-image: none;
}

.add-popup .input-pkg.small input::placeholder{
    background-image: url("../assets/img/grey-child.svg");
}

.add-popup .input-pkg.small .baby::placeholder{
    background-image: url("../assets/img/grey-baby.svg");
}

.add-popup .person input::placeholder{
    background-image: url("../assets/img/person.svg");
}

.add-popup .ticket input::placeholder{
    background-image: url("../assets/img/ticket.svg");
}

.add-popup .location input::placeholder{
    background-image: url("../assets/img/white-location.svg");
}

.add-popup .airport input::placeholder{
    background-image: url("../assets/img/placeholder-plane.svg");
}

.add-popup .input-pkg.small.airport input::placeholder{
    background-image: url("../assets/img/placeholder-plane.svg");
}

.add-popup .input-pkg.small.Class input::placeholder{
    background-image: url("../assets/img/office-chair.svg");
}

.add-popup .barcode input::placeholder{
    background-image: url("../assets/img/white-barcode.svg");
}

.add-popup .name input::placeholder{
    background-image: url("../assets/img/name.svg");
}

.add-popup .phone input::placeholder{
    background-image: url("../assets/img/phone.svg");
}
.add-popup .sec_location input::placeholder{
    background-image: url("../assets/img/location-minus.svg");
}
.add-popup .email input::placeholder{
    background-image: url("../assets/img/email.svg");
}

.add-popup .input-pkg input:focus{
    border: none;
    outline: none;
}

.add-popup .input-pkg div{
    position: relative;
}

.add-popup .input-pkg .show{
    width: 14.7773%;
    height: 78.8461%;
    border-radius: 0.625vw;
    color: #8D98AA;
    font-size: 0.78125vw;
    background-color: #ffff;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 9%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.add-popup .btns{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 57px;
    margin-bottom: 22px;
}

.add-popup .add-btn , .add-popup .close{
    width: 226px;
    height: 60px;
    background-color: #2E3092;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}

.add-popup .close{
    margin-right: 12.0312vw;
    background-color: #EDF0F5;
    color: #8D98AA;
}

.add .add-popup img{
    position: absolute;
    top: 54%;
    right: -15%;
    width: 30vh;
    transform: rotate(270deg);
}
.valid_msg{
        color: red;
        font-size: 13px;
        padding-left: 10px;
        margin: 10px 40px;
    }
.add-popup .input-pkg .number select{
    font-size: small;
    appearance: button;
    width: 70px;
    border: 2px solid #D3D3D3;
    color: #D3D3D3;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.add-popup .input-pkg .number select option{
    font-size: small;
    color: black;
}

.add-popup .input-pkg .number .phone_code{
    width: 50px;
    margin-left: 10px;
    color: #D3D3D3;
    box-shadow: 0px 2px 0px 0px white;
    padding: 0;
    text-align: center;
}

.add .add-popup .input-pkg .number{
    display: flex;
    justify-content: space-between;
}

.add .add-popup .input-pkg .phone{
    width: 205px;
}
</style>

<script>
import axios from 'axios';
import telCode from'../assets/code.js'
import  useVuelidate  from '@vuelidate/core'
import { required ,helpers, numeric} from '@vuelidate/validators'
import { stringifyExpression } from '@vue/compiler-core';

export default {
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
    data(){
        return{
            show:false,
            type:"password",
            image: null,
            name:"",
            infant:"",
            image:'',
            airport_name:"",
            barcode: "" ,
            phone_number: "",
            airline_id:"",
            start_city_id:"",
            end_city_id:"",
            travel_id:"",
            degree_id:"" ,
            date: "" ,
            role: "" ,
            validate:false,
            loading: false,
            error: false,
            close:true,
            changePass: false,
            degree:[],
            ticket_id:[],
            user_info: JSON.parse(localStorage.getItem("user_info")),
            fetchBody:{},
            discounts:{},
            code:telCode,
            phone_code: '',
            phone: '',
            message: '',
            password:null,
            
            url: (!this.account) ? "./src/assets/img/add-grey.svg" : "./src/assets/img/person.svg",
            vuelidateExternalResults:{
                name:[],
                date:[],
                image:[],
                barcode:[],
                airport_name:[],
                start_city_id:[],
                end_city_id:[],
                airline_id:[],
                travel_id:[],
                degree_id:[],
                chairs:[],
            },
        }
        },
        validations() {
        var optional = (value) => true;
        var required_if_add = (value) => { return this.operation != 'edit' || value }
        if(this.$props.validate=='true'){
            return{
                name:{ required: helpers.withMessage('اسم الشركة مطلوب', required)},
                image:{ required: helpers.withMessage('لوغو الشركة مطلوب', required)},
                }
             }else if(this.$props.validate=='cities'){
                return {
               barcode:{ required: helpers.withMessage('كود الشركة مطلوب', required),numeric: helpers.withMessage('كود الشركة يجب ان يكون رقم', numeric)},
               airport_name:{ required: helpers.withMessage('اسم المطار مطلوب', required)}
                }
             }
             else if(this.$props.validate=='destinations'){
                return {
               airline_id:{ required: helpers.withMessage('تحديد الشركة مطلوب', required)},
               start_city_id:{ required: helpers.withMessage('مدينة الانطلاق مطلوبة', required)},
               end_city_id:{ required: helpers.withMessage('مدينة الوصول مطلوبة', required)}
                }
             }else if(this.$props.validate=='close_book'){
                return {
               travel_id:{ required: helpers.withMessage('تحديد الرحلة مطلوب', required)},
               degree_id:{ required: helpers.withMessage('تحديد الدرجة  مطلوبة', required)},
               chairs:{numeric},
               date:{ required: helpers.withMessage('تحديد التاريخ مطلوب', required)},
                }
             }
             
        },
    props: {
        title: String,
        logo: String,
        degree:null,
        firstInput: String,
        validate:null,
        firstPlaceholder: String,
        settingPlaceholder: String,
        secInput: String,
        secPlaceholder: String,
        thirdInput: String,
        thirdPlaceholder: String,
        FourthInput: String,
        FourthPlaceholder: String,
        FifthInput: String,
        FifthPlaceholder: String,
        SixthInput: String,
        SixthPlaceholder: String,
        description: String,
        firstValue: String,
        Airlines: Boolean,
        city: Boolean,
        destination: Boolean,
        Class: Boolean,
        account: Boolean,
        booking: Boolean,
        setting: Boolean,
        cancel: Boolean,
        employees: Boolean,
        clients: Boolean,
        edit: Boolean,
        api: String,
        allCities:Array,
        allAirlines:Array,
        allTravels:Array,
        editemployeinfo:Object,
        specificsInfo:Object
    },    
    methods:{
        async passEvent()
    {   
        this.vuelidateExternalResults.name=[];
        this.vuelidateExternalResults.name=[];
        this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
        this.loading = true;
        console.log('hh');
        this.fetchBody=this.handlefetchBody();
        await axios.post(fetchUrl+ this.api,this.fetchBody,
                    {
                    headers: {
                        Authorization: "Bearer " + this.user_info.token,
                        "Content-Type": "multipart/form-data",
                    },
                    }
                )
                .then((res) => {
                    this.loading=false;
                })
                .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;
                });
        this.$emit('ChangeAdd',{add:false , message: this.message , error: this.error})
    }, 
    savechanges(){
        this.vuelidateExternalResults.travel_id=[];
        this.vuelidateExternalResults.degree_id=[];
        this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
        var data = {
            degree_id:this.degree_id,
            close_date:this.date,
            chairs:this.chairs,
        }
        axios.post(fetchUrl+`/travels/close_degree`,data,
                {
                headers: {
                    Authorization: "Bearer " + this.user_info.token,
                    "Content-Type": "multipart/form-data",
                },
                }
            )
            .then((res) => {this.loading=false})
            .catch(error => {this.error=true
                            this.loading=false
                            this.message = error.response.data.message;});
    },
        async passEdit()
    {
        this.loading = true;
        this.fetchBody=this.handlefetchBody();
        await axios.post(fetchUrl+ `/user/${this.editemployeinfo.id}/update`,this.fetchBody,
                    {
                    headers: {
                        Authorization: "Bearer " + this.user_info.token,
                        "Content-Type": "multipart/form-data",
                    },
                    }
                )
                .then((res) => {
                    this.loading=false;
                    })
                .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
        this.$emit('ChangeAdd',{add:false , message: this.message , error: this.error});
    }, 
    async passSpecifics()
    {
        this.loading=true;
        this.fetchBody=this.handlefetchBody();
        await axios.post(fetchUrl + `/reservations/${this.specificsInfo.id}/confirm`,this.fetchBody,
                    {
                    headers: {
                        Authorization: "Bearer " + this.user_info.token,
                        "Content-Type": "multipart/form-data",
                    },
                    }
                )
                .then((res) => {
                    this.loading=false;
                    })
                .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
        this.$emit('ChangeSpecifics',{add:false , message: this.message , error: this.error});
    },
    passAdd()
    {
      this.$emit('ChangeAdd',false)
    },
    passClose()
    {
      this.$emit('ChangeClose',false);
      this.close=!this.close;
    },
    ShowPassword(){
        this.show=! this.show;
        this.type= this.show ? "text" : "password"
    },
    handleFileUpload( event ){
        this.image = event.target.files[0];
        this.url = URL.createObjectURL(this.image)
    },
    handleticket_id( event ){
        this.ticket_id.push(event.target.value);
    },
    handlefetchBody (){
        let obj = {
            name : this.name,
            image : this.image,
        }
        if (this.city) {
            obj={
                name : this.name,
                airport_name : this.airport_name,
                code:this.barcode
            }
        }else if(this.destination){
            obj={
                airline_id:this.airline_id,
                start_city_id:this.start_city_id,
                end_city_id:this.end_city_id,
            }
        }else if(this.Class){
            obj={
                degree_id:this.degree_id,
                close_date:this.date,
            }
        } else if(this.account && !this.employees && !this.edit){
            obj = {
                name : this.name,
                email:this.email,
                phone_code: this.phone_code,
                phone: this.phone,
                password: this.password,
            }
        } else if(this.account && !this.employees && this.edit){
            obj = {
                name : this.name,
                email:this.email,
                phone_code: this.phone_code,
                phone: this.phone,
                password: this.password,
                image: null,
                delete_image: 0,
                _method: "PUT",
                role: "user"
            }
        }
         else if(this.employees && !this.edit){
            obj = {
                name : this.name,
                email:this.email,
                phone_code: this.phone_code,
                phone: this.phone,
                password: this.password,
                role: this.role,
                image: this.image,
            }
        }else if(this.employees && this.edit){
            obj = {
                name : this.name,
                email:this.email,
                phone_code: this.phone_code,
                phone: this.phone,
                password: this.password,
                role: this.role,
                image: this.image,
                delete_image: 0,
                _method: "PUT"
            }
        } else if(this.setting){
            obj = {
                    child : parseInt(this.name),
                    tax_before:parseInt(this.airport_name) ,
                    tax_after:parseInt(this.barcode) ,
                    infant: parseInt(this.infant),
            }
        }
        else if(this.booking){
            obj = {
                booking_REF :this.name,
                ticket_id:this.ticket_id ,
                _method: "PUT"
            }
        }
        else if(this.cancel){
            obj = {
                phone_number:parseInt(this.phone_number),
                ticket_id:parseInt(this.name) ,
            }
        }
        return obj;
    },
    handelEconomic(){
        for (let index = 0; index < this.allTravels.length; index++) {
            let travel = this.allTravels[index]
            if (travel.id==this.travel_id) {
                this.degree=travel.economic.concat(travel.vip);
            }
        }
    }
  },
  created(){
    if (this.edit && this.employees) {
        this.name=this.editemployeinfo.name
        this.phone_code=this.editemployeinfo.phone_code
        this.phone=this.editemployeinfo.phone
        this.email=this.editemployeinfo.email
        this.role=this.editemployeinfo.role
        this.url= (this.editemployeinfo.image)? imageUrl + this.editemployeinfo.image : "./src/assets/img/profile-pic.svg";
    }
    if (this.edit && this.clients) {
        this.name=this.editemployeinfo.name
        this.phone_code=this.editemployeinfo.phone_code
        this.phone=this.editemployeinfo.phone
        this.email=this.editemployeinfo.email
    }
        if (this.setting) {
            this.loading=true;
            axios.get(fetchUrl+"/discounts",
            {headers: {
                Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
            }}, 
            )
            .then(res =>{
                this.loading=false;
                this.discounts=res.data.data;
                this.name= this.discounts.child
                this.airport_name=this.discounts.tax_before
                this.barcode=this.discounts.tax_after
                this.infant=this.discounts.infant
            }
            )
            .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
        }
    },
}
/* 
 */
</script>