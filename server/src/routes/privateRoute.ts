import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { categoryRoutes } from "./private/categoryRoute";

const privateRoute = async (fastify: FastifyInstance) => {
    fastify.register(categoryRoutes, { prefix: "/admin/category" });
};

export default fastifyPlugin(privateRoute);