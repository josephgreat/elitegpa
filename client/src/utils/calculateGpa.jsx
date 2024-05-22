export const convertGradeToPoint = (grade) => {
  const gradeValues = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
  return gradeValues[grade];
};

export const calculateCourseGradePoint = (course) => {
  let courseGradePoint = Number(course.credit_load) * convertGradeToPoint(course.grade);
  return courseGradePoint;
}

export const calculateTotalCreditLoad = (semester) => {
  let totalCreditLoad = semester.courses.reduce(
    (accumulator, currentCourse) =>
      accumulator + Number(currentCourse.credit_load),
    0
  );
  return totalCreditLoad;
};

export const calculateUserGradePoint = (semester) => {
  let userTotalGradePoint = semester.courses.reduce(
    (accumulator, currentCourse) =>
      accumulator +
      calculateCourseGradePoint(currentCourse),
    0
  );
  return userTotalGradePoint;
};



const calculateGpa = (courses) => {
  const allCourseGrades = courses.map((course) => ({
    credit_load: course.credit_load,
    grade_value: convertGradeToPoint(course.grade),
  }));

  const totalCreditLoad = allCourseGrades.reduce(
    (accumulator, currentValue) => {
      if (!isNaN(currentValue.credit_load) && currentValue.grade_value) {
        return accumulator + Number(currentValue.credit_load);
      }
      return accumulator;
    },
    0
  );

  const totalCreditsByGrade = allCourseGrades.reduce(
    (accumulator, currentValue) => {
      if (
        !isNaN(currentValue.grade_value) &&
        currentValue.grade_value !== "" &&
        !isNaN(currentValue.credit_load) &&
        currentValue.credit_load !== ""
      ) {
        return (
          accumulator +
          Number(currentValue.credit_load) * currentValue.grade_value
        );
      }
      return accumulator;
    },
    0
  );

  const currentGpa = !isNaN(totalCreditsByGrade / totalCreditLoad)
    ? parseFloat((totalCreditsByGrade / totalCreditLoad).toFixed(3))
    : 0;

  return currentGpa;
};

export const calculateCGPA = (semesters) => {
  let CGPA = parseFloat(
    ((Number(semesters[0].gpa) + Number(semesters[1].gpa)) / 2).toFixed(3)
  );
  return CGPA;
};

export const calculateSessionCreditLoad = (semesters) => {
  let semester1CreditLoad = calculateTotalCreditLoad(semesters[0]);
  let semester2CreditLoad = calculateTotalCreditLoad(semesters[1]);

  let totalCreditLoad = semester1CreditLoad + semester2CreditLoad;

  return totalCreditLoad;
};

export const calculateSessionCourses = (semesters) => {
  let semester1Courses = semesters[0].courses.length;
  let semester2Courses = semesters[1].courses.length;

  let totalCourses = semester1Courses + semester2Courses;

  return totalCourses;
};

export default calculateGpa;
