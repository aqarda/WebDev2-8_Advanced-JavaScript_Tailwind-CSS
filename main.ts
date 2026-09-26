/*
Im not sure if this should be here or in the Index.html section. 
But we do need a top comment in one of our sections.
figured Id make a simple one and we can edit it later
I also dont know if your full names are the ones you guys prefer. I just copy/pasted your teams names in here

Names: Patrick Bouley, John Leandro Loyao, Fernando Lopez-Areal Serrano
Date: September. 24, 2026

Program Description:
This program controls a responsive unit conversion website for Weight, Distance, and Temperature.
The user enters a value into one of the converter inputs and selects the Convert button.
The program processes the input using the appropriate conversion function.
The converted result is then displayed on the webpage.
The navigation buttons also allow the user to switch between the three converter sections.
*/

// Starting with the Nav Bar and Seperate form sections

// These are the Navigation buttons used to switch between the three converter sections
const weightTab = document.getElementById("weightTab") as HTMLButtonElement;
const distanceTab = document.getElementById("distanceTab") as HTMLButtonElement;
const temperatureTab = document.getElementById("temperatureTab") as HTMLButtonElement;

// These are the main sections that contain the Weight, Distance, and Temperature Converters
const weightSection = document.getElementById("weightSection") as HTMLElement;
const distanceSection = document.getElementById("distanceSection") as HTMLElement;
const temperatureSection = document.getElementById("temperatureSection") as HTMLElement;

/* These next sections all link events to the Nav Buttons

This is the Weight section, We want to display it and hide the other sections
it also updates the weight tab to provide visual feedback that this is the currently active tab*/
weightTab.addEventListener("click", () => {
    weightSection.classList.remove("hidden");
    distanceSection.classList.add("hidden");
    temperatureSection.classList.add("hidden");

    weightTab.classList.add("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    distanceTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
    temperatureTab.classList.remove("bg-blue-500", "ring-2", "ring-blue-500", "text-white");
});

/* We do the same for the other two buttons
using "remove" and "add" doesnt create multiple copies of a class state. */

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

// We can put all the Input Sections here. Just to keep the same elements in one place
const poundsInput = document.getElementById("poundsInput") as HTMLInputElement;
const kgInput = document.getElementById("kgInput") as HTMLInputElement;

// Distance inputs
const milesInput = document.getElementById("milesInput") as HTMLInputElement;
const kmInput = document.getElementById("kmInput") as HTMLInputElement;

/*
        Add your consts here
*/

// The area for all the conversion buttons
const poundButton = document.getElementById("poundButton") as HTMLButtonElement;
const kgButton = document.getElementById("kgButton") as HTMLButtonElement;

// Distance buttons
const milesButton = document.getElementById("milesButton") as HTMLButtonElement;
const kmButton = document.getElementById("kmButton") as HTMLButtonElement;

/*
        Add your consts here
*/

// The result of converting pounds to KG, and will be related to the first form form (Pounds to KG)
const kgResult = document.getElementById("kgResult") as HTMLParagraphElement;
// The result of converting KG back to pounds, and will be related to the second form (KG to Pounds)
const poundResult = document.getElementById("poundResult") as HTMLParagraphElement;

// The result of converting miles to km (first distance form)
const kmResult = document.getElementById("kmResult") as HTMLParagraphElement;
// The result of converting km back to miles (second distance form)
const milesResult = document.getElementById("milesResult") as HTMLParagraphElement;


const conversionFunction = (
    fromUnit: string,
    toUnit: string
): ((value: number) => number) => {

    // Pounds to Kilograms
    if (fromUnit === "lb" && toUnit === "kg") {
        return (value: number): number => value / 2.20462;
    }

    // Kilograms to Pounds
    if (fromUnit === "kg" && toUnit === "lb") {
        return (value: number): number => value * 2.20462;
    }

    
    // Miles to Kilometres
    if (fromUnit === "mi" && toUnit === "km") {
        return (value: number): number => value * 1.609344;
    }

    // Kilometres to Miles
    if (fromUnit === "km" && toUnit === "mi") {
        return (value: number): number => value / 1.609344;
    }

    /*
        Add your Units here
    */
    // This will only happen if the units passed into the function do not match one of our conversions
    throw new Error("Invalid conversion");
};

/*
    This is where we create the individual conversion functions.
    conversionFunction returns the correct arrow function based on the two units we give it.
    We can then reuse these returned functions inside the button handlers.
*/

// Weight Conversion Functions
const poundsToKilograms = conversionFunction("lb", "kg");
const kilogramsToPounds = conversionFunction("kg", "lb");

// Distance Conversion Functions
const milesToKilometres = conversionFunction("mi", "km");
const kilometresToMiles = conversionFunction("km", "mi");


/*
    We still need a way for the buttons to actually perform the conversions when clicked,
    so these Handle Functions read the user input, use the correct conversion function,
    and then display the answer on the page.
*/

// Handles the Pounds to Kilograms converter
const handlePoundConvert = (): void => {

    // Take the value from the Pounds input box and turn it into a number
    const pounds: number = Number(poundsInput.value);

    // Use the conversion function we created above
    const kilograms: number = poundsToKilograms(pounds);

    // Display the result and round it to two decimal places
    kgResult.textContent = kilograms.toFixed(2);
};
// Each converter will follow this format, so im only putting comments in this one


// Handles the Kilograms to Pounds converter
const handleKgConvert = (): void => {
    const kilograms: number = Number(kgInput.value);
    const pounds: number = kilogramsToPounds(kilograms);
    poundResult.textContent = pounds.toFixed(2);
};


// Handles the Miles to Kilometres converter
const handleMilesConvert = (): void => {
    const miles: number = Number(milesInput.value);
    const kilometres: number = milesToKilometres(miles);
    kmResult.textContent = kilometres.toFixed(2);
};

// Handles the Kilometres to Miles converter
const handleKmConvert = (): void => {
    const kilometres: number = Number(kmInput.value);
    const miles: number = kilometresToMiles(kilometres);
    milesResult.textContent = miles.toFixed(2);
};


// Make sure the buttons know what to listen for, and what to do when they are clicked


// Distance Converter Event Listeners
milesButton.addEventListener("click", handleMilesConvert);
kmButton.addEventListener("click", handleKmConvert);

// Weight Converter Event Listeners
poundButton.addEventListener("click", handlePoundConvert);
kgButton.addEventListener("click", handleKgConvert);
