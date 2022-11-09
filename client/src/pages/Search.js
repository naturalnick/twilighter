import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchBar from "../components/SearchBar/SearchBar";
import Tweet from "../components/Tweet/Tweet";

export default function Search() {
	const data = {
		created_at: "Thu Apr 06 15:24:15 +0000 2017",
		id_str: "850006245121695744",
		text: "1/ Today we\u2019re sharing our vision for the future of the Twitter API platform!\nhttps://t.co/XweGngmxlP",
		user: {
			id: 2244994945,
			name: "Twitter Dev",
			screen_name: "TwitterDev",
			url: "https://dev.twitter.com/",
		},
		entities: {
			urls: [
				{
					url: "https://t.co/XweGngmxlP",
					unwound: {
						url: "https://cards.twitter.com/cards/18ce53wgo4h/3xo1c",
						title: "Building the Future of the Twitter API Platform",
					},
				},
			],
			user_mentions: [],
		},
	};

	const [tweets, setTweets] = useState({
		2244994945: {
			id: 2244994945,
			name: "Nick",
			username: "nickschaefer",
			date: "Nov 9, 2022",
			text: "This is a tweet, testing 123",
			retweets: 30,
			likes: 4,
		},
		2244994946: {
			id: 2244994946,
			name: "Bruschi",
			username: "nickschaefer",
			date: "Nov 9, 2022",
			text: "This is a tweet, testing 123",
			retweets: 30,
			likes: 4,
		},
	});

	async function getTweets(text) {
		//temporary data
		setTweets((prevTweets) => {
			const id = data.id_str;
			return {
				[id]: {
					[id]: id,
					name: data.user.name,
					username: data.user.screen_name,
					date: data.created_at,
					text: data.text,
					retweets: 0,
					likes: 0,
				},
			};
		});
	}
	function handleSearch(text) {
		getTweets(text);
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
