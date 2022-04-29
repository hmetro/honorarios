import { Routes, DefaultRoute } from './routes'

/* Wire up mithril app to DOM */
const $root = document.body.querySelector('#app')

document.body.style.zoom = "100%";
m.route($root, DefaultRoute, Routes)