import { createWebHashHistory, createRouter } from "vue-router";
import Layout from "../components/Layout/layout.vue"
import home from "../components/home/home.vue"
import about from "../components/about/about.vue";
import musical from "../components/musical/musical.vue";
import competition from "../components/competition/competition.vue";
import community from "../components/community/community.vue";

const routes = [
    {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
            {
                path: "",
                name: "Home",
                component: home
            },
            {
                path: "about",
                name: "About",
                component: about
            },
            {
                path: "musical",
                name: "Musical",
                component: musical
            },
            {
                path: "competition",
                name: "Competition",
                component: competition
            },
            {
                path: "community",
                name: "Community",
                component: community
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory('/'),
    routes,
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;