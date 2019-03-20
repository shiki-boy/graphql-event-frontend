import HomePage from './components/pages/Auth/AuthPage'
import BookingsPage from './components/pages/Bookings/BookingsPage'
import EventsPage from './components/pages/Events/EventsPage'
import CreateEventPage from './components/pages/Events/CreateEventPage'

export const routes = [{
    path: '',
    components: {
      default: HomePage
    }
  },
  {
    path: '/events',
    components: {
      default: EventsPage
    }
  },
  {
    path: '/events/create',
    components: {
      default: CreateEventPage
    }
  },
  {
    path: '/bookings/:id',
    components: {
      default: BookingsPage
    }
  }
]
