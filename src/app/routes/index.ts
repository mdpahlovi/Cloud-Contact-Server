import express from "express";
import { ContactRoutes } from "../modules/contact/contact.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/contact",
        routes: ContactRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
