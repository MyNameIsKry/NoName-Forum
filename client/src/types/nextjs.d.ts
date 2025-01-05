import { NextRequest } from 'next/server';

declare module 'next/server' {
    interface NextRequest {
        user?: {
            id: string;
            username: string;
            email: string;
            role: string;
        }
    }
}