import { FastifyInstance } from 'fastify';
import fastifyPassport from "@fastify/passport";
import { GenerateToken } from "../../utils/generateToken";
import envConfig from '../../config';
import { prisma } from '../..';

export async function oauth2Route(fastify: FastifyInstance) {
    fastify.get('/google', {
        preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }),
        handler: (request, reply) => {}
      });
      
    fastify.get(
      '/google/callback',
      {
        preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }),
        handler: async (request, reply) => {
          const user = request.user;
          if (user) {
              const accessToken = new GenerateToken('access_token', envConfig?.JWT_ACCESS_TOKEN_EXPIRES_IN as string).generate(user);
              const refreshToken = new GenerateToken('refresh_token', envConfig?.JWT_REFRESH_TOKEN_EXPIRES_IN as string).generate(user);
            
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  refresh_token: refreshToken
                }
              })

              reply.setCookie("refreshToken", refreshToken, {
                httpOnly: false,
                sameSite: true,
                secure: false,
                path: "/"
              });

              reply.setCookie("accessToken", accessToken, {
                httpOnly: false,
                sameSite: true,
                secure: false,
                path: "/"
              });

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