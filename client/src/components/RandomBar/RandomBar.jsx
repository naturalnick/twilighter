import Button from "react-bootstrap/Button";
import "./RandomBar.css";
import Container from "react-bootstrap/esm/Container";

export default function RandomBar({ handleClick }) {
	return (
		<Container>
			<Button onClick={handleClick} variant="primary" size="lg">
				Get Random Tweet
			</Button>
		</Container>
	);
}
