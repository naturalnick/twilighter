import Container from "react-bootstrap/Container";
import RandomBar from "../components/RandomBar/RandomBar";
import "./Page.css";

export default function Random({ isLoading }) {
	return (
		<Container>
			<RandomBar />
		</Container>
	);
}
