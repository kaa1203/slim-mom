// LoadingComponent.js
import React, { useEffect, useReducer } from 'react';
import styled, { keyframes } from 'styled-components';

// Arrow Rotation Animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Unified Loader and Theme Container
const LoaderWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ isLoading }) =>
    isLoading ? "#FFF3E0" : "#ffffff"}; /* Soft orange when loading */
  display: flex;
  justify-content: center;
  align-items: ${({ isLoading }) =>
    isLoading ? "flex-start" : "center"}; /* Center content, loader at top */
  padding-top: ${({ isLoading }) =>
    isLoading ? "10%" : "0"}; /* Adjust spinner positioning */
  transition: background-color 0.5s ease-in-out;
`;

// Arrow Container
const ArrowContainer = styled.div`
  display: ${({ isLoading }) => (isLoading ? "block" : "none")};
  animation: ${rotate} 1s linear infinite;
  transform: rotate(90deg); /* Start with arrow pointing up */
`;

// Arrow styles
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5vw solid transparent; /* Use viewport width for responsiveness */
  border-right: 5vw solid transparent; /* Use viewport width for responsiveness */
  border-bottom: 10vh solid #f57c00; /* Use viewport height for responsiveness */
`;

// Main Loading Component
const LoadingComponent = ({ children }) => {
  const initialState = { isLoading: true };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW_LOADER":
        return { ...state, isLoading: true };
      case "HIDE_LOADER":
        return { ...state, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SHOW_LOADER" });

    // Simulate an API call or loading process
    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_LOADER" });
    }, 3000); // Simulated loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderWrapper isLoading={state.isLoading}>
      <ArrowContainer isLoading={state.isLoading}>
        <Arrow />
      </ArrowContainer>

      {/* Main content area */}
      {!state.isLoading && <div style={{ padding: "20px" }}>{children}</div>}
    </LoaderWrapper>
  );
};

export default LoadingComponent;
