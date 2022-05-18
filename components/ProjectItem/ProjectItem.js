import React, { useContext, useReducer, useRef } from "react";
import Title from "./Title";
import ImagePro from "./Image";
import animate from "./animate";
import { CursorContext } from "../CursorManager";
import Info from "./Info";

const initialState = {
  opacity: 0,
  parallaxPos: { x: 0, y: 0 },
  scale: 0.8,
  rotationPosition: 0,
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "MOUSE/ENTER": {
      return {
        ...state,
        active: true,
      };
    }
    case "MOUSE/LEAVE": {
      return {
        ...state,
        active: false,
      };
    }
    case "CHANGE/OPACITY": {
      return {
        ...state,
        opacity: action.payload,
      };
    }
    case "MOUSE/COORDINATES": {
      return {
        ...state,
        parallaxPos: action.payload,
      };
    }

    case "CHANGE/ROTATION": {
      return {
        ...state,
        rotationPosition: action.payload,
      };
    }
    case "CHANGE/SCALE": {
      return {
        ...state,
        scale: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
}

const ProjectItem = ({ project, itemIndex }) => {
  const listItem = useRef(null);
  const { setSize } = useContext(CursorContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const easeMethod = "linear";
  const parallax = (event) => {
    const speed = -1;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;
    dispatch({ type: "MOUSE/COORDINATES", payload: { x, y } });
  };

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/OPACITY", payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleRotation = (initialRotation, duration) => {
    //RANDOM BETWEEN -15 AND 15
    const newRotation =
      Math.random() * 2 * (Math.round(Math.random()) ? 1 : -1);
    animate({
      fromValue: initialRotation,
      toValue: newRotation,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/ROTATION", payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleScale = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "CHANGE/SCALE", payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleMouseEnter = () => {
    handleScale(0.8, 1, 500);
    handleOpacity(0, 1, 100);
    handleRotation(state.rotationPosition, 500);
    listItem.current.addEventListener("mousemove", parallax);
    dispatch({ type: "MOUSE/ENTER" });
    setSize("medium");
  };

  const handleMouseLeave = () => {
    listItem.current.removeEventListener("mousemove", parallax);
    handleOpacity(1, 0, 0);
    handleScale(0.8, initialState.scale, 500);
    handleRotation(state.rotationPosition, 500);
    dispatch({ type: "MOUSE/COORDINATES", payload: initialState.parallaxPos }); // REMOVE THIS //
    dispatch({ type: "MOUSE/LEAVE" });
    setSize("small");
  };

  return (
    <>
      <span className="lines"></span>
      <li ref={listItem} className="project-item-container">
        <Title
          page={project.page}
          title={project.title}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <ImagePro
          id={project.id}
          page={project.page}
          url={project.url}
          opacity={state.opacity}
          parallaxPos={state.parallaxPos}
          scale={state.scale}
          rotationPosition={state.rotationPosition}
        />
        <Info
          itemIndex={itemIndex}
          id={project.id}
          page={project.page}
          project={project.info}
          opacity={state.opacity}
        />
      </li>
    </>
  );
};

export default ProjectItem;
