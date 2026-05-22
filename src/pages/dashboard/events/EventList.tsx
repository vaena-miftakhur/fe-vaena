import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

interface Speaker {
    id: number;
    name: string;
}

interface Event {
    id: number;
    name: string;
    categoryId: number;
    location: string;
    dateEvent: string;
    description: string;
    createdAt: string;
    speakerId: number; 
}

export default function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [eventsRes, categoriesRes,speakersRes] = await Promise.all([
                fetch("https://be-v-production.up.railway.app/events"),
                fetch("https://be-v-production.up.railway.app/categories"),
                fetch("https://be-v-production.up.railway.app/speakers"),
            ]);
            const eventsData = await eventsRes.json();
            const categoriesData = await categoriesRes.json();
            const speakersData = await speakersRes.json();
            setEvents(eventsData);
            setCategories(categoriesData);
            setSpeakers(speakersData);
        } catch (err) {
            console.error("Gagal fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryName = (categoryId: number) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : `ID: ${categoryId}`;
    };

    const getSpeakerName = (speakerId: number) => {
        const speaker = speakers.find(s => s.id === speakerId);
        return speaker ? speaker.name : "-";
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin hapus event ini?")) return;
        await fetch(`https://be-v-production.up.railway.app/events/${id}`, { method: "DELETE" });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">List Event</h1>
                <Link
                    to="/dashboard/events/create"
                    className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
                >
                    + Tambah Event
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4 text-gray-600">No</th>
                            <th className="text-left p-4 text-gray-600">Nama Event</th>
                            <th className="text-left p-4 text-gray-600">Pembicara</th>
                            <th className="text-left p-4 text-gray-600">Kategori</th>
                            <th className="text-left p-4 text-gray-600">Lokasi</th>
                            <th className="text-left p-4 text-gray-600">Tanggal</th>
                            <th className="text-left p-4 text-gray-600">Deskripsi</th>
                            <th className="text-left p-4 text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center p-8 text-gray-400">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : events.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center p-8 text-gray-400">
                                    Belum ada data
                                </td>
                            </tr>
                        ) : (
                            events.map((event, index) => (
                                <tr key={event.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 text-gray-600">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-800">{event.name}</td>
                                    <td className="p-4 text-gray-600">{getSpeakerName(event.speakerId)}</td>
                                    <td className="p-4">
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                            {getCategoryName(event.categoryId)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{event.location}</td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(event.dateEvent).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="p-4 text-gray-600 max-w-xs truncate">{event.description}</td>
        
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/dashboard/events/edit/${event.id}`}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
