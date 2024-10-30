import {
  Box,
  Button,
  ButtonGroup,
  ButtonSpinner,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { photoBgColor } from "../components/Sidebar";
import { FaEnvelope, FaSave } from "react-icons/fa";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapLocation,
  FaUser,
} from "react-icons/fa6";
import { gradingSystem } from "../utils";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import app from "../../firebase/init";
import { Loader } from "../components";
import { updateUserDetails } from "../../firebase";

const Settings = ({ userDetails, toast, loginMode, setUserDetails }) => {
  const photoRef = useRef();
  const [newUserDetails, setNewUserDetails] = useState(userDetails);
  const isLarge = useBreakpointValue({ lg: true });
  const [photoURL, setPhotoURL] = useState(newUserDetails.photoURL);
  const { displayName, email } = newUserDetails;
  const [photoFile, setPhotoFile] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [selectedState, setSelectedState] = useState(
    newUserDetails.setup.institution_state
  );
  const [stateInstitutions, setStateInstitutions] = useState([]);
  const [states, setStates] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const programs = [
    { title: "Undergraduate Program" },
    { title: "Diploma Program" },
  ];

  const handleDetailsChange = (e, isSetup) => {
    const { name, value } = e.target;
    if (!isSetup) {
      setNewUserDetails({ ...newUserDetails, [name]: value });
    } else {
      setNewUserDetails({
        ...newUserDetails,
        setup: {
          ...newUserDetails.setup,
          [name]: value,
        },
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file) {
      if (file.size > maxSize) {
        toast({
          title: "File is too large",
          description: "The maximum file size allowed is 5MB.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPEG, PNG, and GIF files are allowed.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const newPhotoURL = URL.createObjectURL(file);
      setPhotoURL(newPhotoURL);
    }
  };

  const handleDeletePhoto = () => {
    setPhotoURL(null);
    photoRef.current.value = "";
  };

  const handleYearsOfStudyChange = (e) => {
    const yearsOfStudy = e.target.value;
     handleDetailsChange(e, true);
  };

  const handleNewUserDetailsSaving = () => {
    if (newUserDetails.yearsOfStudy < 3 && newUserDetails.yearsOfStudy > 8){return}
    updateUserDetails(
      newUserDetails,
      photoURL,
      setUserDetails,
      setNewUserDetails,
      setIsUpdatingDetails,
      photoFile,
      toast
    );
    
  };
  const changePassword = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      setUpdatingPassword(true);
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);
      setUpdatingPassword(false);
      toast({
        // title: ``,
        description: `Password updated successfully`,
        status: "success",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === "auth/invalid-credential") {
        toast({
          title: "Invalid credentials",
          description: "The Password you entered was invalid",
          status: "error",
        });
      } else if (error.code === "auth/missing-password") {
        toast({
          title: "Empty Password",
          description: "Enter the old and new password",
          status: "error",
        });
      }
      setUpdatingPassword(false);
    }
  };

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
      setNewUserDetails({
        ...newUserDetails,
        setup: {
          ...newUserDetails.setup,
          institution_state: selectedState,
        },
      });
    }
  }, [selectedState, institutions]);

  return (
    <Container py="8" maxW="72rem" mx="auto">
      <Heading textAlign="center" fontSize="clamp(1.5rem, 3vw, 2.5rem)">
        Settings
      </Heading>
      <Flex gap="max(4rem, 10vw)" mt="4">
        {isLarge && (
          <Box w="20%">
            <Heading
              mb="4"
              fontSize="clamp(1rem, 1.7vw, 1.7rem)"
            >
              Quick Links
            </Heading>
            <Flex flexDir={"column"} ml="4" gap="2">
              <Link
                href="#profile_data"
                _hover={{ opacity: ".6" }}
                color={"accentVar"}
                textDecor={"underline"}
              >
                Profile Data
              </Link>
              <Link
                href="#profile_data"
                _hover={{ opacity: ".6" }}
                color={"accentVar"}
                textDecor={"underline"}
              >
                Institution Details
              </Link>
              {loginMode === "password" && (
                <Link
                  href="#change_password"
                  _hover={{ opacity: ".6" }}
                  color={"accentVar"}
                  textDecor={"underline"}
                >
                  Change Password
                </Link>
              )}
            </Flex>
          </Box>
        )}
        <Box
          flex="1"
          pr={{ md: "2rem" }}
          maxH={{ md: "68vh" }}
          overflowY="auto"
        >
          <Box mb="6" id="profile_data">
            <Heading as="h5" mb="4" fontSize="clamp(1rem, 1.7vw, 1.7rem)">
              Profile Data
            </Heading>
            <Flex alignItems={"center"} gap="4">
              <Box>
                <Box
                  w="clamp(7rem, 15vw, 10rem)"
                  h="clamp(7rem, 15vw, 10rem)"
                  rounded="full"
                  transition={"all .3s ease"}
                  bg={
                    photoURL
                      ? `url(${photoURL}) center no-repeat`
                      : photoBgColor
                  }
                  bgSize={"contain"}
                  display={"grid"}
                  placeItems={"center"}
                  textTransform={"capitalize"}
                  shadow={"inset 0 0 5px rgba(100,100,100, .6)"}
                >
                  {!photoURL && displayName && (
                    <Text
                      color="#fff"
                      fontSize={"3rem"}
                      textShadow={"0 0 5px rgba(100,100,100,.6)"}
                    >
                      {displayName[0]}
                      {displayName[1]}
                    </Text>
                  )}
                  <Input
                    type="file"
                    display={"none"}
                    name="photo"
                    onChange={handlePhotoChange}
                    ref={photoRef}
                    accept="image/jpeg,image/png,image/gif"
                  />
                </Box>
              </Box>
              <Flex flexDir="column" gap="2">
                <Button
                  onClick={() => photoRef.current.click()}
                  bg="transparent"
                  _hover={{ bg: "rgba(50,50,50,.1)" }}
                  border="1.5px solid"
                  borderColor={"rgba(50,50,50,.3)"}
                  color="gray"
                >
                  {photoURL ? "Change Picture" : "Upload A Picture"}
                </Button>

                {photoURL && (
                  <Button
                    bg="transparent"
                    _hover={{ bg: "rgba(250,50,50,.1)" }}
                    border="1.5px solid"
                    borderColor={"red"}
                    color="red"
                    onClick={handleDeletePhoto}
                  >
                    Delete Picture
                  </Button>
                )}
              </Flex>
            </Flex>
            <Flex gap="4" flexDir={{ base: "column", md: "row" }} mt="4">
              <FormControl mb="2">
                <InputGroup>
                  <InputLeftAddon>
                    <FaUser />
                  </InputLeftAddon>
                  <Input
                    value={newUserDetails.displayName}
                    name="displayName"
                    onChange={(e) => handleDetailsChange(e)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon>
                    <FaEnvelope />
                  </InputLeftAddon>
                  <Input value={newUserDetails.email} name="email" disabled />
                </InputGroup>
              </FormControl>
            </Flex>
          </Box>
          <Divider my="4" />
          <Box mb="6" id="instituition_details">
            <Heading as="h5" mb="4" fontSize="clamp(1rem, 1.7vw, 1.7rem)">
              Instituition Details
            </Heading>

            <Flex mt="4" flexWrap={"wrap"}>
              <FormControl>
                <FormLabel>Instituition State</FormLabel>

                <Select
                  placeholder="Select Your State"
                  value={newUserDetails.setup.institution_state}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    handleDetailsChange(e, true);
                  }}
                  name="institution_state"
                >
                  {states.map((state, index) => (
                    <option key={index}>{state}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mt={4}>Instituition</FormLabel>
                <Select
                  onChange={(e) => handleDetailsChange(e, true)}
                  name="institution"
                  placeholder="Select Your Institution"
                  value={newUserDetails.setup.institution}
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
              </FormControl>
              <FormControl>
                <FormLabel mt={4}>Instituition Grading System</FormLabel>
                <Select
                  placeholder="Select Your Institution's Grading System"
                  onChange={(e) => handleDetailsChange(e, true)}
                  name="grading_system"
                  disabled
                  value={newUserDetails.setup.grading_system}
                >
                  {Object.keys(gradingSystem).map((system, index) => (
                    <option key={index} value={system}>
                      {system}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mt={4}>Program Type</FormLabel>
                <Select
                  placeholder="Select Your Program Type"
                  onChange={(e) => handleDetailsChange(e, true)}
                  name="program_type"
                  disabled
                  value={newUserDetails.setup.program_type}
                >
                  {programs.map((program, index) => (
                    <option key={index} value={program.title}>
                      {program.title}
                    </option>
                  ))}
                </Select>
                {newUserDetails.setup.program_type ===
                  "Undergraduate Program" && (
                  <FormControl mt="4">
                    <FormLabel>Years of Study</FormLabel>
                    <Input
                      value={
                        // newUserDetails.setup.years_of_study !== 0 &&
                        newUserDetails.setup.years_of_study
                      }
                      onChange={handleYearsOfStudyChange}
                      placeholder="Years of study (min: 3; max: 8)"
                      type="number"
                      name="years_of_study"
                      // min="3"
                      // max="8"
                    />
                  </FormControl>
                )}
              </FormControl>
            </Flex>
          </Box>
          <Divider my="4" />
          {loginMode === "password" && (
            <Box id="change_password">
              <Heading as="h5" mb="4" fontSize="clamp(1rem, 1.7vw, 1.7rem)">
                Change Password
              </Heading>

              <Box mt="4">
                <Flex flexDir={{ base: "column", md: "row" }} gap="4">
                  <FormControl mb="2">
                    <FormLabel>Old Password</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        <FaLock />
                      </InputLeftAddon>
                      <Input
                        // value={newUserDetails.displayName}
                        name="current_password"
                        type={showCurrentPassword ? "text" : "password"}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <InputRightAddon
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>New Password</FormLabel>

                    <InputGroup>
                      <InputLeftAddon>
                        <FaLock />
                      </InputLeftAddon>
                      <Input
                        name="new_password"
                        type={showNewPassword ? "text" : "password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputRightAddon
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Button
                  my="2"
                  bg="accentVar"
                  border="1.5px solid"
                  _hover={{ bg: "secondary", color: "accentVar" }}
                  color="secondary"
                  display={"flex"}
                  mx="auto"
                  gap="2"
                  disabled={updatingPassword}
                  onClick={changePassword}
                >
                  Update Password
                  {updatingPassword && <ButtonSpinner />}
                </Button>
              </Box>
            </Box>
          )}
          <Divider my="4" />

          <Button
            bg="primary"
            color="secondary"
            border="1.5px solid"
            borderColor={"primary"}
            display={"flex"}
            gap="2"
            mx="auto"
            onClick={handleNewUserDetailsSaving}
            _hover={{ bg: "secondary", color: "primary" }}
          >
            <FaSave />
            Save Changes
          </Button>
        </Box>
      </Flex>
      {updatingPassword && <Loader text="Updating Password..." />}
      {isUpdatingDetails && <Loader text="Updating Details..." />}
    </Container>
  );
};

export default Settings;
