import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
	return (
		<div className="App">
			<NavBar />
			<div className="page">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
