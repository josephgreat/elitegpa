const throwAppError = ({toast, error, navigate}) => {
  console.log(error)
  if (error.code === "ERR_NETWORK") {
    navigate("/offline_notification")
    toast({
      title: `Network error`,
      description: `Check your Internet connection`,
      status: "error",
      // isClosable:
    });
  } else
  window.location = "/server-error"
    toast({
      title: `${error.response.data.error}`,
      description: `${error.response.data.message}`,
      status: "error",
      // isClosable:
    });
};

export default throwAppError