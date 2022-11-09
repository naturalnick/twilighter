import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./Tweet.css";

export default function Tweet({ tweet }) {
	return (
		<Col className="mt-3" lg={6}>
			<Card className="tweet">
				<Card.Img variant="top" src="" />
				<Card.Body>
					<h4 className="tweet--username">Name - Screenname</h4>
					<p className="tweet--time">Time</p>
					<p className="tweet--text">
						Some quick example text to build on the card title and make up
						the bulk of the card's content.
					</p>
				</Card.Body>
				<Card.Body>
					<Card.Link className="tweet--info">Retweets</Card.Link>
					<Card.Link className="tweet--info">Likes</Card.Link>
					<Card.Link className="tweet--info tweet--link" href="#">
						Link To
					</Card.Link>
				</Card.Body>
			</Card>
		</Col>
	);
}
