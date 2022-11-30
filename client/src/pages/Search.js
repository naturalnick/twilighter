import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import SearchBar from "../components/SearchBar/SearchBar";
import Tweet from "../components/Tweet/Tweet";
import { SERVER_URL } from "../settings";

export default function Search() {
	const [tweets, setTweets] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function getTweets(queryType, text) {
		setIsLoading(true);
		try {
			const response = (
				queryType === "username"
					? await axios.get(`${SERVER_URL}/api/user/search?query=${text}`)
					: await axios.get(
							`${SERVER_URL}/api/tweets/search?query=${text}`
					  )
			).data;
			setTweets(response);
		} catch (error) {
			console.log(error === "404" ? "Query not found" : error);
			setTweets({});
		}
		setIsLoading(false);
	}

	function displayTweets() {
		return tweets !== undefined ? (
			Object.values(tweets).map((tweet) => (
				<Col className="mt-3" lg={6} key={tweet.id}>
					<Tweet {...tweet} />
				</Col>
			))
		) : (
			<Alert className="w-auto m-auto mt-4" variant="warning">
				No results.
			</Alert>
		);
	}

	return (
		<Container fluid="xs">
			<Row>
				<Col>
					<SearchBar getTweets={getTweets} isLoading={isLoading} />
				</Col>
			</Row>
			<Row>{displayTweets()}</Row>
		</Container>
	);
}
