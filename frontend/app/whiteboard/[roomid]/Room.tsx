"use client";

import { useParams, useSearchParams } from "next/navigation";

import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/Loading";
import { RoomProvider } from "@/liveblocks.config";

export function Room(
  { children }: { children: React.ReactNode }
) {
  const params = useParams();
  const roomid: any = params.roomid;
  console.log(roomid);

  return (
    <RoomProvider
      id={roomid}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
