import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    
    return NextResponse.json({ refreshToken: refreshToken || null });
}