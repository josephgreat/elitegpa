import { getSessionGradingSystem } from "./appLogics";
import { gradingSystem } from "./calculations";

const convertGradeToPoint = (grade, grading_system) => {
  
  const gradeValues = gradingSystem[grading_system || getSessionGradingSystem()];
  return gradeValues[grade];
};

const convertPointToGrade = (points) => {
  const gradeValues = gradingSystem[getSessionGradingSystem()];
  let closestGrade = null;
  let minDifference = Infinity;
  for (const [grade, gradePoints] of Object.entries(gradeValues)) {
    const difference = gradePoints - points;
    if (difference === 0) {
      minDifference = difference;
      closestGrade = grade;
    }
  }

  return closestGrade;
};

function sortData(response) {
  let sortedData = response.data.toSorted(
    (level1, level2) => parseInt(level1.level) - parseInt(level2.level)
  );
  return sortedData;
}

function capitalize(str) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

export { capitalize, sortData, convertPointToGrade, convertGradeToPoint };
