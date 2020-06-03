export default [
  {
    title: "Tour Management | Booking",
    component: "./page/management-tour/tour-management",
    path: "/admin/tour-management",
    isProtected: true,
  },
  {
    title: "Admin New Tour | Booking",
    component: "./page/management-tour/add-new-tour",
    path: "/admin/tour-management/new-tour",
    isProtected: true,
  },
  {
    title: "Admin EditTour | Booking",
    component: "./page/management-tour/edit-admin-tour",
    path: "/admin/tour-management/edit-tour/:id",
    isProtected: true,
  },
  {
    title: "User Management | Booking",
    component: "./page/user-management",
    path: "/admin/user-management",
    isProtected: true,
  },
  {
    title: "Dashboard | Booking",
    component: "./page/dashboard-admin",
    path: "/admin/dashboard",
    isProtected: true,
  },
  {
    title: "Booking Management | Booking",
    component: "./page/booking-management",
    path: "/admin/booking-management",
    isProtected: true,
  },
  {
    title: "Booking Management | Booking",
    component: "./page/itemDetailBooked",
    path: "/admin/booking-management/detail/:id",
    isProtected: true,
  },
  {
    title: "Admin Login | Booking",
    component: "./page/login-admin",
    path: "/admin/login-admin",
    isProtected: false,
  },
  {
    title: "Admin Login | Booking",
    component: "./page/login-admin",
    path: "/admin",
    isProtected: false,
  },
];
