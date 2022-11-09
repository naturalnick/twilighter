import Card from "react-bootstrap/Card";
import "./Tweet.css";

export default function Tweet({ name, username, date, text, retweets, likes }) {
	return (
		<Card className="tweet">
			<Card.Img variant="top" src="" />
			<Card.Body>
				<h4 className="tweet--username">{name}</h4>
				<p className="tweet--date">{date}</p>
				<p className="tweet--text">{text}</p>
			</Card.Body>
			<Card.Body>
				<Card.Link className="tweet--info">{retweets} Retweets</Card.Link>
				<Card.Link className="tweet--info">{likes} Likes</Card.Link>
			</Card.Body>
		</Card>
	);
}
