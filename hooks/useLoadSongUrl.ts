import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song: Song) => {
    const supabaseClient = useSupabaseClient();
    // modify items that only authenticated people can see that should use this (proper way since we only call supabase client once)
    // this is because suoabaseClient need authentication in itself
    // const {supabaseClient} = useSessionContext();

    if(!song){
        return '';
    }

    const {data: songData} = supabaseClient
    .storage
    .from('songs')
    .getPublicUrl(song.song_path);

    return songData.publicUrl;
};

export default useLoadSong;