import Main from '@/pages/Main'
import Posts from '@/pages/Posts';
import Albums from '@/pages/Albums'
import PostIdPage from '@/pages/PostIdPage'
import AlbumIdPage from '@/pages/AlbumIdPage'
import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/albums',
        component: Albums
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/albums/:id',
        component: AlbumIdPage
    }
]


const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;