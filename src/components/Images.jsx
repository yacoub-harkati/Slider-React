export default function Images({url}) {
	return (
		<img
			className="img"
			src={`${url}&fit=crop&w=500&h=500`}
			alt="banner img"
		/>
	)
}
