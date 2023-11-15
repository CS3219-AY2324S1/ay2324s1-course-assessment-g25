import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'https://api.liveblocks.io/v2'

// Get all rooms
export async function GET(request: NextRequest) {
  const response = await fetch(BASE_URL + `/rooms`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`
    }
  })

  const data = await response.json()
  return NextResponse.json(data)
}

// Create a room
export async function POST(request: NextRequest) {
  const body = await request.json()
  /**
   * Example body:
    {
      "id": 'my-room-id',
      "defaultAccesses": [
        "room:write"
      ],
      "metadata": {
        "color": "blue"
      }
    }
   */
  const response = await fetch(BASE_URL + `/rooms`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data)
}
