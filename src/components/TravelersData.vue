<template>
    <div class="travelers-data">
            <p class="title">بيانات جميع المسافرين</p>
            <div class="all-traveler">
                <div>
                    <div :class=Class[i-1] v-for="i in Array.from(specificsInfo.travelers).length">
                        <div @click="NumberTravelerHundel(i)">
                            <img :src=img[i-1]>
                            <p>المسافر ({{ i }})</p>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h2>بيانات المسافر {{number}}</h2>
                    <div class="item">
                    <p class="name">الاسم</p>
                    <p class="value">{{ name }}</p>
                    </div>
                    <div class="item">
                    <p class="name">اللقب</p>
                    <p class="value">{{ nickname }}</p>
                    </div>
                    <div class="item">
                    <p class="name">الجنس</p>
                    <p class="value">{{gender}}</p>
                    </div>
                    <div class="item">
                    <p class="name">تاريخ الميلاد</p>
                    <p class="value">{{birthday}}</p>
                    </div>
                    <div class="item">
                    <p class="name">محل الميلاد</p>
                    <p class="value">{{ country }}</p>
                    </div>
                    <div class="item">
                    <p class="name">المهنة</p>
                    <p class="value">{{ job }} </p>
                    </div>
                    <div class="item">
                    <p class="name">رقم التذكرة</p>
                    <p class="value">{{ ticket_id }} </p>
                    </div>
                    <div class="item">
                    <p class="name">صورة جواز السفر</p>
                    <img :src=image>
                    </div>
                    
                </div>
            </div>
    </div>
</template>

<style>
.travelers-data{
    width: 44.2708vw;
/*     height: 91.8655vh; */
    direction: rtl;
    border-radius: 14px;
    background-color: #ffff;
    position: relative;
    top: -52px;
    transform: scale(0.85);

}

.travelers-data .title{
    font-size: 1.3020vw;
    color: #4C535F;
    padding: 1.0878vh 36px;
    border-bottom: 1px solid #F4F6F9;
}

.travelers-data .all-traveler{
    display: flex;
    justify-content: space-between;
    margin-right: 1.0937vw;
    margin-left: 1.0937vw;
}

.travelers-data .all-traveler .traveler{
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

.travelers-data .all-traveler .traveler.active{
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

.travelers-data .all-traveler .info .item{
    width: 31.0937vw;
    height: 47px;
    display: flex;
    align-items: center;
}

.travelers-data .all-traveler .info .item:nth-child(even){
    background-color: #F8F8FC;
}

.travelers-data .all-traveler .info .item:last-child{
    display: block;
}

.travelers-data .all-traveler .info .item .name{
    font-size: 16px;
    color: #717B8C;
}

.travelers-data .all-traveler .info .item .value{
    font-size: 16px;
    color: #2F3746;
    margin-right: 13.2291vw;
}

.travelers-data .all-traveler .info .item img{
    width: 9.5vw;
}

.travelers-data .all-traveler .info h2{
    font-size: 17px;
    color: #4C535F;
    padding-bottom: 29px;
    border-bottom: 1px solid #707070;
    margin-top: 50px;
}

.travelers-data .all-traveler .input-pkg .name{
    font-size: 17px;
    color: #2F3746;
    padding: 1.8648vh 2.489vw 1.4763vh 0;
}

.travelers-data .all-traveler .input-pkg input,
.travelers-data .all-traveler .input-pkg.passport div{
    width: 33.2812vw;
    height: 4.662vh;
    display: block;
    margin: 0 auto;
    background-color: #EDF0F5;
    border-radius: 0.7291vw;
    border: none;
    padding-right: 19px;
    padding-left: 19px;
}

.travelers-data .all-traveler .input-pkg.passport div{
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.833vw;
    color: #CCD3DF;
    padding-left: 0;
}

.travelers-data .all-traveler .input-pkg.passport div label{
    width: 6.927vw;
    height: 100%;
    margin-right: 13.1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2E3092;
    border-radius: 0.625vw 0 0 0.625vw;
}
.travelers-data .all-traveler .input-pkg .radio input{
    margin-right: 2.489vw;
    width: 12px;
    height: 12px;
    display: inline;
}

.travelers-data .all-traveler .input-pkg .radio label{
    margin: 0 10px 0 6.1979vw;
}

.travelers-data .all-traveler input::placeholder{
    padding: 46px;
    background-repeat: no-repeat;
    background-position: right;
}

.travelers-data .all-traveler .person input::placeholder{
    background-image: url("../assets/img/person.svg");
}

.travelers-data .all-traveler .location input::placeholder{
    background-image: url("../assets/img/white-location.svg");
}

.travelers-data .all-traveler .date input::placeholder{
    background-image: url("../assets/img/date.svg");
}

.travelers-data .all-traveler .passport input::placeholder{
    background-image: url("../assets/img/passport.svg");
}

.travelers-data .all-traveler .input-pkg input:focus{
    border: none;
    outline: none;
}

.travelers-data .all-traveler .input-pkg .show{
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

.travelers-data .btns{
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin:1.331vh auto 22px;
}

.travelers-data .add-btn , .travelers-data .close{
    width: 12.5vw;
    height: 4.8951vh;
    background-color: #2E3092;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 0.7291vw;
    cursor: pointer;
}

.travelers-data .close{
    background-color: #EDF0F5;
    color: #8D98AA;
}

</style>

<script>
export default {  
    data(){
        return{
            Class:new Array(Array.from(this.specificsInfo.travelers).length),
            img:new Array(Array.from(this.specificsInfo.travelers).length),
            number: 0,
            name:'',
            nickname:'',
            gender:'',
            job:'',
            birthday:'',
            country:'',
            image:'',
            ticket_id:''
        }}, 
    
    methods:{
        NumberTravelerHundel(i){
            for (let index = 0; index < this.img.length; index++) {
                this.img[index] = './src/assets/img/deactivate-traveler.svg';
                this.Class[index] = 'traveler';
            }
            this.img[i-1]='./src/assets/img/traveler.svg'
            this.Class[i-1]='traveler active'
            this.number=i
            this.name=this.specificsInfo.travelers[i-1].name;
            this.nickname=this.specificsInfo.travelers[i-1].nickname;
            this.gender=(this.specificsInfo.travelers[i-1].gender == "male") ? "ذكر" : "أنثى"
            this.job=this.specificsInfo.travelers[i-1].job;
            this.birthday=this.specificsInfo.travelers[i-1].birthday;
            this.country=this.specificsInfo.travelers[i-1].country;
            this.image = imageUrl + this.specificsInfo.travelers[i-1].image
            this.ticket_id = this.specificsInfo.travelers[i-1].ticket_id;
    },
    passEvent()
    {
      this.$emit('ChangeCheck',true)
    },
    },
    props: {
        specificsInfo:Object
    },
    created(){
    for (let index = 0; index < this.img.length; index++) {
            this.img[index] = './src/assets/img/deactivate-traveler.svg';
            this.Class[index] = 'traveler';
        }
        this.img[0]='./src/assets/img/traveler.svg'
        this.Class[0]='traveler active'
        this.number=1
        if (this.specificsInfo.travelers[0]){
        this.name=this.specificsInfo.travelers[0].name
        this.nickname=this.specificsInfo.travelers[0].nickname
        this.gender=(this.specificsInfo.travelers[0].gender == "male") ? "ذكر" : "أنثى"
        this.job=this.specificsInfo.travelers[0].job;
        this.birthday=this.specificsInfo.travelers[0].birthday;
        this.country=this.specificsInfo.travelers[0].country;
        this.image = imageUrl + this.specificsInfo.travelers[0].image
        this.ticket_id = this.specificsInfo.travelers[0].ticket_id;
        }
    },
}
</script>