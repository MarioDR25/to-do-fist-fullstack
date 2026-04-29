'use client';
import { actionLogout } from "@/data/actions/authActions";

const LogoutButton = () => {
    return (
        <button
            onClick={() => actionLogout()}
            className="text-xs text-stone-400 hover:text-white transition-all cursor-pointer"
        >
            Cerrar sesión
        </button>
    );
}

export default LogoutButton;