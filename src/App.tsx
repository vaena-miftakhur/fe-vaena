import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import Biodata from "./pages/dashboard/Biodata";
import CategoryList from "./pages/dashboard/categories/CategoryList";
import CreateCategory from "./pages/dashboard/categories/CreateCategory";
import EditCategory from "./pages/dashboard/categories/EditCategory";
import SpeakerList from "./pages/dashboard/speakers/SpeakerList";
import CreateSpeaker from "./pages/dashboard/speakers/CreateSpeaker";
import EditSpeaker from "./pages/dashboard/speakers/EditSpeaker";
import EventList from "./pages/dashboard/events/EventList";
import CreateEvent from "./pages/dashboard/events/CreateEvent";
import EditEvent from "./pages/dashboard/events/EditEvent";
import { Navigate } from "react-router-dom";    

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/dashboard" element={<DashboardIndex />} />
                        <Route path="/dashboard/biodata" element={<Biodata />} />

                        <Route path="/dashboard/category" element={<CategoryList />} />
                        <Route path="/dashboard/category/create" element={<CreateCategory />} />
                        <Route path="/dashboard/category/edit/:id" element={<EditCategory />} />

                        <Route path="/dashboard/speakers" element={<SpeakerList />} />
                        <Route path="/dashboard/speakers/create" element={<CreateSpeaker />} />
                        <Route path="/dashboard/speakers/edit/:id" element={<EditSpeaker />} />

                        <Route path="/dashboard/events" element={<EventList />} />
                        <Route path="/dashboard/events/create" element={<CreateEvent />} />
                        <Route path="/dashboard/events/edit/:id" element={<EditEvent />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;