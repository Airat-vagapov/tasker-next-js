import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.AI_API_URL
const USER = process.env.AI_USER
const PASSWORD = process.env.AI_PASSWORD

// export async function GET (req: NextRequest) {
//     const res = await fetch(`${API_URL}/models`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + btoa(`${USER}:${PASSWORD}`)
//         },       
//     })
//     const data = await res.json()
//     return NextResponse.json(data, {status: res.status})
// }

export async function POST(req: NextRequest) {
    const body = await req.json()
    const res = await fetch(`${API_URL}/completions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${USER}:${PASSWORD}`)
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()
    return NextResponse.json(data, {status: res.status})
    
}