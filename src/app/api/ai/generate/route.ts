import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.AI_API_URL

export async function POST  (req: NextRequest) {
    const body = await req.json()
    const res = await fetch(`${BASE_URL}/generate` , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            "X-API-KEY" : 'tk-qK6h3fy0QR9tv0xFQSSMlsBqSsfEn2Qh'
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    return NextResponse.json(data, {status: res.status})
}