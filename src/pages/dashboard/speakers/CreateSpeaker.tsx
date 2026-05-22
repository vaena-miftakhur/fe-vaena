import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

const schema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    role: z.string().min(1, "Role tidak boleh kosong"),
    image: z.string().min(1, "Image tidak boleh kosong"),
});

type FormData = z.infer<typeof schema>;

export default function CreateSpeaker() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        await fetch("https://be-v-production.up.railway.app/speakers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate("/dashboard/speakers");
    };

    return (
        <div className="flex justify-center py-6">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Speaker</h1>
                <p className="text-sm text-gray-500 mb-6">Isi data speaker dengan lengkap</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormInput label="Nama" name="name" register={register} error={errors.name?.message} type="text" placeholder="Nama speaker" />
                    <FormInput label="Role" name="role" register={register} error={errors.role?.message} type="text" placeholder="Contoh: Senior Developer" />
                    <FormInput label="Image URL" name="image" register={register} error={errors.image?.message} type="text" placeholder="https://..." />
                    <Button label="Simpan" variant="primary" type="submit" isLoading={isSubmitting} className="w-full" />
                </form>
            </div>
        </div>
    );
}
