<template>
<div class="header">
    <div class="btn">
        <button @click='passEvent'><img src="../assets/img/add.svg"> {{ addBtn }}</button>
        <button @click='passBack' v-if="user" class="setting">الرجوع لنافذة المستخدمين الرئيسية</button>
        <button @click='passEvent' v-if="booking" class="setting"><img src="../assets/img/setting.svg"> {{ settingBtn }}</button>
    </div>
    <div class="text">
        <p class="title">{{ title }}</p>
        <p class="info">{{ info }}</p>
    </div>
</div>
</template>

<style>
.header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2.4074vh 2.9167vw;
}

.header button{
    width: 13.0208vw;
    height: 56px;
    background-color: #2E3092;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.9375vw;
    border: none;
    border-radius: 14px;
    cursor: pointer;
}

.header .text{
    direction: rtl;
    font-size: 1.25vw;
    font-weight: bold;
    color: #2F3746;
}

.header .text .info{
    font-size: 0.8333vw;
    color: #717B8C;
    padding-top: 1.0185vh;
}

.header .btn{
    width: 27.9166vw;
    display: flex;
    justify-content: space-between;
}

.header .btn .setting{
    background-color: #FBB03F;
}
</style>

<script>
export default {
    props: {
        title: String,
        info: String,
        addBtn: String,
        settingBtn: String,
        booking: Boolean,
        user: Boolean
    },    
    methods:{
    passEvent()
    {
      this.$emit('ChangeAdd',true)
    },
    passBack()
    {
      this.$emit('ChangeBack',true)
    }
  }
}
</script>