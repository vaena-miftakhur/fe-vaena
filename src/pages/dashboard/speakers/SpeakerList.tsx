import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Speaker {
    id: number;
    name: string;
    role: string;
    image: string;
    createdAt: string;
}

export default function SpeakerList() {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSpeakers = async () => {
        try {
            const res = await fetch("http://localhost:3000/speakers");
            const data = await res.json();
            setSpeakers(data);
        } catch (err) {
            console.error("Gagal fetch speakers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin hapus speaker ini?")) return;
        await fetch(`http://localhost:3000/speakers/${id}`, { method: "DELETE" });
        fetchSpeakers();
    };

    useEffect(() => {
        fetchSpeakers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">List Speaker</h1>
                <Link
                    to="/dashboard/speakers/create"
                    className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
                >
                    + Tambah Speaker
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4 text-gray-600">No</th>
                            <th className="text-left p-4 text-gray-600">Foto</th>
                            <th className="text-left p-4 text-gray-600">Nama</th>
                            <th className="text-left p-4 text-gray-600">Role</th>
                            <th className="text-left p-4 text-gray-600">Dibuat</th>
                            <th className="text-left p-4 text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center p-8 text-gray-400">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : speakers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center p-8 text-gray-400">
                                    Belum ada data
                                </td>
                            </tr>
                        ) : (
                            speakers.map((speaker, index) => (
                                <tr key={speaker.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 text-gray-600">{index + 1}</td>
                                    <td className="p-4">
                                        {speaker.image ? (
                                            <img
                                                src={speaker.image}
                                                alt={speaker.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                                                {speaker.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{speaker.name}</td>
                                    <td className="p-4">
                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                            {speaker.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        {new Date(speaker.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/dashboard/speakers/edit/${speaker.id}`}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(speaker.id)}
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