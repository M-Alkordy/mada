<template>
    <div class="specifics-booking">
        <div class="Add-booking">
            <div class="body">
                <AddBookingDetails
                :from=specificsInfo.travel.destination.start_city.name
                :to=specificsInfo.travel.destination.end_city.name
                :Class='(specificsInfo.travel_degree.type == "economic")? "درجة سياحية" : "درجة رجال الأعمال"'
                :date=specificsInfo.go_date
                :time=specificsInfo.travel.leave_time
                :airlineLogo='specificsInfo.travel.destination.airline.image'
                :airlineName=specificsInfo.travel.destination.airline.name
                :price=specificsInfo.cost
                :bookingType='(specificsInfo.sure == 1) ? "مؤكد" : "مؤقت"'
                :numberTraveler= " specificsInfo.travelers.length"
                :old=specificsInfo.adult_count
                :child=specificsInfo.child_count
                :baby=specificsInfo.infant_count
                :ReservationNumber=specificsInfo.id
                numberTransfer="354645768"
                :bookingStatus='(specificsInfo.status == "new")? "حجز جديد" : (specificsInfo.status == "approved")? "تم الموافقة على البيانات" : (specificsInfo.status == "done") ? "تم الحجز" : "تم الموافقة على الدفع"'
                :Specifics=true
                :travelers=true
                 />
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import AddBookingDetails from './AddBookingDetails.vue'
export default {
    data(){
        return{
            search:false,
            Complete:false,
            travelers:true,
            Specifics:true,
            Check:false,
            Add:false,
            done:false,
            users:[{name:"1اسم المستخدم", img:"./src/assets/img/user-pic.svg"} , {name:"2اسم المستخدم", img:"./src/assets/img/user-pic.svg"} , {name:"3اسم المستخدم", img:"./src/assets/img/user-pic.svg"}]
        }
        },   
    methods:{
    passEvent()
    {
        this.$emit('ChangeDone',true)
    }
    },
    props: {
        specificsInfo:Object
    },
    components:{
        AddBookingDetails
    },
}
</script>
