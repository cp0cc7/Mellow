"use client";

import {
  addLikeToThread,
  retrieveThreadLikes,
} from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { boolean } from "zod";

const LikeThread = ({
  //re-add await after fixing try-catch statement to include default state.
  likes,
  threadId,
  currentUserId,
}: {
  likes: Array<any>;
  threadId: string;
  currentUserId: string;
}) => {
  const pathname = usePathname();
  try {
    var currentUserLiked = false;
    if (likes.length > 0) {
      currentUserLiked = likes.includes(currentUserId); //when likes unitialised, it doesn't like this, but need to fix the try/catch so that if it fails, the likes thing is still returned as blank.
      console.warn("Contents of likes: " + likes);
    }

    return (
      <>
        {
          <Image
            id={"LikeHeartImage"}
            onClick={async () => {
              await addLikeToThread(threadId, currentUserId, pathname);
              if (!currentUserLiked) {
                document
                  .getElementById("LikeHeartImage")
                  ?.setAttribute("src", "/assets/heart-filled.svg");
              } else {
                document
                  .getElementById("LikeHeartImage")
                  ?.setAttribute("src", "/assets/heart-gray.svg");
              }
            }}
            src={
              currentUserLiked
                ? "/assets/heart-filled.svg"
                : "/assets/heart-gray.svg"
            }
            alt="heartfromdelegate"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        }
        <p className="mt-1 ml-35 text-subtle-medium text-gray-1">
          {likes?.length || 0}
        </p>
      </>
    );
  } catch (exception) {
    console.error("Could not retrieve likes.");
    //console.error(exception);
    return (
      <>
        {
          <Image
            id={"LikeHeartImage"}
            src={"/assets/heart-gray.svg"}
            alt="heartfromdelegate"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        }
        <p className="mt-1 ml-35 text-subtle-medium text-gray-1">{"-"}</p>
      </>
    );
  }
};

export default LikeThread;