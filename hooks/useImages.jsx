import { useState, useEffect } from "react"

export default function useImages() {
	const [images, setImages] = useState([])

	function translateX() {
		const firstItem = images.shift()
		setImages((prev) => [...prev, firstItem])
	}

	function translateY() {
		const lastItem = images.pop()
		setImages((prev) => [lastItem, ...prev])
	}

	useEffect(() => {
		fetch(
			"https://api.unsplash.com/photos/?client_id=YCcPaSINrQN004SJUah1blA-gFoG1xDZJgeu-fPIPwA"
		)
			.then((res) => res.json())
			.then((data) => {
				data.forEach((obj) => {
					setImages((prev) => [...prev, obj.urls.full])
				})
			})
	}, [])

	return {images, translateX, translateY}
}
