import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Container from "react-bootstrap/esm/Container";

export default function App() {
	return (
		<div className="App">
			<NavBar />
			<Container className="page">
				<Outlet />
			</Container>
			<Footer />
		</div>
	);
}
