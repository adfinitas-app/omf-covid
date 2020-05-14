const arrowElem = document.getElementById("arrow-down");
const contentElem = document.getElementById("click-to-expand");

if (arrowElem) {
	arrowElem.addEventListener("click", function () {
		this.classList.toggle("active");

		if (contentElem.style.maxHeight && contentElem.style.maxHeight !== "0px") {
			contentElem.style.maxHeight = "0px";
		} else {
			contentElem.style.maxHeight = "2000px";
			contentElem.style.height = "auto";
		}
	});
}

$(document).on("click", ".btn-play", function () {
	console.log($(this).parent().width());
	const headerElem = $(this).parents("header");

	let width = $(this).parent().width() * 0.8;

	if (width < 200) width = headerElem.width();

	if (headerElem.hasClass('desktop'))
		headerElem.find(".header-video")[0].src += '&autoplay=1';
	headerElem.find(".header-video").width(width).show();

	headerElem.find(".header-title").hide();
	headerElem.find(".header-btn-container").hide();
});
