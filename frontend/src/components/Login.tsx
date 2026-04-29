'use client';
import { actionLogin, actionRegister } from "@/data/actions/authActions";
import { UserRequest } from "@/types/user";
import { faArrowRightToBracket, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type MyChangeEvent = React.ChangeEvent<HTMLInputElement>;
type MySubmitEvent = React.SubmitEvent<HTMLFormElement>;

const Login = () => {
    const [register, setRegister] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserRequest>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: MyChangeEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: MySubmitEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const result = register
            ? await actionRegister(formData)
            : await actionLogin(formData.username, formData.password);
        if (result?.success === false) {
            setError(result.error || 'Ocurrió un error');
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-5 justify-center font-bold">
                <p className="text-center text-2xl">
                    {register
                        ? <span>Registrarse <FontAwesomeIcon icon={faKeyboard} size="xl" /></span>
                        : <span>Inicio de Sesión <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" /></span>
                    }
                </p>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">Usuario</label>
                    <input
                        name="username"
                        required
                        maxLength={15}
                        minLength={3}
                        type="text"
                        onChange={handleChange}
                        placeholder="abc_123"
                        className="w-full bg-gray-400 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">Contraseña</label>
                    <input
                        name="password"
                        required
                        maxLength={20}
                        minLength={6}
                        type="password"
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full bg-gray-400 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all"
                    />
                </div>
                <div className="mt-2 flex flex-col items-center gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-gray-600 w-30 py-1 px-2 mt-2 mb-3 font-bold text-white hover:bg-gray-800 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : register ? 'Crear Cuenta' : 'Ingresar'}
                    </button>
                    <span
                        className="text-sm hover:text-white cursor-pointer"
                        onClick={() => { setRegister(!register); setError(null); }}
                    >
                        {register ? 'Ya tengo cuenta' : 'Registrarse'}
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;