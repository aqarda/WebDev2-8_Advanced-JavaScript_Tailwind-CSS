// Starting with the Nav Bar and Seperate form sections

// These are the Nav Bar Buttons
const weightTab = document.getElementById("weightTab") as HTMLButtonElement;
const distanceTab = document.getElementById("distanceTab") as HTMLButtonElement;
const temperatureTab = document.getElementById("temperatureTab") as HTMLButtonElement;

// These are the seperate sections for each converter
const weightSection = document.getElementById("weightSection") as HTMLElement;
const distanceSection = document.getElementById("distanceSection") as HTMLElement;
const temperatureSection = document.getElementById("temperatureSection") as HTMLElement;

// Making it so the buttons actually switch forms. hiding the sections we wont be using
// This also is where we make it so the browser shows which button is currently active with a colored background change 
weightTab.addEventListener("click", () => {
    weightSection.classList.remove("hidden");
    distanceSection.classList.add("hidden");
    temperatureSection.classList.add("hidden");

    weightTab.classList.add("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    distanceTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    temperatureTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
});

// We do the same for the other two buttons
// using remove and add doesnt create multiple copies of a class state. 

distanceTab.addEventListener("click", () => {
    weightSection.classList.add("hidden");
    distanceSection.classList.remove("hidden");
    temperatureSection.classList.add("hidden");

    weightTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    distanceTab.classList.add("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    temperatureTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
});

temperatureTab.addEventListener("click", () => {
    weightSection.classList.add("hidden");
    distanceSection.classList.add("hidden");
    temperatureSection.classList.remove("hidden");

    weightTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    distanceTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    temperatureTab.classList.add("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
});