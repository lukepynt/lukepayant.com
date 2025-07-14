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
    // Open/close project function
    btn.addEventListener("click", () => {
        btn.disabled = true;
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

        //animation timings
        let widthTime = [0.5, 0];
        let heightTime = [0.25, 0];
        let borderTime = [0.25, 0];
        const closed = project.classList.contains("closedProject");
        //animate width/height only if width/height changes
        if(project.offsetWidth === clone.offsetWidth){
            widthTime[0] = 0;
        }
        if(project.offsetHeight === clone.offsetHeight){
            heightTime[0] = 0;
        }
        if(!closed){
            //closing animation (width and border change when height finished)
            widthTime[1] = heightTime[0];
            borderTime[1] = heightTime[0];
            project.classList.toggle("closedProject");
        }else{
            //opening animation (height and border change when width finished)
            heightTime[1] = widthTime[0];
            borderTime[1] = widthTime[0];
            project.style.borderRadius = getComputedStyle(clone).borderRadius;
        }
        project.style.transition = `width ${widthTime[0]}s cubic-bezier(0.49, 0.02, 0.52, 0.97) ${widthTime[1]}s,
                                    height ${heightTime[0]}s cubic-bezier(0.72, 0, 0.26, 0.95) ${heightTime[1]}s,
                                    border-radius ${borderTime[0]}s ease ${borderTime[1]}s`
                                    
        project.style.width = clone.offsetWidth + "px";
        project.style.height = clone.offsetHeight + "px";

        const totTime = Math.max(widthTime[0]+widthTime[1], heightTime[0]+heightTime[1], borderTime[0]+borderTime[1]) * 1000;
        setTimeout(() => {
            project.style.width = "";
            project.style.height = "";
            project.style.borderRadius = "";
            if(closed) project.classList.toggle("closedProject");
            project.style.transition = "";
            btn.disabled = false;
        }, totTime);

        btn.classList.toggle("expandedBtn");

        clone.remove();   // Delete the clone
    })
})
