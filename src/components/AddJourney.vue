<template>
    <div class="journey-add">
        <div class="head">
            <h2>إضافة رحلة جديدة</h2>
            <p>يمكنك استعراض و إدارة الرحلت  في المنصة</p>
        </div>
        <div class="inputs">
            <p class="title">بيانات الرحله المطلوبة</p>
            <div class="info">
                <div class=" Destination">
                    <p>الوجهة</p>
                    <select class="airline" v-model="destination_id" required>
                        <option value="" disabled> يرجى تحديد الوجهة المطلوبة</option>
                        <option v-for="Destination in allDestinations" :value="Destination.id">شركة الطيران : {{ Destination.airline.name }} | مدينة الانطلاق: {{ Destination.start_city.name }} | مدينة الوصول: {{ Destination.end_city.name }}</option>
                    </select>
                </div>
                <div class="days">
                    <p>أيام الرحلة في الاسبوع</p>
                    <select v-model="week_days" multiple required>
                        <option v-bind:value="'Sat'">السبت</option>
                        <option v-bind:value="'Sun'">الأحد</option>
                        <option v-bind:value="'Mon'">الاثنين</option>
                        <option v-bind:value="'Tue'">الثلاثاء</option>
                        <option v-bind:value="'Wed'">الأربعاء</option>
                        <option v-bind:value="'Thu'">الخميس</option>
                        <option v-bind:value="'Fri'">الجمعة</option>
                    </select>
                </div>
                <div>
                    <p>الوزن المسموح به</p>
                    <input type="text" placeholder="يرجى ادخال  الوزن المسموح به" class="weight" v-model="weight" required>
                </div>
                <div>
                    <p>وقت المغادرة</p>
                    <input type="time" placeholder="يرجى إدخال وقت المغادرة" class="time" required v-model="leave_time">
                </div>
            </div>
            <div class="vip-ticket">
                <p class="heading">أسعار  تذاكر درجة رجال الاعمال</p>
                <div class="price">
                    <div class="go">
                    <p>سعر تذكره الذهاب فقط</p>
                    <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب لدرجة رجال الاعمال" class="money" @change="PriceHandel($event , 'vip' , 0 , 'go' , 'vip go')" v-if="!edit">
                    <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب لدرجة رجال الاعمال" class="money" @change="PriceHandel($event , 'vip' , 0 , 'go', 'vip go')" :value="(edit) ? Journey.vip[0].price : ''" v-if="edit">
                </div>
                <div class="back">
                    <p>سعر تذكره الذهاب والعودة</p>
                    <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب والعودة  لدرجة رجال الاعمال" class="money" @change="PriceHandel($event , 'vip' , 1 , 'go-back' , 'vip go-back')" v-if="!edit">
                    <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب والعودة  لدرجة رجال الاعمال" class="money" @change="PriceHandel($event , 'vip' , 1 , 'go-back' ,'vip go-back')" :value="(edit) ? Journey.vip[1].price :'' " v-if="edit">
                </div>
                </div>
            </div>
            <div class="economy-ticket">
                <p class="heading">أسعار  تذاكر درجة السياحة</p>
                <div>
                    <div class="number">
                        <p>عدد درجات السياحة</p>
                        <input type="text" placeholder="يرجى ادخال عدد درجات السياحة" v-model="numberOfEconomic" class="money" @change="NumberHundel($event)">
                    </div>
                    <div class="price">
                        <div v-for="i in parseInt(numberOfEconomic)" class="pkg">
                            <div>
                                <p>عنوان الدرجة</p>
                                <input type="text" placeholder="يرجى ادخال عنوان لدرجة السياحه" class="money" v-model="title[i-1]">
                            </div>
                            <div class="go">
                                <p>سعر تذكره الذهاب فقط</p>
                                <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب " class="money" @change="PriceHandel($event , 'economic' , 2*i , 'go' , title[i-1])" v-if="!edit">
                                <input type="text" placeholder="يرجى ادخال سعر تذكرة الذهاب " class="money" @change="PriceHandel($event , 'economic' , 2*i , 'go' , title[i-1])" :value=" (edit && Journey.economic[2*(i-1)]) ? Journey.economic[2*(i-1)].price : ''" v-if="edit">
                            </div>
                            <div class="back">
                                <p>سعر تذكره الذهاب والعودة</p>
                                <input type="text" placeholder="يرجى ادخال سعر تذكرةالذهاب والعودة" class="money" @change="PriceHandel($event , 'economic' , 2*i+1 , 'go-back', title[i-1])" v-if="!edit">
                                <input type="text" placeholder="يرجى ادخال سعر تذكرةالذهاب والعودة" class="money" @change="PriceHandel($event , 'economic' , 2*i+1 , 'go-back' , title[i-1])" :value="(edit && Journey.economic[2*(i-1)+1]) ? Journey.economic[2*(i-1)+1].price : ''" v-if="edit">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="economy-ticket">
                <p class="heading">ملاحظات إضافية</p>
                <div>
                    <div class="price">
                        <div class="pkg">
                            <div>
                                <p>نوع الرحلة</p>
                                <select v-model="type" required>
                                    <option value="">اختر نوع الرحلة</option>
                                    <option value="most">هامة جداً</option>
                                    <option value="important">هامة</option>
                                    <option value="normal">عادية</option>
                                </select>
                            </div>
                            <div class="note">
                                <p>وصف الرحلة</p>
                                <textarea name="" v-model="description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <button class="add-btn" @click='passEvent'>إضافة</button>
                <button class="close" @click='passClose'>إلغاء الأمر</button>
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
    </div>
</template>

<style>
.journey-add{
    direction: rtl;
    margin: 1.948vh 3.5vw;
}

.journey-add .head h2{
    font-size: 1.25vw;
    color: #2F3746;
}

.journey-add .head p{
    font-size: 0.833vw;
    color: #717B8C;
    margin-top: 0.8928vh;
}
.journey-add .inputs{
    width: 62.1875vw;
    background-color: white;
    margin-top: 1.5974vh;
    border-radius: 14px;
}

.journey-add .inputs .title{
    padding: 1% 2.345%;
    font-size: 0.9375vw;
    border-bottom: 1px solid #F4F6F9;
}

.journey-add .inputs .info{
    display: grid;
    grid-template-columns: repeat(2 , 1fr);
    grid-template-rows: repeat(3 , 1fr);
    margin: 0.8658% 2.345% 2.435vh;
    row-gap: 1.5422vh;
}

.journey-add .inputs .info .Destination{
    grid-area: 1/1/1/3;
}

.journey-add .inputs .info .days{
    grid-area: 2/1/4/1;
    width: 80%;
}

.journey-add .inputs .info .days select{
    height: 90%;
}

.journey-add .inputs .info p,
.journey-add .inputs .number p
{
    font-size: 0.7812vw;
    padding-bottom: 0.5%;
}

.journey-add .inputs input,
.journey-add .inputs select,
.journey-add .inputs textarea{
    width: 27.2708vw;
    height: 5.1136vh;
    background-color: #EDF0F5;
    border-radius: 0.7291vw;
    border: none;
    padding-right: 19px;
    resize: none;
}

.journey-add .inputs .note{
    margin-right: 5.9297vw ;
}

.journey-add .inputs textarea{
    height: 10.1136vh;
}
.journey-add .inputs .economy-ticket .number{
    display: flex;
    gap: 44px;
    align-items: center;
    margin-right: 20px;
    margin-top: 20px;
}

.journey-add .inputs .economy-ticket .number input{
    width: 213px;
    height: 30px;
}

.journey-add .inputs .economy-ticket .price .pkg input{
    width: 17.2708vw;
}

.journey-add .inputs .economy-ticket .price .pkg select{
    width: 125%;
}


.journey-add .inputs select{
    width: 100%;
    appearance: button;
}

.journey-add .inputs input::placeholder{
    padding: 46px;
    background-repeat: no-repeat;
    background-position: right;
}

.journey-add .inputs .info .airline::placeholder{
    background-image: url("../assets/img/plane.svg");
}

.journey-add .inputs .info .day::placeholder{
    background-image: url("../assets/img/sun.svg");
}
.journey-add .inputs .info .f-city::placeholder{
    background-image: url("../assets/img/fcity.svg");
}
.journey-add .inputs .info .t-city::placeholder{
    background-image: url("../assets/img/tcity.svg");
}
.journey-add .inputs .info .weight::placeholder{
    background-image: url("../assets/img/weight.svg");
}
.journey-add .inputs .info .time::placeholder{
    background-image: url("../assets/img/clock.svg");
}

.journey-add .inputs .money::placeholder{
    padding: 30px;
    font-size: 0.8333vw;
    background-image: url("../assets/img/money.svg");
}

.journey-add .inputs .vip-ticket .heading,
.journey-add .inputs .economy-ticket .heading{
    font-size: 1.0416vw;
    padding: 0.7305vh 2.7083vw;
    color: #FBB03F;
    background-color: #edf0f5;
}

.journey-add .inputs .vip-ticket .price,
.journey-add .inputs .economy-ticket .price{
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    width: 100%;
    margin: 1.3798vh auto 1.8668vh;
    margin-right: 20px;
}

.journey-add .inputs .economy-ticket .price{
    display: flex;
    flex-direction: column;
    width: 97%;
    margin: 1.3798vh auto 1.8668vh;
    margin-right: 20px;
}

.journey-add .inputs .economy-ticket .price .pkg{
    display: flex;
    gap: 44px;
    width: 100%;
}

.journey-add .inputs .vip-ticket .price p,
.journey-add .inputs .economy-ticket .price p{
    font-size: 0.8854vw;
    margin-bottom: 0.8928vh;
}

.journey-add .inputs .economy-ticket .price p{
    font-size: 0.8854vw;
    margin-bottom: 0.8928vh;
}

.journey-add .btns{
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: absolute;
    top: 60%;
    left: 2.1961vw;
    transform: translateY(-50%);
    width: max-content;
    justify-content: space-between;
    padding: 0 25px;
    margin-bottom: 1.8668vh;
}

.journey-add .add-btn , .journey-add .close{
    width: 9.375vw;
    height: 5.8961vh;
    background-color: #2E3092;
    color: white;
    font-size: 0.8854vw;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}

.journey-add .close{
    background-color: white;
    color: #8D98AA;
}
</style>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            add:false,
            edit:false,
            allDestinations:[],
            destination_id: (this.edit)? this.Journey.destination.id :"",
            weight:(this.edit)? this.Journey.weight :0,
            leave_time:(this.edit)? this.Journey.leave_time :0,
            type:"",
            message:"",
            description:"",
            week_days:(this.edit)? this.Journey.week_days :[],
            degree:{0:{type: 'vip', title:'vip'  , det:'go', price:500}},
            numberOfEconomic:(this.edit)? this.Journey.economic.length/2 : 1,
            title: [],
            user_info: JSON.parse(localStorage.getItem("user_info")),
            loading: false,
            error: false,
        }
        },
        props: {
            edit: Boolean,
            Journey: Array,
        },
    methods:{
    async passEvent(){
        this.loading=true;
        if (!this.edit) {
            await axios.post(fetchUrl+"/travels",
        {
            destination_id : this.destination_id,
            week_days: this.week_days,
            weight : parseInt(this.weight),
            leave_time : this.leave_time,
            degree:JSON.parse(JSON.stringify(this.degree)),
            description:this.description,
            type: this.type
        },
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
        }else{
            
            await axios.post(fetchUrl+"/travels/"+this.Journey.id,
                {
                    destination_id : this.destination_id,
                    week_days: this.week_days,
                    weight : parseInt(this.weight),
                    leave_time : this.leave_time,
                    degree:JSON.parse(JSON.stringify(this.degree)),
                    description:this.description,
                    type: this.type,
                    hidden: 0,
                    _method: "PUT"
                },
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
        }
    this.$emit('ChangeAdd',{add:false , edit:false , message: this.message , error: this.error})
    },
    passClose()
    {
      this.$emit('ChangeClose',{add:false , edit:false})
    },
    GetAllCard(){
            this.loading=true;
            axios.get(fetchUrl+"/destinations" +`?paginate=0`, 
                {headers: {
                    Authorization:"Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading=false;
                    this.allDestinations=res.data;
                })
                .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
            },
            PriceHandel(event , type , index , det){
                let x;
                if (index==0) {
                    x="vip go"
                }else if(index==1){
                    x="vip go-back"
                }else{
                    x=this.title[index-2] + det
                }
                this.degree[index]={type:type, title:x , det:det,price:event.target.value};
                console.log(this.degree)
            },
            NumberHundel(event){
                if(this.numberOfEconomic < this.Journey.economic.length/2){
                    let arr =[];
                    for (let index = 0; index < 2*(this.numberOfEconomic)+2; index++) {
                        arr[index]=this.degree[index]                    
                    }
                    this.degree=arr;
                }
            }
  },
  created(){
            this.GetAllCard();
            if (this.edit) {
                this.Journey.economic.forEach((element , index) => {
                    if(index % 2 ==0){
                        this.title.push(element.title.slice(0,element.title.indexOf("go")))
                    } ;
                });
                this.degree[0]= {type:"vip", title:"vip go" , det:"go",price:this.Journey.vip[0].price}
                this.degree[1]= {type:"vip", title:"vip go-back" , det:"go",price:this.Journey.vip[1].price}
                for (let index = 0; index < this.Journey.economic.length; index++) {
                    this.degree[index+2]= {type:"economic", title:this.Journey.economic[index].title , det:this.Journey.economic[index].det ,price:this.Journey.economic[index].price}
                }
                console.log(this.Journey)
            }
        },
}
</script>