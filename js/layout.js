let workspace = document.querySelector('.workspace');
let container = document.querySelector('.container');
let containerWidth = 280;
let numberOfColumns= parseInt(window.innerWidth / containerWidth);

window.addEventListener('resize', function(){
    numberOfColumns = parseInt(window.innerWidth / containerWidth);
    workspace.style.gridTemplateColumns='repeat(' + numberOfColumns + ', 1fr)';
});

function UpdateNumberOfContainers(){
    for (let i = 0; i < numberOfColumns; i++) {
        workspace.appendChild()
    }
    
}