import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Images from "./components/Images"
import useImages from "../hooks/useImages"
import { useState, useRef } from "react"
import { nanoid } from "nanoid"
import "./global.scss"
import { Scale } from "@mui/icons-material"

function Radio({ index, slideNum, handleclick}) {
	let selected = index + 1 == slideNum ? true : false
	return (
		<div
			key={nanoid()}
			className={`circle ${selected && "selected"}`}
      onClick={handleclick}
		></div>
	)
}

function App() {
	const { images: imagesArr } = useImages()
	const imgContainer = useRef()
	const circlesRef = useRef()
	let [slideNum, setSlideNum] = useState(1)

	function resetSlide(parm) {
		switch (parm) {
			case "last":
				// prettier-ignore
				imgContainer.current.style.transform = `translateX(-${(imagesArr.length - 1) * 100}%)`
				setSlideNum(imagesArr.length)
				break
			case "first":
				// prettier-ignore
				imgContainer.current.style.transform = `translateX(0%)`
				setSlideNum(1)
				break
		}
	}

	function translateRight() {
		if (slideNum < imagesArr.length) {
			// prettier-ignore
			imgContainer.current.style.transform = `translateX(-${slideNum * 100}%)`
			setSlideNum((prev) => prev + 1)
		} else {
			resetSlide("first")
		}
	}

	function translateLeft() {
		if (slideNum > 1) {
			// prettier-ignore
			imgContainer.current.style.transform = `translateX(-${(slideNum - 2) * 100}%)`
			setSlideNum((prev) => prev - 1)
		} else {
			resetSlide("last")
		}
	}

	function selectButton(index) {
		setSlideNum(index + 1)
		imgContainer.current.style.transform = `translateX(-${index * 100}%)`
	}

	return (
		<div className="slider">
			<div className="app">
				<div className="image-slide">
					<div className="img-container" ref={imgContainer}>
						{imagesArr.map((imglink) => {
							return (
								<Images
									key={nanoid().toString()}
									url={imglink}
								/>
							)
						})}
					</div>
				</div>
				<div className="btns">
					<KeyboardArrowLeftIcon
						className="arrows"
						onClick={translateLeft}
					/>
					<KeyboardArrowRightIcon
						className="arrows"
						onClick={translateRight}
					/>
				</div>
			</div>
			<div className="circles" ref={circlesRef}>
				{imagesArr.reduce(
					(acc, _, i) => [
						...acc,
						<Radio
							key={nanoid()}
							index={i}
							slideNum={slideNum}
							handleclick={() => selectButton(i)}
						/>,
					],
					[]
				)}
			</div>
		</div>
	)
}

export default App
