import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "../components/Tweet/Tweet";
import RandomBar from "../components/RandomBar/RandomBar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";

export default function Random({ isLoading }) {
	const [randomTweet, setRandomTweet] = useState({});

	async function getTweet() {
		try {
			return (await axios.get(`http://127.0.0.1:5000/api/tweets/random`))
				.data;
		} catch (error) {
			if (error.response.status === 404) {
				console.log(error.response.status);
				return undefined;
			}
			return undefined;
		}
	}

	async function handleClick() {
		setRandomTweet(await getTweet());
	}

	return (
		<Container>
			<Row>
				<Col xl={12}>
					<RandomBar handleClick={handleClick} />
				</Col>
			</Row>
			<Row>
				{Object.keys(randomTweet).length !== 0 ? (
					<Col className="mt-3" xl={12}>
						<Tweet {...randomTweet} />
					</Col>
				) : (
					<></>
				)}
			</Row>
		</Container>
	);
}
