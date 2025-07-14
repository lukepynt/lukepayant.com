// ----Searching for Projects
const projectBoxes = document.getElementById("projects").children;

let projects = Array.from(projectBoxes).map(box =>{
    const name = box.querySelector("h1").textContent;
    const desc = box.querySelector("p").textContent;
    const keywords = box.dataset.keywords.split(" ");
    return{box: box, name: name.toLowerCase(), desc: desc.toLowerCase(), keywords: keywords}
});

// Change visibility of projects according to inputs
const searchInput = document.getElementById("searchBar");
searchInput.addEventListener("input", inputChange);

const filters = document.getElementById("searchFilters");
filters.addEventListener("change", inputChange);

function inputChange() {
    const activeFilters = Array.from(filters.querySelectorAll("input[type='checkbox']:checked")).map(filter => filter.value);
    const search = searchInput.value.toLowerCase();
    projects.forEach(project => {
        const passedFilters = project.keywords.some(keyword => activeFilters.every(filter => keyword == filter)) || activeFilters.length == 0;
        const passedSearch = project.name.includes(search) || project.desc.includes(search) || project.keywords.some(keyword => keyword.includes(search));
        project.box.classList.toggle("hide", !passedFilters || !passedSearch);
    })
}

// ----Opening Projects
const openBtns = document.querySelectorAll(".btn3");
openBtns.forEach(btn => {
    // Open function
    btn.addEventListener("click", () => {
        const project = btn.parentElement.parentElement;

        // Create clone to get the final measurements of the project for animating
        const clone = project.cloneNode(true);
        project.parentElement.appendChild(clone);
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";

        clone.classList.toggle("closedProject");
        
        project.style.width = project.offsetWidth + "px";
        project.style.height = project.offsetHeight + "px";
        void project.offsetWidth; //force browser to register the current width and height before changing.

        const closed = project.classList.contains("closedProject");
        if(!closed){
            //closing animation
            project.style.transition = "width 0.5s cubic-bezier(0.49, 0.02, 0.52, 0.97) 0.25s, height 0.5s cubic-bezier(0.72, 0, 0.26, 0.95), border-radius 0.25s ease";
            project.classList.toggle("closedProject");
        }else{
            //opening animation
            project.style.transition = "width 0.75s cubic-bezier(0.49, 0.02, 0.52, 0.97), height 0.5s cubic-bezier(0.72, 0, 0.26, 0.95) 0.25s";
        }
        project.style.width = clone.offsetWidth + "px";
        project.style.height = clone.offsetHeight + "px";
        setTimeout(() => {
            project.style.width = "";
            project.style.height = "";
            if(closed) project.classList.toggle("closedProject");
            project.style.transition = "";
        }, 750);

        btn.classList.toggle("expandedBtn");

        clone.remove();   // Delete the clone
    })
})
