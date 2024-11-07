import React from "react";
import ErrorPage from "../pages/Error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorDetails: { error: "", info: "", type: "", statusCode: "" }, // Add statusCode
    };
  }

  static getDerivedStateFromError(error) {
    // Return updated state when an error occurs
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    let errorType = "Unknown Error Type";
    let statusCode = "";

    if (error && error instanceof Error) {
      errorType = "Standard Error";  // It's a standard JavaScript Error
    } else if (typeof error === "string") {
      errorType = "String Error";  // Error is a string message
    } else if (error instanceof TypeError) {
      errorType = "Type Error";  // It's a TypeError
    } else if (error instanceof SyntaxError) {
      errorType = "Syntax Error";  // It's a SyntaxError
    }

    // If the error has a response (like from API call), check for status code
    if (error && (error.response && error.response.status)) {
      statusCode = error.response.status;
    }

    // Update the state with error details, type, and status code
    this.setState({
      errorDetails: {
        error,
        info,
        type: errorType,
        statusCode: statusCode,
      },
    });

    console.log("Caught error:", error);
    console.log("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.errorDetails.error}
          info={this.state.errorDetails.info}
          errorType={this.state.errorDetails.type}
          statusCode={this.state.errorDetails.statusCode} // Pass statusCode to Error component
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
