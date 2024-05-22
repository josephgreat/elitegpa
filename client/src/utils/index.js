import {
  generateTwoDigitNumbers,
  deepEqual,
  getStudentClass,
  capitalize,
  generateRandomColors,
} from "./appLogics.js";
import calculateGpa, {
  calculateCGPA,
  calculateSessionCreditLoad,
  calculateSessionCourses,
  convertGradeToPoint,
  calculateUserGradePoint,
  calculateTotalCreditLoad,
  calculateCourseGradePoint,
} from "./calculateGpa.jsx";
import throwAppError from "./error.js";
import { sessionDataToExcel } from "./datatoexcel.js";

export {
  generateTwoDigitNumbers,
  calculateGpa,
  calculateCGPA,
  throwAppError,
  deepEqual,
  calculateSessionCreditLoad,
  calculateSessionCourses,
  getStudentClass,
  convertGradeToPoint,
  capitalize,
  generateRandomColors,
  calculateUserGradePoint,
  calculateTotalCreditLoad,
  calculateCourseGradePoint,
  sessionDataToExcel
};
