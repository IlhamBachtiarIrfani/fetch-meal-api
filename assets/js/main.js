tailwind.config = {
	theme: {
		fontFamily: {
			sans: ['"Nunito"', 'sans-serif'],
		},
	},
};

document.getElementById('hamburger-btn').addEventListener('click', function () {
	console.log("halo");
	document.getElementById('header').classList.toggle('active');
});
