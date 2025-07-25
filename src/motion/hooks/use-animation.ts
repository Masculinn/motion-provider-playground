import { useReducer, useEffect } from "react";
import {
  UseAnimationProps,
  UseAnimationStateProps,
  UseAnimationActionTypes,
} from "../types";

const initialState: UseAnimationStateProps = {
  isAnimationStopped: false,
  reverse: false,
};

function animationReducer(
  state: UseAnimationStateProps,
  action: UseAnimationActionTypes
): UseAnimationStateProps {
  switch (action.type) {
    case "IMMEDIATE_STOP":
      return { isAnimationStopped: true, reverse: true };
    case "FOLLOW_STOP":
      return { isAnimationStopped: true, reverse: false };
    case "IMMEDIATE_RESET":
      return { isAnimationStopped: true, reverse: false };
    case "FOLLOW_RESET":
      return { isAnimationStopped: false, reverse: false };
    case "UPDATE":
      return {
        isAnimationStopped: false,
        reverse: action.payload.reverseAnimation,
      };
    default:
      return state;
  }
}

export const useAnimation = ({
  stopAnimation,
  reverseAnimation = false,
}: UseAnimationProps): UseAnimationStateProps => {
  const [state, dispatch] = useReducer(animationReducer, initialState);
  const recallDuration = 50;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (stopAnimation) {
      if (!reverseAnimation) {
        dispatch({ type: "IMMEDIATE_STOP" });
        timeout = setTimeout(() => {
          dispatch({ type: "FOLLOW_STOP" });
        }, recallDuration);
      } else {
        dispatch({ type: "IMMEDIATE_RESET" });
        timeout = setTimeout(() => {
          dispatch({ type: "FOLLOW_RESET" });
        }, recallDuration);
      }
    } else {
      dispatch({ type: "UPDATE", payload: { reverseAnimation } });
    }

    return () => clearTimeout(timeout);
  }, [stopAnimation, reverseAnimation]);

  return state;
};
