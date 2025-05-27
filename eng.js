const searchInput = document.getElementById("searchBar");
const boxes = document.getElementById("projects").children;

let projects = Array.from(boxes).map(box =>{
    const name = box.querySelector("h1").textContent;
    const desc = box.querySelector("p").textContent;
    const keywords = box.dataset.keywords.split(" ");
    return{box: box, name: name.toLowerCase(), desc: desc.toLowerCase(), keywords: keywords}
});
// Gets the search input everytime the search is editted
searchInput.addEventListener("input", event => {
    const search = event.target.value.toLowerCase();
    projects.forEach(project => {
        const visible = project.name.includes(search) || project.desc.includes(search) || project.keywords.some(keyword => keyword.includes(search));
        project.box.classList.toggle("hide", !visible);
    })
})
// For the filter selection
const filters = document.getElementById("searchFilters");

filters.addEventListener("change", () => {
    const active = Array.from(filters.querySelectorAll("input[type='checkbox']:checked")).map(filter => filter.value);
    projects.forEach(project => {
        const visible = active.length == 0 || project.keywords.some(keyword => {
            return active.some(filter => keyword == filter);
        });
        project.box.classList.toggle("hide", !visible);
    })
})
