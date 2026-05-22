import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin hapus category ini?")) return;
        await fetch(`http://localhost:3000/categories/${id}`, { method: "DELETE" });
        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">List Category</h1>
                <Link to="/dashboard/category/create" className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800">
                    + Tambah Category
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4 text-gray-600">No</th>
                            <th className="text-left p-4 text-gray-600">Nama</th>
                            <th className="text-left p-4 text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr><td colSpan={3} className="text-center p-8 text-gray-400">Belum ada data</td></tr>
                        ) : (
                            categories.map((cat, index) => (
                                <tr key={cat.id} className="border-t">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{cat.name}</td>
                                    <td className="p-4 flex gap-2">
                                        <Link to={`/dashboard/category/edit/${cat.id}`} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</Link>
                                        <button onClick={() => handleDelete(cat.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
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