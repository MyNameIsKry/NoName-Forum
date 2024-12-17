import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function isTargetUserMiddleware(fastify: FastifyInstance) {
    fastify.decorate("isTargetUserMiddleware", async (request: FastifyRequest, reply: FastifyReply) => {
        const { userId } = request.body as { userId: string };

        console.log(userId);
        console.log(request.user?.id);

        if (!request.user || request.user.id !== userId) {
            reply.code(403).send({
            error: "Bạn không có quyền thay đổi thông tin người dùng này.",
            });
        }
    });
  }
  

export default isTargetUserMiddleware;