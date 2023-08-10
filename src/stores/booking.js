import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
    state: () => {
        return {
            booking: {
                adults: 0,
                childs:0,
                babies:0,
                count : 0 ,
            },
        };
    },
    actions: {
        loadBooking() {
            var adult = localStorage.getItem('adult');
            if(adult) this.booking.adults = adult;
            var child = localStorage.getItem('childs');
            if(child) this.booking.childs = child;
            var baby = localStorage.getItem('babies');
            if(baby) this.booking.babies = baby;
            var count = localStorage.getItem('count');
            if(count) this.booking.count = count;
        }
    },
})
