<template>
    <div class="main">
        <Nav />
        <Header 
            title="المدن"
            info="يمكنك استعراض و إدارة المدن في المنصة"
            addBtn="إضافة مدينة جديده"
            @ChangeAdd="ChangeA($event)"
        />
        <Add v-if="add" 
            title="إضافة مدينة جديدة"
            firstInput="اسم المدينة"
            validate="cities"
            firstPlaceholder="يرجى  كتابة اسم المدينة"
            secInput="المطار"
            secPlaceholder="يرجى  كتابة اسم المطار"
            thirdInput="الكود"
            thirdPlaceholder="يرجى  كتابة الكود"
            :city= true
            api="/cities"
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
            <Card v-for="city in allCities"  
            :name= city.name
            :airportName=city.airport_name
            :barcode=city.code
            :id=city.id
            :city=true
            @ChangeEdit="ChangeE($event)"/>
        </div>
        <div class="pagination">
            <button @click="paginationHundel(page-1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
            <button class="num" v-for="i in totalNumber" @click="paginationHundel(i)" :class="{active:page==i}">{{ i }}</button>
            <button @click="paginationHundel(page+1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
        </div>
        <Edit  v-for="city in allCities" 
            :edit="edit"
            :id="city.id"
            title="تعديل المدينة "
            firstInput="اسم المدينة"
            firstPlaceholder="يرجى  كتابة اسم المدينة"
            secInput="المطار"
            secPlaceholder="يرجى  كتابة اسم المطار"
            thirdInput="الكود"
            thirdPlaceholder="يرجى  كتابة الكود"
            :firstValue="city.name"
            :secValue="city.airport_name"
            :thirdValue="city.code"
            :city= true
            api="/cities"
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
            edit:-1,
            loading: false,
            error: false,
            allCities: [],
            totalNumber:0,
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
            this.message = message
            this.error=error
        },
        ChangeClose(add){
            this.add=add;
        },
        ChangeE(edit){
            this.edit=edit;
        },
        ChangeEdit({edit,message , error}){
            this.edit=edit;
            this.message=message;
            this.error =error
            this.GetAllCard();
        },
        GetAllCard(){
            this.loading = true;
            var q = this.search!='' ? "&search="+this.search : "";
            var s = this.sort!='' ? "&sort="+this.sort : "";
            axios.get(fetchUrl+"/cities" + `?paginate=1&page=${this.page}${q}${s}`, 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{
                    this.loading = false;
                    this.allCities=res.data.data;
                    this.totalNumber=res.data.meta.last_page;
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
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
