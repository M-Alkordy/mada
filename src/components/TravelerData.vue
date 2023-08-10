<template>
    <div class="traveler-data">
            <p class="title">يرجى ادخال يانات جميع المسافرين في جواز السفر</p>
                <div class="all-traveler">
                    <div>
                        <div :class=Class[i-1] v-for="i in parseInt(adult_count)" style="text-align: center;">
                            <div @click="NumberTravelerHundel(0 , i , 'adult')">
                                <img :src=img[i-1]>
                                <p>المسافر ({{ i }})</p>
                            </div>
                        </div>
                        <div :class=Class[parseInt(adult_count)+i-1] v-for="i in parseInt(child_count)" style="text-align: center;">
                            <div @click="NumberTravelerHundel(parseInt(adult_count) , i , 'child')">
                                <img :src=img[parseInt(adult_count)+i-1] style="width: 24px;">
                                <p>الطفل ({{ i }})</p>
                            </div>
                        </div>
                        <div :class=Class[parseInt(adult_count)+parseInt(child_count)+i-1] v-for="i in parseInt(infant_count)" style="text-align: center;">
                            <div @click="NumberTravelerHundel(parseInt(adult_count)+parseInt(child_count) , i , 'infant')">
                                <img :src=img[parseInt(adult_count)+parseInt(child_count)+i-1] style="width: 24px;">
                                <p>الرضيع ({{ i }})</p>
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="input-pkg person">
                        <p class="name">الاسم</p>
                        <input type="text" placeholder="يتم هنا كتابة الاسم بالكامل" :value=name @change="TravelerHundel($event , 'name')">
                        {{ v$.name$errors }}
                        <div v-for="(item, index) in v$.name.$errors" :key="index" class="error-box">
                            <span v-if="item.$message" class="valid_msg p-lg-0">{{item.$message}}</span>
                        </div>
                        </div>
                        <div class="input-pkg person" >
                            <p class="name">اللقب</p>
                            <input type="text" placeholder="يتم هنا كتابة اللقب"  :value=nickname @change="TravelerHundel($event , 'nickname')">
                        </div>
                        <div class="input-pkg person" >
                            <p class="name">المهنة</p>
                            <input type="text" placeholder="يتم هنا كتابة المهنه" :value=job @change="TravelerHundel($event , 'job')">
                        </div>
                        <div class="input-pkg date">
                            <p class="name">تاريخ الميلاد</p>
                            <input type="date" placeholder="يرجى تحديد تاريخ الميلاد" :value=birthday @change="TravelerHundel($event , 'birthday')">
                        </div>
                        <div class="input-pkg location">
                            <p class="name">محل الميلاد</p>
                            <input type="text" placeholder="يتم هنا كتابة محل الميلاد" :value=country @change="TravelerHundel($event , 'country')">
                        </div>
                        <div class="input-pkg">
                            <p class="name">الجنس</p>
                            <div class="radio">
                                <input type="radio" name="type" id="male" value="male" @click="GenderHandel($event)">
                                <label for="male">ذكر </label>
                                <input type="radio" name="type" id="female" value="female" @click="GenderHandel($event)">
                                <label for="female">أنثى</label>
                            </div>
                        </div>
                        <div class="input-pkg passport">
                            <p class="name">صورة جواز السفر</p>
                            <div>
                                <img src="../assets/img/passport.svg" >
                                <span>يرجى إدراج صورة جواز السفر</span>
                                <label for="passport">إستعراض</label>
                                <input type="file" id="passport" style="display: none;" @change="handleFileUpload($event)">
                            </div>
                        </div>
                        <div class="input-pkg location">
                            <p class="name">رقم جواز السفر</p>
                            <input type="text" placeholder="يتم هنا كتابة رقم جواز السفر" :value=passport_id @change="TravelerHundel($event , 'passport_id')">
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <button class="add-btn" @click='NextTravelerHundel()' v-if="nextTraveler">المسافر التالي</button>
                    <button class="add-btn" @click='passEvent($event)' v-if="next">التالي</button>
                    <RouterLink to="/booking"><button class="close">إلغاء الأمر</button> </RouterLink>
                </div>
            <img src="./../assets/img/destination.png" v-if="destination">
    </div>
</template>

<style>
.traveler-data{
    width: 44.2708vw;
    height: 95.8655vh;
    border-radius: 14px;
    background-color: #ffff;
    position: relative;
    top: -63px;
    transform: scale(0.85);

}

.traveler-data .title{
    font-size: 1.3020vw;
    color: #4C535F;
    padding: 1.0878vh 36px;
    border-bottom: 1px solid #F4F6F9;
}

.traveler-data .all-traveler{
    height: calc(100% - 1.3020vw - 2 * 5.0878vh);
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    margin-right: 1.0937vw;
    margin-left: 1.0937vw;
}

.traveler-data .all-traveler .traveler{
    width: 6.5625vw;
    height: 12.3815vh;
    background-color: #F8F9FB;
    border: 1px solid #707070;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.833vw;
    color: #717B8C;
    border-radius: 0.7291vw;
    margin-top: 3.3411vh;
    cursor: pointer;
}

.traveler-data .all-traveler .traveler.active{
    width: 6.5625vw;
    height: 12.3815vh;
    background-color: #E9EAF4;
    border: 1px solid #2E3092;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.833vw;
    color: #2E3092;
    border-radius: 0.7291vw;
    margin-top: 3.3411vh;
    cursor: pointer;
}

.traveler-data .all-traveler .input-pkg .name{
    font-size: 17px;
    color: #2F3746;
    padding: 1.8648vh 2.489vw 1.4763vh 0;
}

.traveler-data .all-traveler .input-pkg input,
.traveler-data .all-traveler .input-pkg.passport div{
    width: 31.2812vw;
    height: 4.662vh;
    display: block;
    margin: 0 auto;
    background-color: #EDF0F5;
    border-radius: 0.7291vw;
    border: none;
    padding-right: 19px;
    padding-left: 19px;
}

.traveler-data .all-traveler .input-pkg.passport div{
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.833vw;
    color: #CCD3DF;
    padding-left: 0;
}
.valid_msg{
        color: red;
        font-size: 13px;
        padding-left: 10px;
        margin: 10px 40px;
    }
.traveler-data .all-traveler .input-pkg.passport div label{
    width: 6.927vw;
    height: 100%;
    margin-right: 11.1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2E3092;
    border-radius: 0.625vw 0 0 0.625vw;
}
.traveler-data .all-traveler .input-pkg .radio input{
    margin-right: 2.489vw;
    width: 12px;
    height: 12px;
    display: inline;
}

.traveler-data .all-traveler .input-pkg .radio label{
    margin: 0 10px 0 3.1979vw;
}

.traveler-data .all-traveler input::placeholder{
    padding: 46px;
    background-repeat: no-repeat;
    background-position: right;
}

.traveler-data .all-traveler .person input::placeholder{
    background-image: url("../assets/img/person.svg");
}

.traveler-data .all-traveler .location input::placeholder{
    background-image: url("../assets/img/white-location.svg");
}

.traveler-data .all-traveler .date input::placeholder{
    background-image: url("../assets/img/date.svg");
}

.traveler-data .all-traveler .passport input::placeholder{
    background-image: url("../assets/img/passport.svg");
}

.traveler-data .all-traveler .input-pkg input:focus{
    border: none;
    outline: none;
}

.traveler-data .all-traveler .input-pkg .show{
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

.traveler-data .btns{
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: 1.331vh 81px 20px 0;
}

.traveler-data .add-btn , .traveler-data .close{
    width: 12.5vw;
    height: 4.8951vh;
    background-color: #2E3092;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 0.7291vw;
    cursor: pointer;
}

.traveler-data .close{
    display: block;
    background-color: #EDF0F5;
    color: #8D98AA;
}

.traveler-data .close a{
    display: inline;
}

</style>

<script>
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
            name: '', 
            nickname:''  , 
            job:'', 
            birthday:'0' , 
            country:'',
            image:'',
            gender:'',
            type:'',
            passport_id:'',
            nextTraveler: false,
            next: true,
            travelerNumber: 1,
            Class:new Array(parseInt(this.count)),
            img:new Array(parseInt(this.count)),
            Alltravelers:{0:{name: '', nickname:''  , job:'', birthday:'' , country:'', image:'',gender:'',passport_id:'' }},
            vuelidateExternalResults:{
                name:[]
            },
        }}, 
        validations() {
            return{
                name:{ required: helpers.withMessage('الاسم  مطلوب', required)},
                adult_count:{ required: helpers.withMessage('عدد البالغين مطلوب', required)},
                child_count:{ required: helpers.withMessage('عدد الأطفال مطلوب', required)},
                infant_count:{ required: helpers.withMessage('عدد الرضع مطلوب', required)},
                }
             
        },
    methods:{
    async passEvent(event)
    {
    event.preventDefault()
/*     this.NumberTravelerHundel(this.count); */
    this.$emit('ChangeCheck',{Check:true , Alltravelers: this.Alltravelers})
    },
    NumberTravelerHundel(start , i , type){
        this.travelerNumber = start+i;
        for (let index = 0; index < this.img.length; index++) {
                this.img[index]= (index<this.adult_count)? "./src/assets/img/deactivate-traveler.svg" : (index<parseInt(this.adult_count)+parseInt(this.child_count)) ? "./src/assets/img/child-grey.svg" : "./src/assets/img/baby-grey.svg";
                this.Class[index] = 'traveler';
            }
            this.img[this.travelerNumber-1]= (type=="adult")? "./src/assets/img/traveler.svg" : (type=="child")? "./src/assets/img/active-child.svg" : "./src/assets/img/active-baby.svg";
            this.Class[this.travelerNumber-1]='traveler active'
            if (this.Alltravelers[this.travelerNumber-1]){
            this.name=this.Alltravelers[this.travelerNumber-1].name;
            this.nickname=this.Alltravelers[this.travelerNumber-1].nickname;
            this.job=this.Alltravelers[this.travelerNumber-1].job;
            this.birthday=this.Alltravelers[this.travelerNumber-1].birthday;
            this.country=this.Alltravelers[this.travelerNumber-1].country;
            this.passport_id=this.Alltravelers[this.travelerNumber-1].passport_id;
            this.gender=this.Alltravelers[this.travelerNumber-1].gender;
            let radio = document.querySelectorAll("input[type=radio]");
            radio.forEach(element => (element.value==this.Alltravelers[this.travelerNumber-1].gender) ? element.checked = true : element.checked = false)
            }
            else{
            this.name='';
            this.nickname='';
            this.job='';
            this.birthday='';
            this.country='';
            this.passport_id='';
            this.gender='';
            let radio = document.querySelectorAll("input[type=radio]");
            radio.forEach(element => element.checked = false)
            }
            if (this.travelerNumber < this.count) {
                this.nextTraveler = true;
                this.next = false;
            }else{
                this.nextTraveler = false;
                this.next = true;
            }
        },
    TravelerHundel(event , title){
        let arr = Array.from(this.Alltravelers)
        if (title=="name") {
            this.name=event.target.value;
        }
        else if (title=="nickname") {
            this.nickname=event.target.value;
        }
        else if (title=="job") {
            this.job=event.target.value;
        }
        else if (title=="birthday") {
            this.birthday=event.target.value;
        }
        else if (title=="country") {
            this.country=event.target.value;
        }
        else if (title=="passport_id") {
            this.passport_id=event.target.value;
        }
        let type = (this.travelerNumber <= parseInt(this.adult_count)) ? "adult" : (this.travelerNumber <= parseInt(this.adult_count)+parseInt(this.child_count)) ? "child" : "infant"; 
        arr[this.travelerNumber-1]= {name:this.name, nickname:this.nickname , job:this.job,birthday:this.birthday,country:this.country,passport_id:this.passport_id , image:this.image, gender:this.gender, type:type};
            this.Alltravelers =arr;
    },
    handleFileUpload( event ){
        this.image = event.target.files[0];
    },
    GenderHandel( event ){
        this.gender = event.target.value;
    },
    NextTravelerHundel(){
        // this.vuelidateExternalResults.name=[];
        this.v$.$touch();
            if (this.v$.$invalid){
                return;
            }
        let type = (this.travelerNumber < parseInt(this.adult_count)) ? "adult" : (this.travelerNumber < parseInt(this.adult_count)+parseInt(this.child_count)) ? "child" : "infant"; 
        this.NumberTravelerHundel(0 , this.travelerNumber+1 , type)
    }
},
created(){
    for (let index = 0; index < this.img.length; index++) {
        this.img[index]= (index<this.adult_count)? "./src/assets/img/deactivate-traveler.svg" : (index<parseInt(this.adult_count)+parseInt(this.child_count)) ? "./src/assets/img/child-grey.svg" : "./src/assets/img/baby-grey.svg";
        this.Class[index] = 'traveler';
    }
        this.img[0]='./src/assets/img/traveler.svg'
        this.Class[0]='traveler active'
        if (this.travelerNumber < this.count) {
                this.nextTraveler = true;
                this.next = false;
            }else{
                this.nextTraveler = false;
                this.next = true;
            }
    },
props: {
    count: String,
    adult_count: String,
    child_count: String,
    infant_count: String,
    },   }
</script>