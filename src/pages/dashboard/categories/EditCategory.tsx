import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

const schema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
});

type FormData = z.infer<typeof schema>;

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fetch(`https://be-v-production.up.railway.app/categories${id}`)
            .then(res => res.json())
            .then(data => setValue("name", data.name));
    }, [id]);

    const onSubmit = async (data: FormData) => {
        await fetch(`https://be-v-production.up.railway.app/categories${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate("/dashboard/category");
    };

    return (
        <div className="flex justify-center py-6">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Edit Category</h1>
                <p className="text-sm text-gray-500 mb-6">Ubah data kategori</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormInput label="Nama" name="name" register={register} error={errors.name?.message} type="text" />
                    <Button label="Simpan" variant="primary" type="submit" isLoading={isSubmitting} className="w-full" />
                </form>
            </div>
        </div>
    );
}
