import Linkify from "react-linkify";
import Card from "react-bootstrap/Card";
import "./Tweet.css";

export default function Tweet({
	name,
	username,
	date,
	text,
	retweet_count,
	like_count,
	image_url,
	profile_image_url,
}) {
	return (
		<Card className="tweet">
			<Card.Img className="card-img" variant="top" src={image_url} />
			<Card.Body>
				<img
					className="user-icon"
					src={
						profile_image_url != null
							? profile_image_url
							: require("../../assets/images/twitter.png")
					}
					alt={username}
				/>
				<h4 className="twitter-account">
					{name} <span className="username">@{username}</span>
				</h4>
				<p className="tweet-date">{date}</p>
				<Linkify>
					<p className="tweet--text">{text}</p>
				</Linkify>
			</Card.Body>
			<Card.Body>
				<Card.Link className="tweet-info">
					<img
						className="info-img"
						src={require("../../assets/images/retweet.png")}
						alt="retweets"
					/>
					{` ${retweet_count}`}
				</Card.Link>
				<Card.Link className="tweet-info">
					<img
						className="info-img"
						src={require("../../assets/images/like.png")}
						alt="likes"
					/>
					{` ${like_count}`}
				</Card.Link>
			</Card.Body>
		</Card>
	);
}
