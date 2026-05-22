import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

const schema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    categoryId: z.string().min(1, "Category wajib dipilih"),
    location: z.string().min(1, "Lokasi tidak boleh kosong"),
    dateEvent: z.string().min(1, "Tanggal tidak boleh kosong"),
    description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});

type FormData = z.infer<typeof schema>;

interface Category {
    id: number;
    name: string;
}

export default function CreateEvent() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fetch("https://be-v-production.up.railway.app/events")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    const onSubmit = async (data: FormData) => {
        await fetch("https://be-v-production.up.railway.app/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate("/dashboard/events");
    };

    return (
        <div className="py-6">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Event</h1>
                <p className="text-sm text-gray-500 mb-6">Isi data event dengan lengkap</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormInput label="Nama" name="name" register={register} error={errors.name?.message} type="text" placeholder="Nama event" />

                    <div className="flex flex-col gap-2 mb-3">
                        <label className="font-medium">Category</label>
                        <select {...register("categoryId")} className="p-2 border border-black rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400">
                            <option value="">Pilih Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
                    </div>

                    <FormInput label="Lokasi" name="location" register={register} error={errors.location?.message} type="text" placeholder="Lokasi event" />
                    <FormInput label="Tanggal" name="dateEvent" register={register} error={errors.dateEvent?.message} type="date" />
                    <FormInput label="Deskripsi" name="description" register={register} error={errors.description?.message} type="text" placeholder="Deskripsi event" />
                    <Button label="Simpan Event" variant="primary" type="submit" isLoading={isSubmitting} className="w-full" />
                </form>
            </div>
        </div>
    );
}
