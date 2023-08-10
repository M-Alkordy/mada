<template>
    <div class="main">
        <Nav/>
        <div class="header">
            <div class="btn">
                <button v-if="!specifics"><RouterLink to="/AddBooking"><img src="../assets/img/add.svg">إضافة حجز جديد</RouterLink></button>
                <button class="setting" v-if="!specifics"><RouterLink to="/BookingSettings"><img src="../assets/img/setting.svg"> اعدادات الحجز</RouterLink></button>
                <button id="cancel-btnn" class="cancel" v-if="specifics" @click="specifics=!specifics"><RouterLink to="/CancelBooking">الغاء الحجز</RouterLink></button>
                <button id="confirm_btnn" class="confirmation" v-if="specifics && (btn_shower=='approved' || btn_shower=='new' )" @click="add=!add">تأكيد الحجز</button>
                <button id="addd_new" class="consent" v-if="specifics && btn_shower=='new'" @click="ApproveHundel()"> الموافقة على الحجز</button>
            </div>
            <div class="text">
                <p class="title" v-if="!specifics">الحجوزات</p>
                <p class="info" v-if="!specifics">يمكنك رؤية جميع الحجوزات وإدارتها</p>
                <p class="title" v-if="specifics">تفاصيل الحجز</p>
                <p class="info" v-if="specifics">يمكنك الإطلاع على  بيانات الحجز  وإدارتها</p>
            </div>
        </div>
        <div class="filter" v-if="!specifics">
            <div class="list">
              <select v-model="sort" class="form-select" >
                    <option value="new">الأحدث أولا</option>
                    <option value="old">الأقدم أولا</option>
                </select>
                <!-- <button class="drop-down"><img src="../assets/img/arrow-down-grey.svg"> <span>الأحدث أولاً</span>: ترتيب حسب </button> -->
                <button>فلترة العناصر <img src="../assets/img/filter.svg"></button>
            </div>
            <div class="search">
                <button><img src="../assets/img/search.svg"></button>
                <input type="text" placeholder="ابحث عن البيانات" @input="debounce(() => { search=$event.target.value; } , 1500);">
            </div>
        </div>
        <v-table class="table" v-if="!specifics && allReservations!==null">
          <thead>
            <tr>
              <th class="text-center">
              </th>
              <th class="text-center">
                حالة الحجز
              </th>
              <th class="text-center">
                شركة الطيران
              </th>
              <th class="text-center">
                مدينة الوصول
              </th>
              <th class="text-center">
                مدينة المغادرة
              </th>
              <th class="text-center">
                  التاريخ
              </th>
              <th class="text-center">
                  عدد المسافرين
              </th>
              <th class="text-center">
                  الاسم
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reservation in allReservations"
              :key="reservation.id"
              >
              <td class="text-center"><span class="specifics" @click="ShowInfo(reservation)">عرض التفاصيل</span> </td>
              <td class="text-center"><span :class=ClassHandel(reservation)> {{ (reservation.status == "new")? "حجز جديد" : (reservation.status == "approved")? "تم الموافقة على البيانات" : (reservation.status == "done") ? "تم الحجز" : "تم الموافقة على الدفع" }}</span></td>
              <td class="airline text-center">{{ reservation.travel?.destination?.airline?.name }} <img :src=imageHundel(reservation) alt=""></td>
              <td class="text-center">{{ reservation.travel?.destination?.end_city?.name }}</td>
              <td class="text-center">{{ reservation.travel?.destination?.start_city?.name }}</td>
              <td class="text-center">{{ reservation.go_date }}</td>
              <td class="text-center"> مسافر {{ reservation.count }}</td>
              <td class="name text-center">{{ reservation.user.name}} <img :src=ProfileImageHundel(reservation) alt="" style="width: 50px; height: 50px;"></td>
            </tr>
          </tbody>
        </v-table>
        <div class="pagination book" v-if="!specifics">
            <button @click="previeusePage()"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <!-- <button class="num" v-for="i in totalNumber" @click="paginationHundel(i)" :class="{active:page==i}">{{ i }}</button> -->
            <button class="num">{{ current_page }}</button>
            <button @click="nextPage()"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <div class="specifics" v-if="specifics">
        <SpecificsBooking 
        v-if="specifics"
        :specificsInfo =specificsInfo
         />
        <TravelersData 
        v-if="specifics" 
        :specificsInfo = specificsInfo
        />
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
    <Add
    title="تأكيد الحجز " 
    description="لإتمام عملية الحجز يجب عليك ادخال ارقام تذاكر السفر لكل المسافرين"
    firstInput="مرجعية الحجز"
    firstPlaceholder="يرجى ادخال مرجعية الحجز "
    :specificsInfo =specificsInfo
    :booking=true
    v-if="add"
    @ChangeSpecifics="ChangeS($event)"
    @ChangeAdd="ChangeA($event)"
    @ChangeClose="ChangeA($event)"
     />
    <SideBar :open=true />
</template>

<script >
import Nav from '../components/Nav.vue';
import SideBar from '../components/SideBar.vue';
import SpecificsBooking from '../components/SpecificsBooking.vue';
import TravelersData from '../components/TravelersData.vue';
import Add from '../components/Add.vue';
import axios from 'axios';
export default {
    setup() {
        function createDebounce() {
            let timeout = null;
            return function (fnc, delayMs) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fnc();
                }, delayMs || 500);
            };
        }
        return {
            debounce: createDebounce(),
        }
    },
    data(){
        return{
          specifics:false,
          add:false,
          allReservations:null,
          showReservations: [],
          specificsInfo:{},
          user_info: JSON.parse(localStorage.getItem("user_info")),
          loading: false,
          message: "",
          sort:'الأحدث أولا',
          error: false,
          totalNumber:0,
          page:1,
          search:'',
          sort:'new',
          current_page:'',
          last_page:'',
          btn_shower:'',
        }
        },
    methods:{
      ShowInfo(reservation){
        this.btn_shower=reservation.status;
        this.specificsInfo=reservation
        this.specifics=!this.specifics;
      },
      ChangeS({add,message , error}){
        this.specifics=add
        this.add=false
        this.message =message
        this.error =error
        this.GetAllCards()
      },
      ChangeA({add,message , error}){
        this.add=add
        this.message = message
        this.error=error
      },
      GetAllCards(){
            this.loading = true;
            var q = this.search!='' ? "&search="+this.search : "";
            var s = this.sort!='' ? "&sort="+this.sort : "";
            axios.get(fetchUrl+"/reservations" + `?paginate=1&page=${this.current_page}${s}${q}`, 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading = false;
                    this.allReservations=res.data.data;
                    console.log(this.allReservations);
                    //this.totalNumber = Math.ceil(this.allReservations.length /6);
                    this.totalNumber = res.data.meta.total;
                    //this.showReservations = this.allReservations.slice(0,6);
                    this.showReservations = res.data.meta.per_page;
                    this.current_page = res.data.meta.current_page;
                    this.last_page = res.data.meta.last_page;
                })
                .catch(error => {this.error=true
                                this.loading=false
                                this.message = error.response.data.message;});
        },
        paginationHundel(i){
          if (i>=1 && i<=this.totalNumber) {
            this.page = i
            this.showReservations = this.allReservations.slice((i-1)*6,((i-1)*6)+6)
          }
        },
        nextPage(){
          if(this.current_page <= this.last_page){
            this.current_page = this.current_page + 1
          }
        },
        previeusePage(){
          console.log('ss');
          if(this.current_page > 1){
            console.log('bb');
            this.current_page = this.current_page - 1
          }
        },
        imageHundel(reservation){
          return imageUrl + reservation?.travel?.destination?.airline?.image;
        },
        ProfileImageHundel(reservation){
          if (reservation.user.image) {
          return imageUrl +reservation.user.image ;
        }
          else{
            return './src/assets/img/profile-pic.svg';
          }
          
        },
        ClassHandel(reservation){
          return (reservation.status == "new")? "new" : (reservation.status == "approved")? "approved" : (reservation.status == "done") ? "done" : "paid";
        },
        async ApproveHundel(){
          this.loading = true;
          await axios.post(fetchUrl+`/reservations/${this.specificsInfo.id}/approve`,{_method: "PUT"},
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
          this.specifics=!this.specifics
          this.GetAllCards()
        }
    },
    components: {
        Nav,
        SideBar,
        SpecificsBooking,
        TravelersData,
        Add,
    },
    watch:{
      current_page(_new,_old){
        this.GetAllCards();
      },
      search(_new, _old){
            this.GetAllCards();
        },
        sort(_new, _old){
            this.GetAllCards();
        },
    },
    created(){
        this.GetAllCards();
    }, 
    }
</script>

<style>
.form-select{
    direction: rtl;
    width: 50%;
    padding: 10px 20px;
    font-size: 15px;
    color: #4C535F;
    background-color: white;
    border-radius:10px 10px;
}
.header .btn a{
    justify-content: space-around;
}

.table{
    margin:2.5925vh 3.6458vw 0;
    height: 56.7026vh;
    overflow-y: auto;
}
.table thead{
    background-color:#F8F8FC;
    font-size:0.8333vw;
    border-radius:28px 28px 0 0;
}

.table tbody{
    font-size:0.7812vw;
}
.table tbody .airline,
.table tbody .name{
    display:flex;
    justify-content:space-around;
    align-items:center;
}

.table tbody .airline img{
    width:2.3958vw;
}

.table tbody .specifics{
    background-color:#EDF0F5;
    border-radius:14px;
    display:flex;
    align-items:center;
    justify-content:center;
    height:80%;
    cursor: pointer;
}

.table tbody .approved{
    color:#E60585;
    border:1px solid #E60585;
    background-color:#eaadd955;
    display:flex;
    align-items:center;
    justify-content:center;
    height:60%;
    padding:0 5px;
    border-radius:14px;
}
.table tbody .new{
    color:#2E3092;
    border:1px solid #2E3092;
    background-color:#2e309238;
    display:flex;
    align-items:center;
    justify-content:center;
    height:60%;
    padding:0 10px;
    width: max-content;
    margin:0 auto;
    border-radius:14px;
}
.table tbody .done{
    color:#FAA61A;
    border:1px solid #FAA61A;
    background-color:#faa81a61;
    display:flex;
    align-items:center;
    justify-content:center;
    height:60%;
    padding:0 10px;
    width: max-content;
    margin:0 auto;
    border-radius:14px;
}

.table tbody .paied{
    color:#26A69A;
    border:1px solid #26A69A;
    background-color:#26a6993f;
    display:flex;
    align-items:center;
    justify-content:center;
    height:60%;
    padding:0 10px;
    width: max-content;
    margin:0 auto;
    border-radius:14px;
}

.pagination.book{
  margin-top: 20px;
}

.header .btn{
  gap: 14px;
}

.header .btn .cancel,
.header .btn .confirmation,
.header .btn .consent{
  width: 9.375vw;
  height: 48px;
  border-radius: 14px;
  background-color: #F7E6EA;
  color: #EF5350;
}

.header .btn .cancel a{
  color: #EF5350;
}

.header .btn .confirmation{
  background-color: #2e309249;
  color: #2E3092;
}

.header .btn .consent{
  background-color: #2E3092;
  color: #ffff;
}

.specifics{
  display: flex;
/*   height: 76.8655vh; */
}
</style>