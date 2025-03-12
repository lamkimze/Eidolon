"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId) {
        return null;
    }


    return (
        <div
        className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4"
        >
            <PlayerContent
            // ensure the player component practically destroyed before loading the next song
            // the hook that we used to play the song does not support dynamic and modular url changes
            // this will help to reset the entire hook used
            key={songUrl}
            song={song}
            songUrl={songUrl}
            />
            Player!
        </div>
    )
}

export default Player;