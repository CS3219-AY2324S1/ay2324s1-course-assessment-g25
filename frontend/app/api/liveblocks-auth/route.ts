import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/authOptions";

const LIVEBLOCKS_SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {

  const sess: any = await getServerSession(authOptions);
  console.log(sess?.user?.email)
  const session = liveblocks.prepareSession(`user-${sess?.user?.email}`, {
    userInfo: {
      name: sess?.user?.name,
      color: getRandomHexColor(),
      picture: sess?.user?.image,
      width: 64,
      height: 64
    }
  });
  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}

function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const USER_INFO = [
  {
    name: "Charlie Layne",
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
    width: 64,
    height: 64,
  },
  {
    name: "Mislav Abha",
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
    width: 64,
    height: 64,
  },
  {
    name: "Tatum Paolo",
    color: "#F0D885",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
    width: 64,
    height: 64,
  },
  {
    name: "Anjali Wanda",
    color: "#85EED6",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
    width: 64,
    height: 64,
  },
  {
    name: "Jody Hekla",
    color: "#85BBF0",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
    width: 64,
    height: 64,
  },
  {
    name: "Emil Joyce",
    color: "#8594F0",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
    width: 64,
    height: 64,
  },
  {
    name: "Jory Quispe",
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
    width: 64,
    height: 64,
  },
  {
    name: "Quinn Elton",
    color: "#87EE85",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
    width: 64,
    height: 64,
  },
];
