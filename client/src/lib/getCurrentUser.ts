// Server-only helpers. Do not import from "use client" files.
// Uses next/headers which throws on the client.

import { cookies } from "next/headers";
import axios from "axios";

export const getCurrentUserId = async (): Promise<string | null> => {
    const token = cookies().get("accessToken")?.value;
    if (!token) return null;

    try {
        const res = await axios.get<{ user?: { id?: string } }>(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data?.user?.id ?? null;
    } catch {
        return null;
    }
};

export const fetchUserData = async (username?: string): Promise<IUserInfo | null> => {
    const token = cookies().get("accessToken")?.value;
    if (!token) return null;

    try {
        const endpoint = username
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`
            : `${process.env.NEXT_PUBLIC_API_URL}/users/me`;

        const res = await axios.get<IUserInfo>(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch {
        return null;
    }
};
