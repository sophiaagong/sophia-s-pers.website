import { createWebHashHistory, createRouter } from "vue-router";
import Layout from "../components/Layout/layout.vue"
import home from "../components/home/home.vue"
import musical from "../components/musical/musical.vue";

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
                path: "musicals",
                name: "Musicals",
                component: musical
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