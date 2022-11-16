import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import "./Footer.css";

export default function Footer() {
	return (
		<Container>
			<Card className="footer mt-4 mb-4">
				<Card.Body>
					<Card.Text className="justify-cont">
						Developed and designed by{" "}
						<a href="http://www.nschaefer.com/">Nick Schaefer</a> and
						completely{" "}
						<a href="https://github.com/naturalnick/twilighter">
							open source
						</a>
						.
					</Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
}
