import { useEffect, useState } from "react";

export default function DashboardIndex() {
    const [totalCategory, setTotalCategory] = useState(0);
    const [totalSpeaker, setTotalSpeaker] = useState(0);
    const [totalEvent, setTotalEvent] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        Promise.all([
            fetch("http://localhost:3000/categories", { headers }).then(r => r.json()),
            fetch("http://localhost:3000/speakers", { headers }).then(r => r.json()),
            fetch("http://localhost:3000/events", { headers }).then(r => r.json()),
        ])
        .then(([categories, speakers, events]) => {
            console.log("categories:", categories);
            console.log("speakers:", speakers);
            console.log("events:", events);

            setTotalCategory(Array.isArray(categories) ? categories.length : categories.data?.length ?? 0);
            setTotalSpeaker(Array.isArray(speakers) ? speakers.length : speakers.data?.length ?? 0);
            setTotalEvent(Array.isArray(events) ? events.length : events.data?.length ?? 0);
        })
        .catch(err => console.error("Fetch error:", err))
        .finally(() => setLoading(false));
    }, []);

    const cards = [
        { label: "Total Category", value: totalCategory },
        { label: "Total Speaker", value: totalSpeaker },
        { label: "Total Event", value: totalEvent },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Selamat datang di Event Management System</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-900">
                        <p className="text-sm text-gray-500">{card.label}</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-1">
                            {loading ? "..." : card.value}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Informasi</h2>
                <p className="text-gray-500 text-sm">Gunakan menu di sidebar untuk mengelola data kategori, speaker, dan event.</p>
            </div>
        </div>
    );
}