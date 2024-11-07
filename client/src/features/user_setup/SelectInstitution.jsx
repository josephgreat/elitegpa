import { Box, Button, Select } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const SelectInstitution = ({
  setActiveStep,
  accountSetup,
  setAccountSetup,
}) => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedState, setSelectedState] = useState(
    accountSetup.institution_state
  );
  const [stateInstitutions, setStateInstitutions] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const response = await fetch("/assets/states.json");
      const data = await response.json();
      setInstitutions(data);
      let allStates = [];
      data.map((institution) => {
        if (!allStates.includes(institution.State) && institution.State)
          allStates.push(institution.State);
      });
      console.log(allStates);
      setStates(allStates);
    };
    fetchInstitutions();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const selected = institutions.filter(
        (institution) => institution.State === selectedState
      );
      setStateInstitutions(selected);
      setAccountSetup({ ...accountSetup, institution_state: selectedState });
    }
  }, [selectedState, institutions]);
  return (
    <Box mt={4}>
      <Select
        placeholder="Select Your State"
        onChange={(e) => setSelectedState(e.target.value)}
        value={accountSetup.institution_state}
      >
        {states.map((state, index) => (
          <option key={index}>{state}</option>
        ))}
      </Select>
      {accountSetup.institution_state && (
        <Select
          onChange={(e) =>
            setAccountSetup({ ...accountSetup, institution: e.target.value })
          }
          placeholder="Select Your Institution"
          mt={4}
          value={accountSetup.institution}
        >
          {stateInstitutions.map(({ Name, Abbreviation }, index) => (
            <option
              value={`${Name} ${
                Abbreviation !== undefined ? `(${Abbreviation})` : ""
              }`}
              key={index}
            >
              {Name} {Abbreviation && `(${Abbreviation})`}
            </option>
          ))}
        </Select>
      )}
      {accountSetup.institution && (
        <Button
          bg="accentVar"
          color="secondary"
          mt="2"
          _hover={{
            bg: "transparent",
            color: "accentVar",
            border: "1px solid",
            borderColor: "accentVar",
          }}
          onClick={() => setActiveStep(1)}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default SelectInstitution;
