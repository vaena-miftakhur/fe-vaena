export default function Biodata() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Biodata Mahasiswa</h1>

            <div className="bg-white rounded-2xl shadow-md p-8 max-w-md">
                <div className="flex flex-col gap-4">
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                        <p className="font-semibold text-gray-800 mt-1">Vaena Miftakhur Risko</p>
                    </div>
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-500">NIM</p>
                        <p className="font-semibold text-gray-800 mt-1">24090100</p>
                    </div>
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-500">Kelas</p>
                        <p className="font-semibold text-gray-800 mt-1">4D</p>
                    </div>
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-500">Program Studi</p>
                        <p className="font-semibold text-gray-800 mt-1">Teknik Informatika</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Mata Kuliah</p>
                        <p className="font-semibold text-gray-800 mt-1">Pemrograman Web 2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}