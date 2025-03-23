import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import {useUser} from "./useUser";
import { subscribe } from "diagnostics_channel";
import SubscribeModal from "@/components/SubscribeModal";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const {user, subscription} = useUser();

    const onPlay = (id: string) => {
        if(!user){
            // else non-login and non-subscribe users able to play the music
            return authModal.onOpen();
        }

        // if(!subscription){
        //     return subscribeModal.onOpen();
        // }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
    
};

export default useOnPlay;
