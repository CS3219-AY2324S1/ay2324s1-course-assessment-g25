import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8084'

export async function GET(request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const response = await fetch(BASE_URL + `/api/v1/questions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest, 
  { params }: { params: { id: string } } 
) {
  const id = params.id
  const body = await request.json()

  const response = await fetch(BASE_URL + `/api/v1/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const response = await fetch(BASE_URL + `/api/v1/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  try {
    var data = await response.json()
  } catch (error: any) {
    if (error.name === 'SyntaxError') {
      return new NextResponse(`Question ID: "${id}" does not exist!`, { 
        status: 404, 
        headers: { 'Content-Type': 'text/plain' } 
      })
    }
  }
  return NextResponse.json(data)
}
