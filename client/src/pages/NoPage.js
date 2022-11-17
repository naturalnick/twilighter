export default function NoPage() {
	return (
		<div className="d-flex align-items-center justify-content-center vh-100">
			<img
				src={require("../assets/images/caution.png")}
				alt="404"
				width="80px"
				heigth="80px"
			/>
			<h1 className="fw-bold">Page Not Found</h1>
		</div>
	);
}
