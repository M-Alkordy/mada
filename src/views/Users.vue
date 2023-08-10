<template>
    <div class="main">
        <Nav/>
        <div class="users" v-if="!clients && !employees">
          <div class="header">
            <div class="text">
              <p class="title">اعدادات المستخدمين</p>
              <p class="info">أدر جميع المستخدمين من مكان واحد</p>
            </div>
          </div>
          <div class="container">
            <div class="employees" @click="employeesHundel()">
              <img src="../assets/img/users.svg">
              <p>الموظفين</p>
            </div>
            <div class="clients"  @click="clientsHundel()">
              <img src="../assets/img/users.svg">
              <p>العملاء</p>
            </div>
          </div>
        </div>
        <Header 
            v-if="clients"
            :user="true"
            title="المستخدمين"
            info="يمكنك رؤية و إدارة المستخدمين في المنصة"
            addBtn="إضافة مستخدم"
            @ChangeAdd="ChangeA($event)"
            @ChangeBack="ChangeBack($event)"
        />
        <Header 
            v-if="employees"
            :user="true"
            title="الموظفين"
            info="يمكنك رؤية و إدارة الموظفين في المنصة"
            addBtn="إضافة موظف"
            @ChangeAdd="ChangeA($event)"
            @ChangeBack="ChangeBack($event)"
        />
        <p class="text-center table-title" v-if="clients">المستخدمون</p>
        <p class="text-center table-title" v-if="employees">الموظفون</p>
        <v-table class="table cancel" v-if="clients ||employees">
          <thead>
            <tr>
              <th class="text-center">
                إجراءات
              </th>
              <th class="text-center" v-if="employees">
                الصلاحيات
              </th>
              <th class="text-center">
                البريد الإلكتروني
              </th>
              <th class="text-center">
                رقم الجوال
              </th>
              <th class="text-center">
                الاسم
              </th>
            </tr>
          </thead>
          <tbody v-if="employees">
            <tr
              v-for="user in showEmployees"
              >
              <td class="text-center"><span class="specifics" @click="editemployeHundel(user)">تعديل معلومات الموظف</span> </td>
              <td class="text-center"><span>{{ user.role }}</span></td>
              <td class="text-center">{{ user.email }}</td>
              <td class="text-center">+{{ user.phone_code + user.phone }}</td>
              <td class="name text-center">
                <div>
                  <p>{{ user.name }}</p>
                </div> 
                <img :src=imageHundel(user.image) alt="" style="width: 50px; height: 50px;"></td>
            </tr>
          </tbody>
          <tbody v-if="clients">
            <tr
              v-for="user in showClients"
              >
              <td class="text-center"><span class="specifics" @click="editemployeHundel(user)">تعديل معلومات المستخدم</span> </td>
              <td class="text-center">{{ user.email }}</td>
              <td class="text-center">+{{ user.phone_code + user.phone }}</td>
              <td class="name text-center">
                <div>
                  <p>{{ user.name }}</p>
                </div> 
                <img :src=imageHundel(user.image)  alt="" style="width: 50px; height: 50px;"></td>
            </tr>
          </tbody>
        </v-table>
        <div class="pagination book" v-if="clients">
            <button @click="paginationHundel(page-1 , 'clients')"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" v-for="i in totalClientsNumber" @click="paginationHundel(i , 'clients')" :class="{active:page==i}">{{ i }}</button>
            <button @click="paginationHundel(page+1 , 'clients')"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <div class="pagination book" v-if="employees">
            <button @click="paginationHundel(page-1 , 'employees')"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" v-for="i in totalEmployeesNumber" @click="paginationHundel(i, 'employees')" :class="{active:page==i}">{{ i }}</button>
            <button @click="paginationHundel(page+1, 'employees')"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <Add
        v-if="add && clients"
        :account=true 
        :employees=employees
        :clients=clients
        title=" بيانات الحساب المطلوبة"
        api="/register"
        firstInput="الاسم الكامل"
        firstPlaceholder="يرجى كتابة الاسم كامل"
        thirdInput="رقم الجوال"
        thirdPlaceholder="يرجى إدخال رقم الجوال"
        FifthInput="البريد الالكتروني"
        FifthPlaceholder="يرجى إدخال البريد الإلكتروني"
        SixthInput="كلمة السر"
        SixthPlaceholder="يرجى إدخال كلمة السر"
        @ChangeAdd="ChangeAdd($event)" 
        @ChangeClose="ChangeClose($event)" 
        />
        <Add
        v-if="add && employees"
        :account=true 
        :employees=employees
        :clients=clients
        title=" بيانات الحساب المطلوبة"
        api="/createAdmin"
        logo="الصورة الشخصية"
        firstInput="الاسم الكامل"
        firstPlaceholder="يرجى كتابة الاسم كامل"
        thirdInput="رقم الجوال"
        thirdPlaceholder="يرجى إدخال رقم الجوال"
        FifthInput="البريد الالكتروني"
        FifthPlaceholder="يرجى إدخال البريد الإلكتروني"
        SixthInput="كلمة السر"
        SixthPlaceholder="يرجى إدخال كلمة السر"
        @ChangeAdd="ChangeAdd($event)" 
        @ChangeClose="ChangeClose($event)" 
        />

        <Add
        v-if="edit && clients"
        :account=true 
        :employees=employees
        :clients=clients
        :edit =edit
        :editemployeinfo=editemployeinfo
        title=" بيانات الحساب المطلوبة"
        firstInput="الاسم الكامل"
        firstPlaceholder="يرجى كتابة الاسم كامل"
        thirdInput="رقم الجوال"
        thirdPlaceholder="يرجى إدخال رقم الجوال"
        FifthInput="البريد الالكتروني"
        FifthPlaceholder="يرجى إدخال البريد الإلكتروني"
        SixthInput="كلمة السر"
        SixthPlaceholder="يرجى إدخال كلمة السر"
        @ChangeAdd="ChangeEdit($event)"
        @ChangeClose="ChangeClose($event)"
         />

        <Add
        v-if="edit && employees"
        :account=true 
        :employees=employees
        :clients=clients
        :edit =edit
        :editemployeinfo=editemployeinfo
        title=" بيانات الحساب المطلوبة"
        logo="الصورة الشخصية"
        firstInput="الاسم الكامل"
        firstPlaceholder="يرجى كتابة الاسم كامل"
        thirdInput="رقم الجوال"
        thirdPlaceholder="يرجى إدخال رقم الجوال"
        FifthInput="البريد الالكتروني"
        FifthPlaceholder="يرجى إدخال البريد الإلكتروني"
        SixthInput="كلمة السر"
        SixthPlaceholder="يرجى إدخال كلمة السر"
        @ChangeAdd="ChangeEdit($event)"
        @ChangeClose="ChangeClose($event)"
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
    <SideBar :open=false />
</template>

<script >
import Nav from '../components/Nav.vue';
import SideBar from '../components/SideBar.vue';
import Add from '../components/Add.vue';
import Header from '../components/Header.vue';
import Edit from '../components/Edit.vue';
import axios from 'axios';
export default {
    data(){
        return{
            edit:false,
            add:false,
            employees:false,
            clients:false,
            Back:false,
            allUsers:[],
            allClients:[],
            allEmployees:[],
            showClients:[],
            showEmployees:[],
            loading: false,
            error: false,
            message:"",
            editemployeinfo: {},
            page:1,
            totalEmployeesNumber:0,
            totalClientsNumber:0,
        }
        },
    methods:{
      employeesHundel (){
        this.employees=!this.employees
        this.GetAllCards()
      },
      editemployeHundel(user){
        this.editemployeinfo=user
        this.edit=!this.edit;
      },
      clientsHundel (){
        this.clients=!this.clients
        this.GetAllCards()
      },
      ChangeEdit({add,message , error}){
        this.edit=add
        this.message=message
        this.error=error
        this.GetAllCards()
      },
      ChangeAdd({add,message , error}){
            this.add=add;
            this.message = message;
            this.error = error
            this.GetAllCards()
      },
      ChangeA(add){
            this.add=add;
      },
      ChangeClose(value){
            this.add=value;
            this.edit=value;
      },
      ChangeBack(Back){
        this.page=1
        this.Back=Back;
        this.clients = this.Back ? false : true;
        this.employees = this.Back ? false : true;
      },imageHundel(image){
        if (image) {
          return imageUrl + image;
        }
          else{
            return './src/assets/img/profile-pic.svg';
          }
        },
      GetAllCards(){
        this.loading=true
            axios.get(fetchUrl+"/users", 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                  this.loading=false
                    this.allUsers=res.data;
                    this.allClients= this.allUsers.filter(e => e.role =='user')
                    this.allEmployees= this.allUsers.filter(e => e.role !='user')
                    this.totalClientsNumber= Math.ceil(this.allClients.length /6)
                    this.totalEmployeesNumber=Math.ceil(this.allEmployees.length /6)
                    this.showEmployees = this.allEmployees.slice(0,6)
                    this.showClients = this.allClients.slice(0,6)
                })
                .catch(error => {this.error=true
                        this.loading=false
                        this.message = error.response.data.message});
        },
        paginationHundel(i , type){
          if (type=="clients") {
            if (i>=1 && i<=this.totalClientsNumber) {
              this.page = i
              this.showClients = this.allClients.slice((i-1)*6,((i-1)*6)+6)
          }
          } else{
            if (i>=1 && i<=this.totalEmployeesNumber) {
              this.page = i
            this.showEmployees = this.showEmployees.slice((i-1)*6,((i-1)*6)+6)
          }
          }

        },
    },
    components: {
        Header,
        Nav,
        SideBar,
        Add,
        Edit
    },}
</script>

<style>
.users{
    direction: rtl;
}

.users .container div{
    width: 327px;
    height: 164px;
    background-color: #ffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 23px;
    border-radius: 14px;
    cursor: pointer;
    }

.users .container div p{
    font-size: 18px;
    color: #4C535F;
    }
.table-title{
  font-size: 30px;
  color: #2E3092!important;
}
.table.cancel .Underway{
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

.container .employees img,
.container .clients img{
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #2E3092;
}
</style>