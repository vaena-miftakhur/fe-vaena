import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "../components/ui/InputText"
import { PasswordInput } from "../components/ui/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";



const schema = z.object({
    nim: z.string()
        .min(8, "NIM minimal 8 digit")
        .max(10, "NIM maksimal 10 digit")
        .regex(/^\d+$/, "NIM harus berupa angka"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});
type LoginForm = {
    nim: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (data: LoginForm) => {
        if(data.nim == "24090100" && data.password == "24090100") {
            //login sukses
            alert("login sukses");
            
            login(data.nim);

            navigate("/dashboard");
        } else {
            //login gagal
            alert("login gagal");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-1">Login</h1>
                <hr className="mb-6 border-gray-200" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <InputText
                        label="NIM"
                        name="nim"
                        type="text"
                        register={register}
                        error={errors.nim?.message}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        register={register}
                        error={errors.password?.message}
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg mt-2"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-blue-500">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}