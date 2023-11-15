import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8084'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || 1
  const limit = searchParams.get('limit') || 10

  const response = await fetch(BASE_URL + `/api/v1/questions?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest, body: any) {
  console.log("IN POST")
 
  // const body = await request.json()
  console.log("in post:", body)
  const response = await fetch(BASE_URL + `/api/v1/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, url: string) {
  console.log("IN DELETE");
  console.log("req is", request.json)

  const response = await fetch(BASE_URL + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.status === 204) {
    // A 204 status code typically indicates a successful deletion.
    return new NextResponse("", { status: 204 });
  }

  // Handle other status codes or errors as needed.
  const data = await response.json();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, url: string, body: any) {
  console.log("IN PUT");
  const response = await fetch(BASE_URL + url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return NextResponse.json(data);
}