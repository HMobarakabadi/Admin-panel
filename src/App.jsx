import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/admin" element={<Navigate to="/dashboard" replace />} />
				<Route path="/admin-panel" element={<Navigate to="/dashboard" replace />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
