self.onmessage = function (e) {
  const { targetGPA, maxGPA, courses, stepGap } = e.data;

  function getRandomGrade(mean, stdDev, maxGrade, stepGap) {
    let grade;
    do {
      grade = mean + stdDev * (Math.random() * 2 - 1);
      grade = Math.round(grade / stepGap) * stepGap; // Round to the nearest stepGap
    } while (grade < 0 || grade > maxGrade);
    return parseFloat(grade.toFixed(1));
  }

  function adjustGradesToMeetTarget(combination, targetGPA, totalCredits, stepGap) {
    let weightedSum = combination.reduce(
      (sum, course) => sum + course.grade * parseInt(course.credits),
      0
    );
    let averageGPA = (weightedSum / totalCredits).toFixed(2);

    // If the averageGPA is below targetGPA, adjust the grades upwards
    if (averageGPA < targetGPA) {
      for (let course of combination) {
        const maxAdjustment = maxGPA - course.grade;
        const neededAdjustment =
          (targetGPA * totalCredits - weightedSum) / course.credits;

        const adjustment = Math.min(maxAdjustment, neededAdjustment);
        course.grade = parseFloat((course.grade + adjustment).toFixed(1));
        course.grade = Math.round(course.grade / stepGap) * stepGap; // Ensure adjustment respects stepGap

        weightedSum += adjustment * parseInt(course.credits);
        averageGPA = (weightedSum / totalCredits).toFixed(2);

        if (averageGPA >= targetGPA) break;
      }
    }

    return combination;
  }

  function generateRandomGradeCombinations(
    targetGPA,
    courses,
    maxGPA,
    stepGap,
    numCombinations = 5
  ) {
    const combinations = [];
    const totalCredits = courses.reduce(
      (sum, course) => sum + parseInt(course.credits),
      0
    );

    while (combinations.length < numCombinations) {
      const combination = [];
      const meanGPA = targetGPA;
      const stdDev = 0.5; // Adjust the standard deviation as needed

      courses.forEach((course) => {
        const randomGrade = getRandomGrade(meanGPA, stdDev, maxGPA, stepGap);
        combination.push({
          course: course.name,
          grade: randomGrade,
          credits: parseInt(course.credits),
        });
      });

      const adjustedCombination = adjustGradesToMeetTarget(
        combination,
        targetGPA,
        totalCredits,
        stepGap
      );

      const weightedSum = adjustedCombination.reduce(
        (sum, course) => sum + course.grade * course.credits,
        0
      );
      const averageGPA = (weightedSum / totalCredits).toFixed(2); // Calculate weighted average GPA

      combinations.push({ combination: adjustedCombination, averageGPA });
    }

    return combinations;
  }

  const combinations = generateRandomGradeCombinations(
    targetGPA,
    courses,
    maxGPA,
    stepGap
  );

  self.postMessage({ targetGPA, combinations });
};
