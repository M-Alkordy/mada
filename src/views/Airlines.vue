<template>
    <div class="main">
        <Nav />
        <Header 
            title="شركات الطيران"
            info="يمكنك رؤية و إدارة شركات الطيران في المنصة"
            addBtn="إضافة شركات الطيران"
            @ChangeAdd="ChangeA($event)"
        />
        <Add v-if="add"
            title="إضافة شركة طيران جديده"
            logo="شعار شركة الطيران"
            validate="true"
            firstInput="اسم شركة الطيران"
            firstPlaceholder="يرجى  ادخال اسم شركة الطيران"
            :Airlines= true
            api="/airlines"
            @ChangeAdd="ChangeAdd($event)"
            @ChangeClose="ChangeA($event)"
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
            <Card v-for="Airline in allAirlines" 
            :image= Airline.image
            :name=Airline.name
            :id=Airline.id
            @ChangeEdit="ChangeE($event)"/>
        </div>
        <div class="pagination">
            <button @click="paginationHundel(page-1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" v-for="i in totalNumber" @click="paginationHundel(i)" :class="{active:page==i}">{{ i }}</button>
            <button @click="paginationHundel(page+1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <Edit  v-for="Airline in allAirlines"
            :edit="edit"
            :id="Airline.id"
            title="تعديل شركة الطيران "
            logo="شعار شركة الطيران"
            firstInput="اسم شركة الطيران"
            firstPlaceholder="يرجى  ادخال اسم شركة الطيران"
            :firstValue="Airline.name"
            :image="Airline.image"
            :Airlines= true
            api="/airlines"
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
    <SideBar 
    :open=true />
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
            user_info: JSON.parse(localStorage.getItem("user_info")),
            allAirlines: [],
            loading: false,
            error: false,
            totalNumber:0,
            search:'',
            sort:'new',
            page:1,
            message:"",
        }
        },
    methods:{
        paginationHundel(i){
            if (i>=1 && i<=this.totalNumber) {
                this.page=i;
                this.GetAllCards()
            }
        },
        ChangeA(add){
            this.add=add;
        },
        ChangeAdd({add,message , error}){
            this.add=add;
            this.GetAllCards();
            this.message =message
            this.error =error
        },
        ChangeE(edit){
            this.edit=edit;
        },
        ChangeEdit({edit,message , error}){
            this.edit=edit;
            this.message=message;
            this.error=error;
            this.GetAllCards();
        },
        GetAllCards(){
            this.loading = true;
            var q = this.search!='' ? "&search="+this.search : "";
            var s = this.sort!='' ? "&sort="+this.sort : "";
            axios.get(fetchUrl+"/airlines" + `?paginate=1&page=${this.page}${q}${s}`, 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading=false
                    this.allAirlines=res.data.data;
                    this.totalNumber=res.data.meta.last_page;
                })
                .catch(error => {this.error=true
                    this.loading=false
                    this.message = error.response.data.message;});
        },
    },
    created(){
        this.GetAllCards();
    }, 
    watch:{
        search(_new, _old){
            this.GetAllCards();
        },
        sort(_new, _old){
            this.GetAllCards();
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