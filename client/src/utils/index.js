import {
  generateTwoDigitNumbers,
  deepEqual,
  getSessionGradingSystem,
  getStudentClass,
  generateRandomColors,
  setSessionGradingSystem,
  deleteSessionGradingSystem,
  removeSpecialCharacters,
} from "./appLogics.js";
import calculateGpa, {
  calculateCGPA,
  calculateSessionCreditLoad,
  calculateSessionCourses,
  calculateUserGradePoint,
  calculateTotalCreditLoad,
  calculateCourseGradePoint,
  gradingSystem,
} from "./calculations.js";
import throwAppError from "../errorHandling/error.js";
import { sessionDataToExcel } from "./datatoexcel.js";
import { setCookie, getCookie, eraseCookie } from "./cookie.js";
import {
  convertGradeToPoint,
  convertPointToGrade,
  capitalize,
  sortData,
} from "./formatting.js";

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
  removeSpecialCharacters,
};
