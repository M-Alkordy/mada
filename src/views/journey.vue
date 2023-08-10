<template>
        <div class="main">
            <Nav />
            <Header 
                title="الرحلات"
                info="يمكنك استعراض و إدارة الرحلت  في المنصة"
                addBtn="إضافة رحلة جديدة"
                @ChangeAdd="ChangeA($event)"
                v-if="!add && !edit"/>
            <div class="filter" v-if="!add && !edit">
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
            <div class="journey-container" v-if="!add && !edit">
                <BigCard v-for="journey in showJourneies"
                :journey = journey
                :airlineLogo=journey.destination.airline.image
                :airlineName=journey.destination.airline.name
                :from=journey.destination.start_city.name
                :to=journey.destination.end_city.name
                :time=journey.leave_time
                :weight=journey.weight
                :days=journey.week_days
                :id=journey.id
                :economic=journey.economic
                :vip=journey.vip
                @ChangeEdit = "ChangeE($event)"
                />
            </div>
            <div class="pagination book" v-if="!add && !edit">
                <button @click="paginationHundel(page-1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(-90deg);"> </button>
                <button class="num" v-for="i in totalNumber" @click="paginationHundel(i)" :class="{active:page==i}">{{ i }}</button>
                <button @click="paginationHundel(page+1)"><img src="./../assets/img/arrow-down.svg" alt="" style="transform: rotate(90deg);"> </button>
            </div>
            <AddJourney v-if="add"
            @ChangeAdd="ChangeAdd($event)"
            @ChangeClose="ChangeClose($event)"
            />
            <AddJourney v-if="edit"
            :Journey = editJourney
            :edit = edit
            @ChangeAdd="ChangeAdd($event)"
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
    <SideBar :open=true />
</template>

<script>
import Nav from '../components/Nav.vue';
import Header from '../components/Header.vue';
import SideBar from '../components/SideBar.vue';
import BigCard from '../components/BigCard.vue';
import AddJourney from '../components/AddJourney.vue';
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
            edit:false,
            allJourneies:[],
            showJourneies:[],
            editJourney : [],
            loading: false,
            error: false,
            message:"",
            totalNumber:0,
            page:1,
            search:'',
            sort:'new'
        }
        },
    methods:{
        ChangeA(add){
            this.add=add;
        },
        ChangeAdd({add , edit, message , error}){
            this.add=add;
            this.edit=edit;
            this.message= message;
            this.error=error
            this.GetAllCards();
        },
        ChangeClose({add , edit}){
            this.add=add;
            this.edit=edit;
        },
        ChangeE({journey , edit}){
            this.edit=edit;
            this.editJourney=journey;
            console.log(this.editJourney)
        },
        GetAllCards(){
            this.loading = true;
            var q = this.search!='' ? "search="+this.search : "";
            var s = this.sort!='' ? "&sort="+this.sort : "";
            axios.get(fetchUrl+`/travels/all`, 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info")).token,
                }}, 
                )
                .then(res =>{this.loading = false;
                    console.log(res);
                    this.allJourneies=res.data;
                     this.showJourneies = this.allJourneies;
                     this.totalNumber = Math.ceil(this.allJourneies.length /3)
                    this.showJourneies = this.allJourneies.slice(0,3)
                    //  this.showReservations = res.data.meta.per_page;
                    // this.current_page = res.data.meta.current_page;
                    // this.last_page = res.data.meta.last_page;
                    
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
        },
        paginationHundel(i){
            if (i>=1 && i<=this.totalNumber) {
                this.page = i
                this.showJourneies = this.allJourneies.slice((i-1)*3,((i-1)*3)+3)
            }
        },
        nextPage(){
          if(this.current_page <= this.last_page){
            this.current_page = this.current_page + 1;
          }
        },
        previeusePage(){
          if(this.current_page > 1){
            this.current_page = this.current_page - 1
          }
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
        current_page(_new,_old){
        this.GetAllCards();
        },
    }, 
    components: {
        Nav,
        Header,
        SideBar,
        BigCard,
        AddJourney
    },}
</script>

<style>
.journey-container{
    display: grid;
    grid-template-rows: repeat(3 , 1fr);
    gap: 2%;
    width: 94%;
    margin: 3vh auto;
}
</style>