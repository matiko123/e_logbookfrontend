import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/index.vue';
import store from '../store';

// Vue.use(VueRouter);
// import { createApp } from 'vue';
// const app = createApp();
// app.use(createRouter);

const routes = [
    //dashboard
    // {
    //     path: '/',
    //     name: 'login',
    //     component: () => import(/* webpackChunkName: "components-tabs" */ '../views/login.vue'),
    //     meta: { layout: 'auth' },
    // },

      {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/login.vue'),
        meta: { layout: 'auth' },
    },

    { path: '/home', name: 'Home', component: Home },

    {
        path: '/logbooks',
        name: 'logbooks',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/logbook/logbook_list.vue'),
    },

        {
        path: '/weeks',
        name: 'logbook-weeks',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/logbook/weeks.vue'),
    },

    

          {
        path: '/week-days/:week_id',
        name: 'week-days',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/logbook/week_days.vue'),
    },

      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/users/students.vue'),
    },

       {
        path: '/user/profile',
        name: 'user-profile',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/users/profile.vue'),
    },

     {
        path: '/student-weeks/:student_id',
        name: 'student-weeks',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/logbook/studentWeeks.vue'),
    },

            {
        path: '/supervisor-students',
        name: 'supervisor-students',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/users/supervisionStudents.vue'),
    },

      {
        path: '/settings/competences',
        name: 'settings-competences',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/settings/competence.vue'),
    },
     {
        path: '/settings/users',
        name: 'settings-users',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/settings/users_list.vue'),
    },

     {
        path: '/settings/roles',
        name: 'settings-roles',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/settings/role.vue'),
    },
   
     {
        path: '/settings/permissions',
        name: 'settings-permissions',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/settings/permission.vue'),
    },
     {
        path: '/settings/role-permissions',
        name: 'settings-role-permissions',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/settings/rolePermissions.vue'),
    },

   
];

const router = new createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;
