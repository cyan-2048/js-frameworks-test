<script>
	let page = 0;

	const page1 = Array(10)
		.fill()
		.map((a, i) => "page1 #" + (i + 1));
	const page2 = Array(50)
		.fill()
		.map((a, i) => "page2 #" + (i + 1));
	const page3 = Array(120)
		.fill()
		.map((a, i) => "page3 #" + (i + 1));

	const pages = [page1, page2, page3];
</script>

<button on:click={() => (page = 0)}>Page 1</button>
<button on:click={() => (page = 1)}>Page 2</button>
<button on:click={() => (page = 2)}>Page 3</button>

<h1>Page {page + 1}</h1>

<ul>
	{#each pages[page] as item}
		<li>{item}</li>
	{/each}
</ul>
