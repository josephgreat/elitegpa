import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";

const SelectLevel = ({ setActiveStep, accountSetup, setAccountSetup }) => {
  const [completed, setCompleted] = useState(false);

  const programs = [
    { title: "Undergraduate Program" },
    { title: "Diploma Program" },
  ];

  const handleProgramChange = (e) => {
    const programType = e.target.value;
    setAccountSetup({ ...accountSetup, program_type: programType });
    setCompleted(programType === "Diploma Program");
  };

  const handleYearsOfStudyChange = (e) => {
    const yearsOfStudy = e.target.value;
    setAccountSetup({ ...accountSetup, years_of_study: yearsOfStudy });
    setCompleted(yearsOfStudy >= 3 && yearsOfStudy <= 8);
  };

  useEffect(() => {
    if (
      accountSetup.program_type === "Diploma Program" ||
      (accountSetup.years_of_study >= 3 && accountSetup.years_of_study <= 8)
    )
      setCompleted(true);
  }, []);

  return (
    <Box mt="4">
      <Select
        placeholder="Select Your Program Type"
        onChange={handleProgramChange}
        value={accountSetup.program_type}
      >
        {programs.map((program, index) => (
          <option key={index} value={program.title}>
            {program.title}
          </option>
        ))}
      </Select>
      {accountSetup.program_type === "Undergraduate Program" && (
        <Input
          mt="4"
          value={
            accountSetup.years_of_study !== 0 && accountSetup.years_of_study
          }
          onChange={handleYearsOfStudyChange}
          placeholder="How many years course? (min: 3; max: 8)"
          type="number"
          min="3"
          max="8"
        />
      )}
      <Flex gap="4">
        <Button
          bg="transparent"
          color="gray.400"
          mt="2"
          onClick={() => setActiveStep(0)}
          _hover={{
            border: "1px solid",
          }}
        >
          Back
        </Button>
        {completed && (
          <Button
            bg="accentVar"
            color="secondary"
            mt="2"
            onClick={() => setActiveStep(2)}
            _hover={{
              bg: "transparent",
              color: "accentVar",
              border: "1px solid",
              borderColor: "accentVar",
            }}
          >
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SelectLevel;
