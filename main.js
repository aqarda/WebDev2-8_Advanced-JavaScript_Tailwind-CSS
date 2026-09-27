"use strict";
/*
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
// Temperature inputs
const celsiusInput = document.getElementById("celsiusInput");
const fahrenheitInput = document.getElementById("fahrenheitInput");
// The area for all the conversion buttons
const poundButton = document.getElementById("poundButton");
const kgButton = document.getElementById("kgButton");
// Distance buttons
const milesButton = document.getElementById("milesButton");
const kmButton = document.getElementById("kmButton");
// Temperature buttons
const celsiusButton = document.getElementById("celsiusButton");
const fahrenheitButton = document.getElementById("fahrenheitButton");
// The result of converting Celsius to Fahrenheit (first temperature form)
const fahrenheitResult = document.getElementById("fahrenheitResult");
// The result of converting Fahrenheit back to Celsius (second temperature form)
const celsiusResult = document.getElementById("celsiusResult");
// The result of converting pounds to KG, and will be related to the first form form (Pounds to KG)
const kgResult = document.getElementById("kgResult");
// The result of converting KG back to pounds, and will be related to the second form (KG to Pounds)
const poundResult = document.getElementById("poundResult");
// The result of converting miles to km (first distance form)
const kmResult = document.getElementById("kmResult");
// The result of converting km back to miles (second distance form)
const milesResult = document.getElementById("milesResult");
/*
    This is the higher-order function that decides which conversion we need.

    It takes in the unit we are converting from and the unit we are converting to.
    It then returns a new function that handles the correct conversion math.

    The returned function can take either one number or an array of numbers.
    If it receives an array, it uses map to convert every value in that array.
*/
const conversionFunction = (fromUnit, toUnit) => {
    // Each unit will take two units for conversion. and use the proper conversion based on the units provided 
    // Pounds to Kilograms
    if (fromUnit === "lb" && toUnit === "kg") {
        return (value) => {
            // if multiple values are entered, this converts all numbers in the array
            if (Array.isArray(value)) {
                return value.map((number) => number / 2.20462);
            }
            // but if only one value is entered, it will just convert that one value
            return value / 2.20462;
        };
    }
    // Kilograms to Pounds
    if (fromUnit === "kg" && toUnit === "lb") {
        return (value) => {
            if (Array.isArray(value)) {
                return value.map((number) => number * 2.20462);
            }
            return value * 2.20462;
        };
    }
    // Miles to Kilometres
    if (fromUnit === "mi" && toUnit === "km") {
        return (value) => {
            if (Array.isArray(value)) {
                return value.map((number) => number * 1.609344);
            }
            return value * 1.609344;
        };
    }
    // Kilometres to Miles
    if (fromUnit === "km" && toUnit === "mi") {
        return (value) => {
            if (Array.isArray(value)) {
                return value.map((number) => number / 1.609344);
            }
            return value / 1.609344;
        };
    }
    // Celsius to Fahrenheit
    if (fromUnit === "C" && toUnit === "F") {
        return (value) => {
            if (Array.isArray(value)) {
                return value.map((number) => number * 1.8 + 32);
            }
            return value * 1.8 + 32;
        };
    }
    // Fahrenheit to Celsius
    if (fromUnit === "F" && toUnit === "C") {
        return (value) => {
            if (Array.isArray(value)) {
                return value.map((number) => (number - 32) / 1.8);
            }
            return (value - 32) / 1.8;
        };
    }
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
// Temp conversion Functions
const celsiusToFahrenheit = conversionFunction("C", "F");
const fahrenheitToCelsius = conversionFunction("F", "C");
// Because our inputs are all type:text, we have to check that string and see what values are in it
// This will split those values from the commas, convert them back to numbers and return the proper values.
// Either a single number. A number array, or null if something other than numbers is inputted 
const parseInput = (input) => {
    const values = input.split(",");
    const numbers = [];
    for (const value of values) {
        const trimmedValue = value.trim();
        if (trimmedValue === "") {
            return null;
        }
        const numberValue = Number(trimmedValue);
        if (isNaN(numberValue)) {
            return null;
        }
        numbers.push(numberValue);
    }
    if (numbers.length === 1) {
        const [singleValue] = numbers;
        return typeof singleValue === "number" ? singleValue : null;
    }
    return numbers;
};
/*
    This helper function prepares the converted result to be displayed.
    This will be used for all the following handleConversion functions below
    A single number will display as one value.
    An array will display each converted number separated by commas.
*/
const displayResult = (result) => {
    if (Array.isArray(result)) {
        const formattedResults = result.map((number) => number.toFixed(2));
        return formattedResults.join(", ");
    }
    return result.toFixed(2);
};
/*
    These Handle Functions read what the user entered, make sure the input is valid,
    send either the single number or array into the correct conversion function,
    and then display the result.
*/
// Handles the Pounds to Kilograms converter
const handlePoundConvert = () => {
    // this const stores whatever values came from our parseInput function
    // it allows us to use the values with their proper converters 
    const input = parseInput(poundsInput.value);
    // If invalid text or blank values were entered, display an error message
    if (input === null) {
        kgResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    // We made this const to actually convert those results before we display them
    const result = poundsToKilograms(input);
    // This then takes the proper results, puts them back to text, and displays them for the user
    kgResult.textContent = displayResult(result);
};
// All Convert Functions will follow this structure. so comments will only be in this one
// Handles the Kilograms to Pounds converter
const handleKgConvert = () => {
    const input = parseInput(kgInput.value);
    if (input === null) {
        poundResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    const result = kilogramsToPounds(input);
    poundResult.textContent = displayResult(result);
};
// Handles the Miles to Kilometres converter
const handleMilesConvert = () => {
    const input = parseInput(milesInput.value);
    if (input === null) {
        kmResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    const result = milesToKilometres(input);
    kmResult.textContent = displayResult(result);
};
// Handles the Kilometres to Miles converter
const handleKmConvert = () => {
    const input = parseInput(kmInput.value);
    if (input === null) {
        milesResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    const result = kilometresToMiles(input);
    milesResult.textContent = displayResult(result);
};
// Handles the Celsius to Fahrenheit converter
const handleCelsiusConvert = () => {
    const input = parseInput(celsiusInput.value);
    if (input === null) {
        fahrenheitResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    const result = celsiusToFahrenheit(input);
    fahrenheitResult.textContent = displayResult(result);
};
// Handles the Fahrenheit to Celsius converter
const handleFahrenheitConvert = () => {
    const input = parseInput(fahrenheitInput.value);
    if (input === null) {
        celsiusResult.textContent = "Please enter a number or numbers separated by commas";
        return;
    }
    const result = fahrenheitToCelsius(input);
    celsiusResult.textContent = displayResult(result);
};
// Make sure the buttons know what to listen for, and what to do when they are clicked
// Distance Converter Event Listeners
milesButton.addEventListener("click", handleMilesConvert);
kmButton.addEventListener("click", handleKmConvert);
// Weight Converter Event Listeners
poundButton.addEventListener("click", handlePoundConvert);
kgButton.addEventListener("click", handleKgConvert);
// Temperature Converter Event Listeners
celsiusButton.addEventListener("click", handleCelsiusConvert);
fahrenheitButton.addEventListener("click", handleFahrenheitConvert);
