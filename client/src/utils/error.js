const throwAppError = (toast, error) => {
  if (error.code === "ERR_NETWORK") {
    toast({
      title: `Network error`,
      description: `Check your Internet connection`,
      status: "error",
      // isClosable:
    });
  } else
    toast({
      title: `${error.response.data.error}`,
      description: `${error.response.data.message}`,
      status: "error",
      // isClosable:
    });
};

export default throwAppError