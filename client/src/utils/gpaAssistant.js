self.onmessage = function (e) {
  const { pastGPAs, targetCGPA, totalLevels, maxGPA } = e.data;

  function calculateRequiredGPAs(pastGPAs, targetCGPA, totalLevels) {
    const completedLevels = pastGPAs.length;
    const remainingLevels = totalLevels - completedLevels;
    const currentSum = pastGPAs.reduce((acc, gpa) => acc + gpa, 0);
    const requiredSum = targetCGPA * totalLevels;
    const remainingSum = requiredSum - currentSum;
    const requiredGPA = remainingSum / remainingLevels;

    if (requiredGPA > maxGPA) {
      return { requiredGPA: null, achievable: false };
    }

    return { requiredGPA, achievable: true };
  }

  function generateRandomGPACombinations(pastGPAs, targetGPA, remainingLevels, maxGPA, numCombinations = 5) {
    const combinations = [];
  
    function getRandomGPA(mean, stdDev, maxGPA) {
      let gpa;
      do {
        gpa = mean + stdDev * (Math.random() * 2 - 1);
      } while (gpa < 0 || gpa > maxGPA);
      return parseFloat(gpa.toFixed(1));
    }
  
    while (combinations.length < numCombinations) {
      const combination = [];
      let remainingSum = (targetGPA + 0.5) * remainingLevels; // Ensure each combination exceeds targetGPA + 0.5
  
      for (let j = 0; j < remainingLevels - 1; j++) {
        const maxPossibleGPA = Math.min(maxGPA, remainingSum / (remainingLevels - j));
        const randomGPA = getRandomGPA(targetGPA, 0.5, maxPossibleGPA); // Adjust mean and standard deviation as needed
        combination.push(randomGPA);
        remainingSum -= randomGPA;
      }
  
      let lastGPA = parseFloat((targetGPA + 0.5).toFixed(1));
      while (lastGPA > maxGPA || lastGPA * remainingLevels < targetGPA) {
        lastGPA -= 0.1; // Decrease by smaller increments until it meets the conditions
      }
      combination.push(lastGPA);
  
      combination.forEach((gpa, index) => {
        combination[index] = Math.min(gpa, maxGPA);
      });
      const totalGPA = [...pastGPAs, ...combination].reduce((sum, gpa) => sum + gpa, 0);
      const averageGPA = (totalGPA / (remainingLevels + pastGPAs.length)).toFixed(2); // Calculate average GPA
  
      combinations.push({ combination, averageGPA });
    }
  
    return combinations;
  }
  
  
  

  const { requiredGPA, achievable } = calculateRequiredGPAs(pastGPAs, targetCGPA, totalLevels);

  if (requiredGPA !== null) {
    const remainingLevels = totalLevels - pastGPAs.length;
    const combinations = generateRandomGPACombinations(pastGPAs, requiredGPA, remainingLevels, maxGPA);

    self.postMessage({ requiredGPA, combinations, achievable });
  } else {
    self.postMessage({ requiredGPA: null, combinations: [], achievable: false });
  }
};
