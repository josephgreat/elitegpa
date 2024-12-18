function generateTwoDigitNumbers() {
  let twoDigitNumbers = [];

  const currentYear = new Date().getFullYear();
  // let lastdigits = currentYear.toString().slice(2)
  for (let i = currentYear; i >= 2000; i--) {
    // Convert the number to a string
    let numString = i.toString();

    // If the number is a single digit, prepend a '0' to make it two digits
    if (numString.length === 1) {
      numString = "0" + numString;
    }

    // Add the two-digit number to the array
    twoDigitNumbers.push(numString);
  }

  return twoDigitNumbers;
}

function deepEqual(obj1, obj2) {
  // Check if both objects are of type 'object'
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    // Check if the number of keys in both objects are the same
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    // Check if the value of each key in obj1 is equal to the value of the same key in obj2
    for (let key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    // If both are not objects, perform a strict equality check
    return obj1 === obj2;
  }
}

function removeSpecialCharacters(e) {
  const regex = /^[a-zA-Z0-9 ]*$/;

  // If the current input value contains any character not in the regex, remove it
  if (!regex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
  }
}

function getSessionGradingSystem() {
  const storedGradingSystem = sessionStorage.getItem("gradingSystem");
  if (storedGradingSystem) {
    return JSON.parse(storedGradingSystem);
  }
  return null; // Return null if no grading system is found
}

const getStudentClass = (cgpa, grading_system) => {
  let position;
  let badgeColor;
  let gradingSystem = grading_system || getSessionGradingSystem();

  if (!gradingSystem) {
    // window.location.replace("/login");
    console.warn("No grading system found in session storage. Using default.");
    // You can either throw an error here or set a default value for gradingSystem.
    // Here, we'll set a default grading system:
  }

  const gradePointRate =
    gradingSystem && gradingSystem.split(" ")[0].toLowerCase();

  if (
    (cgpa >= 4.5 && gradePointRate === "five") ||
    (cgpa >= 3.5 && gradePointRate === "four")
  ) {
    position = "First Class Honors";
    badgeColor = "rgb(50, 205, 50)";
  } else if (
    (cgpa >= 3.5 && gradePointRate === "five") ||
    (cgpa >= 2.5 && gradePointRate === "four")
  ) {
    badgeColor = "rgb(136, 221, 58)";
    position = "Second Class Upper";
  } else if (
    (cgpa >= 2.5 && gradePointRate === "five") ||
    (cgpa >= 1.5 && gradePointRate === "four")
  ) {
    badgeColor = "rgb(227, 235, 69)";
    position = "Second Class Lower";
  } else if (cgpa >= 2.0 && gradePointRate === "five") {
    badgeColor = "rgb(246, 175, 82)";
    position = "Third Class";
  } else if (
    (cgpa >= 1.0 && gradePointRate === "five") ||
    (cgpa >= 1.0 && gradePointRate === "four")
  ) {
    badgeColor = "rgb(255, 111, 97)";
    position = "Pass";
  } else {
    badgeColor = "rgb(255, 111, 97)";
    position = "Fail";
  }

  let studentClass = { position: position, badgeColor: badgeColor };
  return studentClass;
};

function generateRandomColors(count) {
  const randomColor = () => Math.floor(Math.random() * 256);
  const colors = [];

  for (let i = 0; i < count; i++) {
    const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    colors.push(color);
  }

  return colors;
}

function setSessionGradingSystem(grading_system) {
  const storedGradingSystem = sessionStorage.getItem("gradingSystem");
  if (!storedGradingSystem) {
    sessionStorage.setItem("gradingSystem", JSON.stringify(grading_system));
  }
}
function deleteSessionGradingSystem() {
  const storedGradingSystem = sessionStorage.getItem("gradingSystem");
  if (storedGradingSystem) {
    sessionStorage.removeItem("gradingSystem");
  }
}

export {
  generateTwoDigitNumbers,
  deepEqual,
  getStudentClass,
  generateRandomColors,
  setSessionGradingSystem,
  getSessionGradingSystem,
  deleteSessionGradingSystem,
  removeSpecialCharacters,
};
// Test the function
