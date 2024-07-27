import { FastifyInstance } from 'fastify';
import fastifyPassport from "@fastify/passport";

export async function oauth2Route(fastify: FastifyInstance) {
    fastify.get('/google', {
        preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }),
        handler: (request, reply) => {}
      });
      
    fastify.get(
      '/google/callback',
      {
        preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }),
        handler: (request, reply) => {
          if (request.authInfo) {
              reply.redirect("http://localhost:3000");
          }
        }
      }
    );

    fastify.get("/logout", (req, res) => {
      req.logOut();
      
      return { success: true }
    })
}