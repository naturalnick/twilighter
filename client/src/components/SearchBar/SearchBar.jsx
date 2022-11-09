import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

export default function SearchBar({ handleSearch }) {
	const [input, setInput] = useState("");
	return (
		<Card className="bg-primary">
			<Card.Body>
				<h3>Search for your favorite twitter account.</h3>
				<InputGroup>
					<Form.Control
						placeholder="Twitter User"
						aria-label="Twitter User"
						aria-describedby="twitter-user"
						value={input || ""}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						onClick={() => handleSearch(input)}
						variant="secondary"
						size="lg"
					>
						Search
					</Button>
				</InputGroup>
			</Card.Body>
		</Card>
	);
}
