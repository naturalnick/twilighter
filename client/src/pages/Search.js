import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchBar from "../components/SearchBar/SearchBar";
import Tweet from "../components/Tweet/Tweet";

export default function Search() {
	const [tweets, setTweets] = useState({});

	async function getTweets(queryType, text) {
		try {
			return (
				queryType === "username"
					? await axios.get(
							`http://127.0.0.1:5000/api/user/search?query=${text}`
					  )
					: await axios.get(
							`http://127.0.0.1:5000/api/tweets/search?query=${text}`
					  )
			).data;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	async function handleSearch(queryType, text) {
		setTweets(await getTweets(queryType, text));
	}

	return (
		<>
			<SearchBar handleSearch={handleSearch} />
			<Container>
				<Row>
					{tweets !== undefined ? (
						Object.values(tweets).map((tweet) => (
							<Col className="mt-3" lg={6} key={tweet.id}>
								<Tweet {...tweet} />
							</Col>
						))
					) : (
						<></>
					)}
				</Row>
			</Container>
		</>
	);
}
