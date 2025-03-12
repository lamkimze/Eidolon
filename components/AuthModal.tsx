"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient(); // Get the Supabase client instance
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    },[session, router, onClose]);

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen} // Set the modal to always be open (adjust logic as needed)
            onChange={onChange} // Provide a handler for when the modal state changes
        >
            <Auth
                theme="dark"
                magicLink={true}
                providers={["github"]}
                supabaseClient={supabaseClient} // Pass the client instance
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }}
            />
        </Modal>
    );
};

export default AuthModal;
