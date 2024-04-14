function dataPublication(){
	const inputQuantity = document.querySelector('.input-quantity');

	// Toggle
	// Constantes Toggle Titles
	const toggleDescription = document.querySelector(
		'.title-description'
	);
	const toggleCategory = document.querySelector(
		'.title-category'
	);
	const toggleAdditionalInformation = document.querySelector(
		'.title-additional-information'
	);
	const toggleReviews = document.querySelector('.title-reviews');

	// Constantes Contenido Texto
	const contentDescription = document.querySelector(
		'.text-description'
	);
	const contentCategory = document.querySelector(
		'.text-category'
	);
	const contentAdditionalInformation = document.querySelector(
		'.text-additional-information'
	);
	const contentReviews = document.querySelector('.text-reviews');

	// Funciones Toggle
	toggleDescription.addEventListener('click', () => {
		contentDescription.classList.toggle('hidden');
	});
	toggleCategory.addEventListener('click', () => {
		contentCategory.classList.toggle('hidden');
	});

	toggleAdditionalInformation.addEventListener('click', () => {
		contentAdditionalInformation.classList.toggle('hidden');
	});

	toggleReviews.addEventListener('click', () => {
		contentReviews.classList.toggle('hidden');
	});
}