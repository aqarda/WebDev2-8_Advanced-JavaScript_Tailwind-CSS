"use strict";
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
const weightTab = document.getElementById("weightTab");
const distanceTab = document.getElementById("distanceTab");
const temperatureTab = document.getElementById("temperatureTab");
// These are the main sections that contain the Weight, Distance, and Temperature Converters
const weightSection = document.getElementById("weightSection");
const distanceSection = document.getElementById("distanceSection");
const temperatureSection = document.getElementById("temperatureSection");
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
const poundsInput = document.getElementById("poundsInput");
const kgInput = document.getElementById("kgInput");
// Distance inputs
const milesInput = document.getElementById("milesInput");
const kmInput = document.getElementById("kmInput");
/*
        Add your consts here
*/
// The area for all the conversion buttons
const poundButton = document.getElementById("poundButton");
const kgButton = document.getElementById("kgButton");
// Distance buttons
const milesButton = document.getElementById("milesButton");
const kmButton = document.getElementById("kmButton");
/*
        Add your consts here
*/
// The result of converting pounds to KG, and will be related to the first form form (Pounds to KG)
const kgResult = document.getElementById("kgResult");
// The result of converting KG back to pounds, and will be related to the second form (KG to Pounds)
const poundResult = document.getElementById("poundResult");
// The result of converting miles to km (first distance form)
const kmResult = document.getElementById("kmResult");
// The result of converting km back to miles (second distance form)
const milesResult = document.getElementById("milesResult");
const conversionFunction = (fromUnit, toUnit) => {
    // Pounds to Kilograms
    if (fromUnit === "lb" && toUnit === "kg") {
        return (value) => value / 2.20462;
    }
    // Kilograms to Pounds
    if (fromUnit === "kg" && toUnit === "lb") {
        return (value) => value * 2.20462;
    }
    // Miles to Kilometres
    if (fromUnit === "mi" && toUnit === "km") {
        return (value) => value * 1.609344;
    }
    // Kilometres to Miles
    if (fromUnit === "km" && toUnit === "mi") {
        return (value) => value / 1.609344;
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
const handlePoundConvert = () => {
    // Take the value from the Pounds input box and turn it into a number
    const pounds = Number(poundsInput.value);
    // Use the conversion function we created above
    const kilograms = poundsToKilograms(pounds);
    // Display the result and round it to two decimal places
    kgResult.textContent = kilograms.toFixed(2);
};
// Each converter will follow this format, so im only putting comments in this one
// Handles the Kilograms to Pounds converter
const handleKgConvert = () => {
    const kilograms = Number(kgInput.value);
    const pounds = kilogramsToPounds(kilograms);
    poundResult.textContent = pounds.toFixed(2);
};
// Handles the Miles to Kilometres converter
const handleMilesConvert = () => {
    const miles = milesInput.value.split(",").map(Number);
    const kilometres = miles.map(milesToKilometres);
    kmResult.textContent = kilometres.map((km) => km.toFixed(2)).join(", ");
};
// Handles the Kilometres to Miles converter (same steps as above)
const handleKmConvert = () => {
    const kilometres = kmInput.value.split(",").map(Number);
    const miles = kilometres.map(kilometresToMiles);
    milesResult.textContent = miles.map((mi) => mi.toFixed(2)).join(", ");
};
// Make sure the buttons know what to listen for, and what to do when they are clicked
// Distance Converter Event Listeners
milesButton.addEventListener("click", handleMilesConvert);
kmButton.addEventListener("click", handleKmConvert);
// Weight Converter Event Listeners
poundButton.addEventListener("click", handlePoundConvert);
kgButton.addEventListener("click", handleKgConvert);
//# sourceMappingURL=main.js.map