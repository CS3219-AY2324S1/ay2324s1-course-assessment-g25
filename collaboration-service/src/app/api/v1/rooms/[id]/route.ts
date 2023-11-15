import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'https://api.liveblocks.io/v2'

// Get a room
export async function GET(request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const response = await fetch(BASE_URL + `/rooms/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`
    }
  })

  const data = await response.json()
  return NextResponse.json(data)
}

// Update a room
export async function POST(request: NextRequest, 
  { params }: { params: { id: string } } 
) {
  const id = params.id
  const body = await request.json()
  /**
   * Example body:
    {
      "defaultAccesses": [
        "room:write"
      ],
      "metadata": {
        "color": "blue"
      }
    }
   */
  const response = await fetch(BASE_URL + `/rooms/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data)
}

// Delete a room
export async function DELETE(request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const response = await fetch(BASE_URL + `/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY!}`
    }
  })
  const data = await response.json()
  return NextResponse.json(data)
}
