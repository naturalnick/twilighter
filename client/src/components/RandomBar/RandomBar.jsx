import { useState } from "react";
import axios from "axios";

import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

import Tweet from "../../components/Tweet/Tweet";
import "./RandomBar.css";

export default function RandomBar() {
	const [randomTweet, setRandomTweet] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function getTweet() {
		try {
			return (await axios.get(`/api/tweets/random`)).data;
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

	function displayRandomTweet() {
		Object.keys(randomTweet).length !== 0 ? (
			<Col className="mt-3" xl={12}>
				<Tweet {...randomTweet} />
			</Col>
		) : (
			<div className="placeholder">
				<img
					alt="random"
					src={require("../../assets/images/shuffle.png")}
					width="100"
					height="100"
				/>
			</div>
		);
	}

	return (
		<Card className="random-bar">
			<Card.Header className="text-center">
				<Button
					onClick={handleClick}
					disabled={isLoading}
					variant="primary"
					size="lg"
				>
					Get Random Tweet
				</Button>
			</Card.Header>
			<Card.Body>{displayRandomTweet()}</Card.Body>
		</Card>
	);
}
