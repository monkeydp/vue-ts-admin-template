import Vue from 'vue'
import VueRouter, {RawLocation, Route, RouteConfig} from 'vue-router'
import userSession from "@/store/module/UserSession";
import Layout from '@/layout/index.vue';
import _ from 'lodash';
import {Dictionary} from "vue-router/types/router";

Vue.use(VueRouter)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

enum RoutePath {
    HOME = "/",
    LOGIN = "/login",
    DASHBOARD = 'dashboard',

    USER_MANAGE = '/user-manage',
    USER = '/user',
    USER_DETAIL = 'user-detail',
}

enum RouteName {
    HOME = "home",
    LOGIN = "login",
    DASHBOARD = 'dashboard',

    USER_MANAGE = 'user-manage',
    USER = 'user',
    USER_DETAIL = 'user-detail',
}

export const routes: RouteConfig[] = [
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */'@/view/404.vue'),
        meta: {hidden: true, skipAuth: true}
    },
    {
        path: RoutePath.LOGIN,
        component: () => import(/* webpackChunkName: "login"*/'@/view/login/index.vue'),
        meta: {hidden: true, skipAuth: true}
    },
    {
        path: RoutePath.HOME,
        name: RouteName.HOME,
        component: Layout,
        redirect: RoutePath.DASHBOARD,
        children: [
            {
                path: RoutePath.DASHBOARD,
                name: RouteName.DASHBOARD,
                component: () => import(/* webpackChunkName: "dashboard" */'@/view/dashboard/index.vue'),
                meta: {
                    title: 'dashboard',
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
    {
        path: RoutePath.USER_MANAGE,
        component: Layout,
        redirect: "noredirect",
        meta: {
            title: 'userMange',
            icon: 'user-manage',
            alwaysShow: true
        },
        children: [
            {
                path: RoutePath.USER,
                name: RouteName.USER,
                component: () => import(/* webpackChunkName: "user" */'@/view/user-manage/user/index.vue'),
                meta: {
                    title: 'user',
                    icon: 'user'
                }
            },
            {
                path: RoutePath.USER_DETAIL,
                name: RouteName.USER_DETAIL,
                component: () => import(/* webpackChunkName: "user-detail" */'@/view/user-manage/user/detail.vue'),
                meta: {
                    title: 'userDetail',
                    hidden: true
                }
            },
        ]
    },
    {
        path: '*',
        redirect: '/404',
        meta: {hidden: true}
    }
]

const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    base: process.env.BASE_URL,
    routes
})

export default router

declare module 'vue/types/vue' {
    interface Vue {
        $redirector: Redirector;
    }
}

class Redirector {

    redirect(location: RawLocation): Promise<Route> {
        return router.push(location)
    }

    redirectByName(location: RawLocation): Promise<Route> {
        return router.push(location)
    }

    home(): Promise<Route> {
        return this.redirect(RoutePath.HOME)
    }

    login(): Promise<Route> {
        return this.redirect({
            path: RoutePath.LOGIN,
            query: {from: router.currentRoute.fullPath}
        })
    }

    userDetail(query: Dictionary<string>): Promise<Route> {
        return this.redirectByName({
            name: RouteName.USER_DETAIL,
            query: query
        })
    }

    redirectWithFrom(): Promise<Route> {
        const from = router.currentRoute.query['from'] as string
        if (_.isEmpty(from))
            return this.home()
        else return this.redirect(from)
    }
}

const redirector = new Redirector()
Vue.prototype.$redirector = redirector


router.beforeEach(async (to, from, next) => {
    const needAuth = !to.meta.skipAuth && !userSession.isLogged
    if (needAuth) {
        await userSession.cleanBeforeLogin()
        const location: RawLocation = {path: RoutePath.LOGIN}
        if (to.path != RoutePath.LOGIN) location.query = {from: to.fullPath}
        next(location)
    } else {
        next()
    }
})
