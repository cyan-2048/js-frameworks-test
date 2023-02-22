import { Fragment, h, render } from "preact";
import { useState } from "preact/hooks";

function App() {
	const [page, setPage] = useState(0);

	const page1 = Array(10)
		.fill()
		.map((a, i) => <li>page1 #{i + 1}</li>);
	const page2 = Array(50)
		.fill()
		.map((a, i) => <li>page2 #{i + 1}</li>);
	const page3 = Array(120)
		.fill()
		.map((a, i) => <li>page3 #{i + 1}</li>);

	return (
		<>
			<button onClick={() => setPage(0)}>Page 1</button>
			<button onClick={() => setPage(1)}>Page 2</button>
			<button onClick={() => setPage(2)}>Page 3</button>

			<h1>Page {page + 1}</h1>

			<ul>{[page1, page2, page3][page]}</ul>
		</>
	);
}

// Inject our app into the DOM
render(<App />, document.body);
