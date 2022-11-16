import Container from "react-bootstrap/Container";
import Hero from "../components/Hero/Hero";
import "./Page.css";

export default function Home() {
	return (
		<Container className="page-container">
			<Hero />
		</Container>
	);
}
