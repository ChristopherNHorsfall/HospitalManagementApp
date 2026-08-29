import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import WardsPage from "./pages/WardsPage";
import WardPatientsPage from "./pages/WardPatientsPage";

import "./App.css";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/wards"
                    element={
                        <ProtectedRoute>
                            <WardsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/wards/:wardId"
                    element={
                        <ProtectedRoute>
                            <WardPatientsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
