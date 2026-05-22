import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

const schema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    categoryId: z.string().min(1, "Category wajib dipilih"),
    speakerId: z.string().min(1, "Pembicara wajib dipilih"), 
    location: z.string().min(1, "Lokasi tidak boleh kosong"),
    dateEvent: z.string().min(1, "Tanggal tidak boleh kosong"),
    description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});

type FormData = z.infer<typeof schema>;

interface Category {
    id: number;
    name: string;
}

interface Speaker {
    id: number;
    name: string;
}

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        Promise.all([
            fetch("https://be-v-production.up.railway.app/categories").then(r => r.json()),
            fetch("https://be-v-production.up.railway.app/speakers").then(r => r.json()),
            fetch(`https://be-v-production.up.railway.app/events/${id}`).then(r => r.json()),
        ]).then(([catData, spkData, eventData]) => {
            setCategories(catData);
            setSpeakers(spkData);
            setValue("name", eventData.name);
            setValue("categoryId", String(eventData.categoryId));
            setValue("speakerId", String(eventData.speakerId));
            setValue("location", eventData.location);
            setValue("dateEvent", eventData.dateEvent.split("T")[0]);
            setValue("description", eventData.description);
        });
    }, [id]);

    const onSubmit = async (data: FormData) => {
        await fetch(`https://be-v-production.up.railway.app/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        navigate("/dashboard/events");
    };

    return (
        <div className="py-6">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Edit Event</h1>
                <p className="text-sm text-gray-500 mb-6">Ubah data event</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormInput label="Nama" name="name" register={register} error={errors.name?.message} type="text" />

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

                    <div className="flex flex-col gap-2 mb-3">
                        <label className="font-medium">Pembicara</label>
                        <select {...register("speakerId")} className="p-2 border border-black rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400">
                            <option value="">Pilih Pembicara</option>
                            {speakers.map(spk => (
                                <option key={spk.id} value={spk.id}>{spk.name}</option>
                            ))}
                        </select>
                        {errors.speakerId && <p className="text-red-500 text-sm">{errors.speakerId.message}</p>}
                    </div>

                    <FormInput label="Lokasi" name="location" register={register} error={errors.location?.message} type="text" />
                    <FormInput label="Tanggal" name="dateEvent" register={register} error={errors.dateEvent?.message} type="date" />
                    <FormInput label="Deskripsi" name="description" register={register} error={errors.description?.message} type="text" />
                    <Button label="Simpan Event" variant="primary" type="submit" isLoading={isSubmitting} className="w-full" />
                </form>
            </div>
        </div>
    );
}
