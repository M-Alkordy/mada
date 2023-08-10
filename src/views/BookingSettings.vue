<template>
    <div class="main">
        <Nav/>
        <div class="settings">
            <div class="header">
                <div class="text">
                    <p class="title">اعدادات الحجز</p>
                    <p class="info">إدر جميع اعدادات الحجوزات من مكان واحد</p>
                </div>
            </div>
            <div class="container">
                <div class="fine" @click="fine=!fine">
                    <img src="../assets/img/fine.svg">
                    <p>الغرامات ونسب الخصم</p>
                </div>
                <div class="class"  @click="Class=!Class">
                    <img src="../assets/img/class.svg">
                    <p>اغلاق الدرجات</p>
                </div><br>             
            </div>
            
            <Add 
            v-if="fine"
            :setting=true
            title="الغرامات ونسب الخصم"
            firstInput="- تحديد نسبة الخصم من سعر التذكرة للفئات(الأطفال - الرضع)"
            firstPlaceholder="نسبة الخصم الاطفال"
            secInput="تحديد الغرامات لإللغاء والتعديل قبل الرحلة "
            secPlaceholder="تحديد الغرامات لإللغاء والتعديل قبل الرحلة "
            thirdInput="تحديد الغرامات لإللغاء والتعديل بعد الرحلة "
            thirdPlaceholder="تحديد الغرامات لإللغاء والتعديل بعد الرحلة "
            settingPlaceholder="نسبة الخصم الرضع"
            api="/discounts/updateinfo"
            @ChangeAdd="ChangeA($event)"
            @ChangeClose="ChangeClose($event)"
            />
            <Add 
            v-if="Class"
            :Class=true
            :allTravels=allTravels
            title="اغلاق الدرجة"
            validate="close_book"
            thirdInput="حدد الرحلة "
            FourthInput="حدد الدرجة "
            FifthInput="حدد التاريخ "
            FifthPlaceholder="حدد التاريخ "
            api="/travels/close_degree"
            @ChangeAdd="ChangeC($event)"
            @ChangeClose="ChangeClose($event)"
            />
        

            
            <div class="mainTable">
                <v-table class="table cancel" width="100%" style="height:300px ;">
                    <thead>
                        <tr>
                        <th class="text-center">
                            الدرحة
                        </th>
                        <th class="text-center">
                            عدد المقاعد 
                        </th>
                        <th class="text-center">
                            تاريخ الانشاء
                        </th>
                        <th class="text-center">
                            تاريخ التعديل 
                        </th>
                        </tr>
                    </thead>
                <tbody>
                <tr
                v-for="item in degrees"
                :key="item"
                >
                <td class="text-center">{{ item.id}}</td>
                <td class="text-center">{{ item.chairs }}</td>
                <td class="text-center">{{ item.created_at}}</td>
                <td class="name text-center">{{ item.updated_at }}</td>
                <td class="text-center"><span class="specifics" @click="change(item);degree=!degree">تعديل حالة الدرجة</span> </td>

                </tr>
                </tbody>
                </v-table> 
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
        <div class="layout" id="layout"></div>
        <div class="form-popup" id="form">
            <form action="/action_page.php" class="form-container">
                <h2 style="margin: 5px 20px;">تعديل الدرجة:</h2>
                <div style="display:flex;flex-direction: column">
                     <label style="margin: 10px 40px;" for="email"><b>عدد المقاعد:</b></label>
                    <input min="0" v-model="chairs" style="width:50%;margin: auto;margin-bottom: 60px;border:1px solid;border-radius: 20px;text-align: center;" type="number" placeholder="ادخل عدد المقاعد" name="email" required>
                </div>                
                <div style="display:flex;justify-content:space-around;margin-bottom: 10px;">
                    <button type="button" class="add-btn" @click="closemodal()">اغلاق</button>
                    <button type="button" class="add-btn" @click="editDegree()">تعديل</button>
                </div>

            </form>
        </div>
    </div>
    <SideBar :open=true />
</template>

<script >
import Nav from '../components/Nav.vue';
import SideBar from '../components/SideBar.vue';
import Add from '../components/Add.vue';
import axios from 'axios';
export default {
    data(){
        return{
            fine:false,
            Class:false,
            allTravels:[],
            loading: false,
            degrees:[],
            selected_item:'',
            message: "",
            chairs:'',
            degree:false,
            error: false,
            serverOptions: {
                page: 1,
                rowsPerPage: 10,
                sortBy: 'date',
                sortType: 'asc',
            },
            theme_color:'#19478D',
            loading: false,
            serverItemsLength: 0,
        }
        },
    components:{    
    },
    methods:{
      ChangeC({add,message , error}){
        this.Class=add
        this.message = message
        this.error = error

      },
      ChangeA({add,message , error}){
        this.fine=add
        this.message=message
        this.error = error
      },
      ChangeClose(value){
        if (this.fine) {
            this.fine=value
        }
        else if (this.Class) {
            this.Class=value
        }
        
      },
      closemodal(){
        document.getElementById('form').style.display='none';
        document.getElementById('layout').style.display='none'

      },
      GetAllCards(){
            axios.get(fetchUrl+"/travels/all", 
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info"))?.token,
                }}, 
                )
                .then(res =>{
                    this.allTravels=res.data;
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
        },
        getDegrees(){
            axios.get(fetchUrl+"/travels/close_degrees",
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info"))?.token,
                }}, 
                )
                .then(res =>{
                    this.degrees=res.data.data;
                    console.log(this.degrees);
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
        },
        change(item){
            this.selected_item=item;
            this.chairs=item.chairs??'';
            document.getElementById('form').style.display='block';
            document.getElementById('layout').style.display='block';
        },
        editDegree(){
            var data = {
                chairs : this.chairs,
                _method : 'PUT'
            }
            axios.post(fetchUrl+`/travels/close_degree/${this.selected_item.id}`,data,
                {headers: {
                    Authorization: "Bearer " + JSON.parse (localStorage.getItem("user_info"))?.token,
                }}, 
                )
                .then(res =>{
                    document.getElementById('form').style.display='none';
                    document.getElementById('layout').style.display='none';
                    this.getDegrees();
                })
                .catch(error => {this.error=true
                                this.loading=false 
                                this.message = error.response.data.message;});
        },
    },
    created(){
        this.GetAllCards();
    }, 
    computed:{
        headers(){
            return [
                { text: 'Id', value: "", width:'20' },
                { text: 'Id', value: "",width:'100'},
                { text: 'Id', value: "",width:'100'},
                { text: 'Id', value: "",width:'150'},
            ];
        },
    },
    mounted(){
        this.getDegrees();
    },
    components: {
        Nav,
        SideBar,
        Add,
    },}
</script>

<style scoped>
.settings{
    direction: rtl;
}
.form-popup{
    width: 40.2083vw;
    background-color: white;
    border-radius: 14px;
    direction: rtl;
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    z-index: 2;
}
.form-container{
    height: 100%;
}
.form-popup .add-btn , .add-popup .close{
    width: 200px;
    height: 40px;
    background-color: #2E3092;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}
.layout{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: none;
    width: 100% !important;
    height: 100vh;
    background-color: #2F3746;
    opacity: 0.6;
}
.settings .container div{
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
    .container{
        grid-template-rows:none;
    }
.settings .container table{
    width: 800px;
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

.settings .container div p{
    font-size: 18px;
    color: #4C535F;
    }
    .customize-table :deep() .vue3-easy-data-table__main{
        max-height: calc(100vh - 235px)!important;
    }
    @media (max-width: 992px){
        .customize-table :deep() .vue3-easy-data-table__main{
            max-height: calc(100vh - 235px)!important;
        }
        h3{
            font-size: 26px;
        }
    }
    .customize-table{
        --easy-table-border: 1px solid #eee;
        --easy-table-row-border: 1px solid #eee;
        
        --easy-table-header-font-size: 17px;
        --easy-table-header-height: 50px;
        --easy-table-header-font-color: #19478D;
        --easy-table-header-background-color: #eeefef;
        
        --easy-table-body-row-font-size: 15px;
        --easy-table-body-row-height: 46px;
        --easy-table-body-row-font-color:#6c757d;

        --easy-table-body-row-hover-background-color: #f8f5f5a1;	
    }
</style>