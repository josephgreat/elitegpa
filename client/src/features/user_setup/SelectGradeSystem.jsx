import { Box, Button, Select } from "@chakra-ui/react";
import React from "react";
import { gradingSystem } from "../../utils";

const SelectGradeSystem = ({
  accountSetup,
  setAccountSetup,
  handleAccountSetupSubmit,
  
}) => {
  // const gradingSystem = [
  //   "Five Point (A, B, C, D, E, F)",
  //   "Four Point (A, B, C, D, E, F)",
  //   "Four Point (A, AB, B, BC, C, CD, D, E, F)",
  // ];
  return (
    <Box mt="4">
      <Select
        placeholder="Select Your Institution's Grading System"
        onChange={(e) =>
          setAccountSetup({ ...accountSetup, grading_system: e.target.value })
        }
        value={accountSetup.grading_system}
      >
        {Object.keys(gradingSystem).map((system, index) => (
          <option key={index} value={system}>
            {system}
          </option>
        ))}
      </Select>
      {accountSetup.grading_system && (
        <Button
          bg="primary"
          color="secondary"
          mt="2"
          _hover={{
            bg: "transparent",
            color: "primary",
            border: "1px solid",
            borderColor: "primary",
          }}
            onClick={handleAccountSetupSubmit}
        >
          Done
        </Button>
      )}
    </Box>
  );
};

export default SelectGradeSystem;
