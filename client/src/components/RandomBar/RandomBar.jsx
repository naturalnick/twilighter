import { useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Button from "react-bootstrap/esm/Button";
import Tweet from "../../components/Tweet/Tweet";
import { SERVER_URL } from "../../settings";

export default function RandomBar() {
	const [randomTweet, setRandomTweet] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function getTweet() {
		try {
			return (await axios.get(`${SERVER_URL}/api/tweets/random`)).data;
		} catch (error) {
			console.warn(error.response.status);
			return undefined;
		}
	}

	async function handleClick() {
		setIsLoading(true);
		setRandomTweet(await getTweet());
		setIsLoading(false);
	}
	return (
		<Card style={{ minWidth: "30rem" }}>
			<Card.Header>
				<div className="d-grid">
					<Button
						className="random-btn"
						onClick={handleClick}
						disabled={isLoading}
						variant="primary"
						size="lg"
					>
						Get Random Tweet
					</Button>
				</div>
			</Card.Header>
			<Card.Body>
				{Object.keys(randomTweet).length !== 0 ? (
					<Col className="mt-3" xl={12}>
						<Tweet {...randomTweet} />
					</Col>
				) : (
					<>
						<Placeholder xs={6} />
						<Placeholder className="w-75" />{" "}
						<Placeholder style={{ width: "25%" }} />
					</>
				)}
			</Card.Body>
		</Card>
	);
}
