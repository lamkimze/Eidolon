import {useEffect, useState} from "react";
import {Song} from "@/types";
import { SupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useMemo } from "react";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined> (undefined);
    const {supabaseClient} = useSessionContext();

    useEffect(() => {
        if(!id){
            return;
        }
        setIsLoading(true);

        const fetchSong = async() => {
            const {data, error} = await supabaseClient
            .from('songs')
            .select('*')
            .eq('id', id)
            .single();

            if(error){
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong(data as Song);
            setIsLoading(false);
        };

        fetchSong();
    }, [id, SupabaseClient]);

    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
};

export default useGetSongById;