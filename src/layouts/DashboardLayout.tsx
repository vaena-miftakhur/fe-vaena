import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { HomeIcon, TagIcon, UserIcon, CalendarIcon, UserCircle2 } from "lucide-react";

export default function DashboardLayout() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} /> },
        { to: "/dashboard/category", label: "Categories", icon: <TagIcon size={18} /> },
        { to: "/dashboard/speakers", label: "Speakers", icon: <UserIcon size={18} /> },
        { to: "/dashboard/events", label: "Events", icon: <CalendarIcon size={18} /> },
        { to: "/dashboard/biodata", label: "Biodata", icon: <UserCircle2 size={18} /> },
    ];

    return (
        <div className="flex min-h-screen">
            <div className="h-screen sticky top-0 bg-purple-900 w-64 flex flex-col justify-between p-4">
                <div>
                    <div className="border-b border-purple-700 py-6 mb-4">
                        <h1 className="text-white text-xl font-bold">Event Management</h1>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`p-3 rounded-lg text-white text-sm flex items-center gap-3 transition duration-150 ${
                                        isActive ? "bg-purple-700 font-semibold" : "hover:bg-purple-800"
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="border border-white text-white p-3 w-full hover:bg-white hover:text-purple-900 cursor-pointer rounded-lg font-medium transition duration-150"
                >
                    Logout
                </button>
            </div>

            <div className="flex-1 p-8 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}