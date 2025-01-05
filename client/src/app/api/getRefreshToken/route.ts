import { NextRequest, NextResponse } from "next/server";

interface TokenResponse {
    refreshToken: string | null;
    status: number;
    error?: string;
}

export const GET = async (req: NextRequest): Promise<NextResponse<TokenResponse>> => {
    try {
        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json({
                refreshToken: null,
                status: 401,
                error: "Không tìm thấy refreshToken"
            }, { status: 401 });
        }

        return NextResponse.json({
            refreshToken,
            status: 200
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            refreshToken: null,
            status: 500,
            error: "Internal server error"
        }, { status: 500 });
    }
}