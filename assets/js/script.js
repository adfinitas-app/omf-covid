const arrowElem = document.getElementById('arrow-down');
const contentElem = document.getElementById('click-to-expand');

arrowElem.addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (contentElem.style.maxHeight && contentElem.style.maxHeight !== '0px') {
        contentElem.style.maxHeight = '0px';
    } else {
        contentElem.style.maxHeight = '2000px';
        contentElem.style.height = 'auto';
    }
})