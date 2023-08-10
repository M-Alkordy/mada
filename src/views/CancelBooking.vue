<template>
    <div class="main">
        <Nav/>
        <Header 
            title="طلبات  الغاء الحجز والاسترجاع "
            info="يمكنك رؤية طلبات  الغاء الحجز والاسترجاع وإدارتها"
            addBtn="إضافة طلب الغاء حجز"
            @ChangeAdd="ChangeA($event)"
        />
        <div class="filter">
            <div class="list">
                <button class="drop-down"><img src="../assets/img/arrow-down-grey.svg"> <span>الأحدث أولاً</span>: ترتيب حسب </button>
                <button>فلترة العناصر <img src="../assets/img/filter.svg"></button>
            </div>
            <div class="search">
                <button><img src="../assets/img/search.svg"></button>
                <input type="text" placeholder="ابحث عن البيانات">
            </div>
        </div>
        <v-table class="table cancel">
          <thead>
            <tr>
              <th class="text-center">
                إجراءات
              </th>
              <th class="text-center">
                حالة الحجز
              </th>
              <th class="text-center">
                رقم التذكرة
              </th>
              <th class="text-center">
                رقم الجوال
              </th>
              <th class="text-center">
                الاسم
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reservation in showCancelRequests"
              :key="reservation.id"
              >
              <td class="text-center"><span class="specifics" @click="editCancleStatus(reservation)">تعديل حالة الطلب</span> </td>
              <td class="text-center"><span :class=ClassHandel(reservation)>{{ (reservation.status=="new") ? "جديد" : (reservation.status=="pending") ? "قيد التنفيذ" : "تم التنفيذ" }}</span></td>
              <td class="text-center">{{ reservation.ticket_id }}</td>
              <td class="text-center">{{ reservation.phone_number}}</td>
              <td class="name text-center">{{ reservation.traveler.name }} <img :src=ProfileImageHundel(reservation) alt=""></td>
            </tr>
          </tbody>
        </v-table>
        <div class="pagination book">
            <button @click="paginationHundel(page-1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" v-for="i in totalNumber" @click="paginationHundel(i)" :class="{active:page==i}">{{ i }}</button>
            <button @click="paginationHundel(page+1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <Add 
        v-if="add"
        :cancel=true
        title="اضافة طب الغاء حجز"
        firstInput="رقم التذكرة"
        firstPlaceholder="يرجى ادخال رقم التذكرة"
        secInput="اسم الشخص "
        secPlaceholder="يرجى كتابة اسم الشخص "
        FourthInput="رقم التفلون "
        FourthPlaceholder="يرجى كتابة رقم التلفون "
        api="/reservations/cancel"
        @ChangeAdd="ChangeAdd($event)"
        @ChangeClose="ChangeClose($event)"
         />
         <EditType 
         v-if="edit"
         :specificsInfo = specificsInfo
        @ChangeEdit="ChangeE($event)"
        @ChangeClose="ChangeCancle($event)"
          />
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
    <SideBar :open=true />
</template>

<script >
import Nav from '../components/Nav.vue';
import SideBar from '../components/SideBar.vue';
import Add from '../components/Add.vue';
import Header from '../components/Header.vue';
import EditType from '../components/EditType.vue';
import axios from 'axios';
export default {
    data(){
        return{
            edit:false,
            add:false,
            loading: false,
            error: false,
            allcancelRequests: [],
            showCancelRequests: [],
            specificsInfo:{},
            message: "",
            totalNumber:0,
            page:1,
        }
        },
    methods:{
      editCancleStatus(reservation){
        this.specificsInfo=reservation
        this.edit=!this.edit
      },
      ProfileImageHundel(reservation){
          return imageUrl +reservation.image ;
        },
      ClassHandel(reservation){
        if (reservation.status=="pending") {
          return "pending"
          
        }else if (reservation.status=="new"){
          return "new"
        }
        else if (reservation.status=="done"){
          return "done"
        }
        
        },
      ChangeE(edit){
        this.edit=edit
        this.GetAllCards()
      },
      ChangeCancle(edit){
        this.edit=edit
      },
      ChangeA(add){
        this.add=add
      },
      ChangeAdd({add,message , error}){
        this.add=add
        this.GetAllCards()
        this.message = message
        this.error=error
      },
      ChangeClose(add){
        this.add=add
      },
      async GetAllCards(){
            this.loading = true;
            await axios.get(fetchUrl+"/reservations/cancelRequests", 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                  this.loading = false;
                    this.allcancelRequests=res.data;
                    this.totalNumber = Math.ceil(this.allcancelRequests.length /6)
                    this.showCancelRequests = this.allcancelRequests.slice(0,6)
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
        },
        paginationHundel(i){
          if (i>=1 && i<=this.totalNumber) {
            this.page = i
            this.showCancelRequests = this.allcancelRequests.slice((i-1)*6,((i-1)*6)+6)
          }
        },
    },
    components: {
        Header,
        Nav,
        SideBar,
        Add,
        EditType
    },
    created(){
        this.GetAllCards();
    }, 
    }
</script>

<style>
.table.cancel .pending{
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
.table.cancel .done{
    color:#26A69A;
    border:1px solid #26A69A;
    background-color:#26a6996b;

}
</style>