import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ErrorPage = ({ error, info, errorType, statusCode }) => {
  const errorMessage = error?.toString() || "An unexpected error occurred";
  const errorStack = info?.componentStack || "";

  return (
    <Box p={4} bg="red.100" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold" color="red.600">
        {errorMessage}
      </Text>
      <Text mt={2} fontSize="sm" color="gray.600">
        Error Type: {errorType}
      </Text>
      {statusCode && (
        <Text mt={2} fontSize="sm" color="gray.600">
          Server Error Code: {statusCode}
        </Text>
      )}
      {errorStack && (
        <Text mt={2} fontSize="sm" color="gray.600" whiteSpace="pre-wrap">
          {errorStack}
        </Text>
      )}
    </Box>
  );
};

export default ErrorPage;
