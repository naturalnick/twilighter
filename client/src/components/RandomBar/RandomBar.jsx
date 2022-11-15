import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./RandomBar.css";

export default function RandomBar({ handleClick }) {
	return (
		<Card className="random-card">
			<Card.Body>
				<div className="d-grid">
					<Button onClick={handleClick} variant="primary" size="lg">
						Get Random Tweet
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
