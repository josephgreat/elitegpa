import {
  generateTwoDigitNumbers,
  deepEqual,
  getSessionGradingSystem,
  getStudentClass,
  capitalize,
  generateRandomColors,
  sortData,
  setSessionGradingSystem,
  deleteSessionGradingSystem,removeSpecialCharacters
} from "./appLogics.js";
import calculateGpa, {
  calculateCGPA,
  calculateSessionCreditLoad,
  calculateSessionCourses,
  convertGradeToPoint,
  convertPointToGrade,
  calculateUserGradePoint,
  calculateTotalCreditLoad,
  calculateCourseGradePoint, gradingSystem
} from "./calculateGpa.jsx";
import throwAppError from "./error.js";
import { sessionDataToExcel } from "./datatoexcel.js";
import { setCookie, getCookie, eraseCookie } from "./cookie.js";

export {
  generateTwoDigitNumbers,
  calculateGpa,
  calculateCGPA,
  throwAppError,
  deepEqual,
  calculateSessionCreditLoad,
  calculateSessionCourses,
  getSessionGradingSystem,
  getStudentClass,
  convertGradeToPoint,
  convertPointToGrade,
  capitalize,
  setSessionGradingSystem,
  deleteSessionGradingSystem,
  generateRandomColors,
  gradingSystem,
  calculateUserGradePoint,
  calculateTotalCreditLoad,
  calculateCourseGradePoint,
  sessionDataToExcel,
  sortData,
  setCookie,
  getCookie,
  eraseCookie,
  removeSpecialCharacters
};
