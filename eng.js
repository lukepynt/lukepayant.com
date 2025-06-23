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
    btn.addEventListener("click", () => {
        btn.parentElement.nextElementSibling.classList.toggle("hide");
    })
})
