import {
  generateTwoDigitNumbers,
  deepEqual,
  getStudentClass,
  capitalize,
  generateRandomColors,
  sortData,
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
import { setCookie, getCookie, eraseCookie } from "./cookie.js";

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
  sessionDataToExcel,
  sortData,
  setCookie,
  getCookie,
  eraseCookie,
};
