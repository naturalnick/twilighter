import { useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Button from "react-bootstrap/esm/Button";
import Tweet from "../../components/Tweet/Tweet";
import "./RandomBar.css";

export default function RandomBar() {
	const [randomTweet, setRandomTweet] = useState({});

	async function getTweet() {
		try {
			return (await axios.get(`http://127.0.0.1:5000/api/tweets/random`))
				.data;
		} catch (error) {
			if (error.response.status === 404) {
				console.warn(error.response.status);
				return undefined;
			}
			return undefined;
		}
	}

	async function handleClick() {
		setRandomTweet(await getTweet());
	}
	return (
		<Card style={{ minWidth: "30rem" }}>
			<Card.Header>
				<div className="d-grid">
					<Button
						className="random-btn"
						onClick={handleClick}
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
