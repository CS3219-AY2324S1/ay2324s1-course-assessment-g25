import { useOthers, useSelf } from "@/liveblocks.config";

import Image from "next/image";
import styles from "./Avatars.module.css";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} width={64} height={64}/>
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
            width={64}
            height={64}
          />
        </div>
      )}
    </div>
  );
}

type AvatarProps = {
  picture: string;
  name: string;
  width?: number;
  height?: number;
}

export function Avatar({ picture, name, width=64, height=64}: AvatarProps) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <Image
        src={picture}
        alt={name}
        className={styles.avatar_picture}
        data-tooltip={name}
        width={width}
        height={height}
      />
    </div>
  );
}
