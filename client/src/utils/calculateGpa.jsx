const calculateGpa = (courses) => {
  const gradeValues = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

  const allCourseGrades = courses.map((course) => ({
    credit_load: course.credit_load,
    grade_value: gradeValues[course.grade],
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

export default calculateGpa;
