<template>
    <div class="main">
        <Nav />
        <Header 
            title="الوجهات"
            info="يمكنك رؤية و إدارة الوجهات  في المنصة"
            addBtn="إضافة وجهة جديدة"
            @ChangeAdd="ChangeA($event)"
        />
        <Add v-if="add" 
            title="إضافة وجهة جديدة "
            firstInput="اسم شركة الطيران"
            secInput="مدينة الانطلاق"
            validate="destinations"
            thirdInput="مدينة الوصول"
            :destination= true
            :allCities = allCities
            :allAirlines = allAirlines
            api="/destinations"
            @ChangeAdd="ChangeAdd($event)"
            @ChangeClose="ChangeClose($event)"
        />
        <div class="filter">
            <div class="list">
                <select v-model="sort" class="form-select" >
                    <option value="new">الأحدث أولا</option>
                    <option value="old">الأقدم أولا</option>
                </select>
                <button>فلترة العناصر <img src="../assets/img/filter.svg"></button>
            </div>
            <div class="search">
                <button><img src="../assets/img/search.svg"></button>
                <input type="text" placeholder="ابحث عن البيانات" @input="debounce(() => { search=$event.target.value; } , 1500);">
            </div>
        </div>
        <div class="container">
            <Card v-for="destination in allDestinations"
            destination="true"
            :id=destination.id
            :departureCity="destination.start_city.name"
            :arrivalCity="destination.end_city.name"
            :image="destination.airline.image"
            :name="destination.airline.name"
            @ChangeEdit="ChangeE($event)"/>
        </div>
        <div class="pagination">
            <button @click="previeusePage()"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" :class="{active:page==i}">{{ current_page }}</button>
            <button @click="nextPage()"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <Edit  v-for="destination in allDestinations"
            :edit="edit"
            :id="destination.id"
            title="تعديل الوجهة"
            firstInput="اسم شركة الطيران"
            secInput="مدينة الانطلاق"
            thirdInput="مدينة الوصول"
            :firstValue="destination.airline.id"
            :thirdValue="destination.start_city.id"
            :secValue="destination.end_city.id"
            :allCities = allCities
            :allAirlines = allAirlines
            :destination= true
            api="/destinations"
            @ChangeClose="ChangeEdit($event)"
            @passClose="ChangeE($event)"
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

<script>
import Nav from '../components/Nav.vue';
import Header from '../components/Header.vue';
import Add from '../components/Add.vue';
import Card from '../components/Card.vue';
import Edit from '../components/Edit.vue';
import SideBar from '../components/SideBar.vue';
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
            add:false,
            edit: -1,
            allCities: [],
            allAirlines: [],
            allDestinations: [],
            loading: false,
            error: false,
            totalNumber:0,
            showReservations:'',
            current_page:'',
            last_page:'',
            page:1,
            message:"",
            search:'',
            sort:'new',
        }
        },
    methods:{
        paginationHundel(i){
            if (i>=1 && i<=this.totalNumber) {
                this.page=i;
                this.GetAllCard()
            }
        },
        ChangeA(add){
            this.add=add;
        },
        ChangeAdd({add,message , error}){
            this.add=add;
            this.GetAllCard();
            this.message = message;
            this.error = error;
        },
        ChangeClose(add){
            this.add=add;
        },
        ChangeE(edit){
            this.edit=edit;
        },
        ChangeEdit({edit,message , error}){
            this.edit=edit;
            this.message = message;
            this.error=error;
            this.GetAllCard();
        },
        GetAllCard(){
            this.loading = true;
            var q = this.search!='' ? "&search="+this.search : "";
            var s = this.sort!='' ? "&sort="+this.sort : "";
            axios.get(fetchUrl+"/destinations" + `?paginate=1&page=${this.current_page}${q}${s}`, 
                {headers: {
                    Authorization: "Bearer " + "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.allDestinations=res.data.data;
                    this.totalNumber = res.data.meta.total;
                    this.showReservations = res.data.meta.per_page;
                    this.current_page = res.data.meta.current_page;
                    this.last_page = res.data.meta.last_page;
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
            axios.get(fetchUrl+"/cities" + `?paginate=0`, 
                {headers: {
                    Authorization: "Bearer " + "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.allCities=res.data;
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
            axios.get(fetchUrl+"/airlines" + `?paginate=0`, 
                {headers: {
                    Authorization: "Bearer " + "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading = false;
                    this.allAirlines=res.data;
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
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
    },
    created(){
            this.GetAllCard();
        },
    watch:{
        search(_new, _old){
            this.GetAllCard();
        },
        sort(_new, _old){
            this.GetAllCard();
        },
        current_page(_new,_old){
            this.GetAllCard();
        },
        
    },
    components: {
        Nav,
        Header,
        Add,
        Card,
        Edit,
        SideBar
    },}
</script>

<style>
</style>