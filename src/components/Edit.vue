<template>
    <div class="edit" v-if="id==edit">
        <div class="layout"></div>
        <div class="add-popup" :class="{big:account}">
            <p class="title">{{ title }}</p>
            <div class="logo" v-if="Airlines || account">
                <p>{{ logo }}</p>
                <label for="image"><img :src="url" alt=""></label>
                <input type="file" id="image" @change="handleFileUpload($event)" required>
            </div>
            <div :class="{grid:account}">
                <div class="input-pkg" :class="{location:city , person:account}" v-if="Airlines || destination || city || account">
                    <p class="name">{{ firstInput }}</p>
                    <select v-if="destination" v-model="airline_id" required>
                    <option value="" disabled>يرجى تحديد شركة الطيران</option>
                    <option v-for="Airline in allAirlines" :value="Airline.id" >{{ Airline.name }}</option>
                    </select>
                    <input type="text" :placeholder="firstPlaceholder" :value=name @change="handleNameUpload($event)" required v-if="!destination">
                </div>
                <div class="input-pkg" :class="{ person: destination , name:account , airport:city}" v-if="destination || city || account">
                    <p class="name">{{ secInput }}</p>
                    <select v-if="destination" v-model="start_city_id" required>
                    <option value="" disabled>يرجى تحديد مدينة الإنطلاق للرحلة</option>
                    <option v-for="city in allCities" :value="city.id">{{ city.name }}</option>
                    </select>
                    <input type="text" :placeholder="secPlaceholder" :value=airport_name @change="handleAirportUpload($event)" v-if="!destination">
                </div>
                <div class="input-pkg" :class="{ person: destination , barcode:city, phone:account}" v-if="destination || city || account">
                    <p class="name">{{ thirdInput }}</p>
                    <select v-if="destination" v-model="end_city_id" required>
                    <option value="" disabled selected>يرجى تحديد مدينة الوصول</option>
                    <option v-for="city in allCities" :value="city.id">{{ city.name }}</option>
                    </select>
                    <input type="text" :placeholder="thirdPlaceholder" :value=code @change="handleCodeUpload($event)" v-if="!destination">
                </div>
                <div class="input-pkg" :class="{sec_location:account}" v-if="account && !employees">
                    <p class="name">{{ FourthInput }}</p>
                    <input type="text" :placeholder="FourthPlaceholder" :value=FourthValue>
                </div>
                <div class="input-pkg" :class="{email:account}" v-if="account">
                    <p class="name">{{ FifthInput }}</p>
                    <input type="text" :placeholder="FifthPlaceholder" :value=FifthValue>
                </div>
                <div class="input-pkg" :class="{person:account}" v-if="clients">
                    <p class="name">{{ SixthInput }}</p>
                    <div>
                        <input :type="type" :placeholder="SixthPlaceholder" :value=SixthValue>
                        <div class="show" @click="ShowPassword">إظهار</div>
                    </div>
                </div>
                <div class="input-pkg" :class="{person:account}" v-if="employees">
                    <p class="name">الصلاحيات</p>
                    <input type="text" placeholder="يرجى ادخال الصلاحيات" :value=permissionValue>
                </div>
            </div>
            <div class="btns">
                <button class="add-btn" @click='EditCard'>تعديل</button>
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

.add-popup.big{
    width: 55.8333vw;
}

.edit .add-popup .title{
    font-size: 25px;
    color: #4C535F;
    padding: 1.574vh 1.875vw 2.1296vh;
    border-bottom: 1px solid #F4F6F9;
}

.edit .add-popup .logo{
    margin: 1.6666vh 2.7083vw;
}
.edit .add-popup .logo p{
    font-size: 17px;
    color: #2F3746;
    margin-bottom: 1.8518vh;
}

.edit .add-popup .logo label{
    width: 123px;
    height: 123px;
    border: none;
    border-radius: 14px;
    background-color: #EDF0F5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.edit .add-popup .logo input{
    display: none;
}

.edit .add-popup .input-pkg .name{
    font-size: 17px;
    color: #2F3746;
    padding: 1.574vh 2.8645vw 1.944vh 0;
}

.edit .add-popup .input-pkg input{
    width: 36.1979vw;
    height: 60px;
    margin: 0 auto;
    background-color: #EDF0F5;
    border-radius: 14px;
    border: none;
    padding-right: 19px;
    margin-bottom: 2.5925vh;
}

.edit .add-popup .input-pkg input::placeholder{
    padding: 46px;
    background-image: url("../assets/img/plane.svg");
    background-repeat: no-repeat;
    background-position: right;
}

.edit .add-popup .person input::placeholder{
    background-image: url("../assets/img/person.svg");
}

.edit  .add-popup .name input::placeholder{
    background-image: url("../assets/img/name.svg");
}

.edit .add-popup .location input::placeholder{
    background-image: url("../assets/img/white-location.svg");
}

.edit .add-popup .airport input::placeholder{
    background-image: url("../assets/img/placeholder-plane.svg");
}

.edit .add-popup .barcode input::placeholder{
    background-image: url("../assets/img/white-barcode.svg");
}

.edit  .add-popup .phone input::placeholder{
    background-image: url("../assets/img/phone.svg");
}
.edit .add-popup .sec_location input::placeholder{
    background-image: url("../assets/img/location-minus.svg");
}
.edit  .add-popup .email input::placeholder{
    background-image: url("../assets/img/email.svg");
}

.edit .add-popup .input-pkg input:focus{
    border: none;
    outline: none;
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

.edit .add-popup img{
    position: absolute;
    top: 54%;
    right: -15%;
    width: 30vh;
    transform: rotate(270deg);
}

.add-popup .logo img{
    position: static;
    transform: rotate(0);
}

.edit .add-popup .grid{
    display: grid;
    grid-template-columns: repeat(2 , auto);
}

.edit .add-popup .grid .block{
    grid-area: 1/1 /1 /3;
}

.edit .add-popup .grid .input-pkg.block input{
    width: 34.625vw;
    margin-right: 2.489vw;
}

.edit .add-popup .grid .input-pkg input{
    width: 25.729vw;
    height: 4.7222vh;
    border-radius: 0.7291vw;
}
</style>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            show:false,
            type:"password",
            test:"",
            message:"",
            newImage:null,
            name:this.firstValue,
            airport_name:this.secValue,
            code:this.thirdValue,
            airline_id:this.firstValue,
            start_city_id:this.secValue,
            end_city_id:this.thirdValue,
            fetchBody:{},
            loading: false,
            error: false,
            url:"./src/assets/img/add-grey.svg",
            user_info: JSON.parse(localStorage.getItem("user_info")),
        }
        },
    props: {
        title: String,
        logo: String,
        Airlines: Boolean,
        destination: Boolean,
        city: Boolean,
        account: Boolean,
        clients: Boolean,
        employees: Boolean,
        api: String,
        secValue: String,
        image:String,
        firstValue:String,
        firstInput: String,
        firstPlaceholder: String,
        secInput: String,
        secPlaceholder: String,
        thirdInput: String,
        thirdPlaceholder: String,
        thirdValue: String,
        FourthInput: String,
        FourthPlaceholder: String,
        FourthValue: String,
        FifthInput: String,
        FifthPlaceholder: String,
        FifthValue: String,
        SixthInput: String,
        SixthPlaceholder: String,
        SixthValue: String,
        permissionValue: String,
        edit: Number,
        id: Number,
        allCities:Array,
        allAirlines:Array,
    },    
    methods:{
        async EditCard(){
            this.loading=true;
            this.fetchBody=this.handlefetchBody();
            await axios.post(fetchUrl+this.api+"/"+this.id,this.fetchBody,
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
                this.$emit('ChangeClose',{edit:-1 , message: this.message , error: this.error})
        },
    passClose()
    {
      this.$emit('passClose',-1)
    },
    ShowPassword(){
        this.show=! this.show;
        this.type= this.show ? "text" : "password"
    },
    handleFileUpload( event ){
        this.newImage = event.target.files[0];
    },
    handleNameUpload( event ){
        this.name = event.target.value;
    },
    handleAirportUpload( event ){
        this.airport_name = event.target.value;
    },
    handleCodeUpload( event ){
        this.code = event.target.value;
    },
    handlefetchBody (){
        let obj = {
            name : this.name,
            image : this.newImage,
            _method: "PUT"
        }
        if (this.city) {
            obj={
                name : this.name,
                airport_name : this.airport_name,
                code:this.code,
                _method: "PUT"
            }
        }else if(this.destination){
            obj={
                airline_id:this.airline_id,
                start_city_id:this.start_city_id,
                end_city_id:this.end_city_id,
                _method: "PUT"
            }
        }
        return obj;
    }
  },
  created(){
    this.url=imageUrl + this.image
  }
}
</script>