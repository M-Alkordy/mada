import { createRouter, createWebHistory } from 'vue-router'
import Airlines from '../views/Airlines.vue'
import cities from '../views/cities.vue'
import destination from '../views/destination.vue'
import journey from '../views/journey.vue'
import Booking from '../views/Booking.vue'
import CancelBooking from '../views/CancelBooking.vue'
import BookingSettings from '../views/BookingSettings.vue'
import Root from '../views/Root.vue'
import LogIn from '../views/LogIn.vue'
import AddBooking from '../views/AddBooking.vue'
import Users from '../views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'root',
      component: Root
    },
    {
      path: '',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/airlines',
      name: 'Airlines',
      component: Airlines
    },
    {
      path: '/cities',
      name: 'cities',
      component: cities
    },
    {
      path: '/destination',
      name: 'destination',
      component: destination
    },
    {
      path: '/journey',
      name: 'journey',
      component: journey
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    },
    {
      path: '/AddBooking',
      name: 'AddBooking',
      component: AddBooking
    },
    {
      path: '/CancelBooking',
      name: 'CancelBooking',
      component: CancelBooking
    },
    {
      path: '/BookingSettings',
      name: 'BookingSettings',
      component: BookingSettings
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users
    },
  ]
})

export default router
