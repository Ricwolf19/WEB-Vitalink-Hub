import { createContext, useContext, useReducer, useMemo, ReactNode, Dispatch } from "react";
import PropTypes from "prop-types";

interface State {
  openSidenav: boolean;
  sidenavColor: any;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: any;
  openConfigurator: boolean;
}

type Action =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

export const MaterialTailwind = createContext<[State, Dispatch<Action>] | null>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "OPEN_SIDENAV": {
        return { ...state, openSidenav: action.value };
      }
      case "SIDENAV_TYPE": {
        return { ...state, sidenavType: action.value };
      }
      case "SIDENAV_COLOR": {
        return { ...state, sidenavColor: action.value };
      }
      case "TRANSPARENT_NAVBAR": {
        return { ...state, transparentNavbar: action.value };
      }
      case "FIXED_NAVBAR": {
        return { ...state, fixedNavbar: action.value };
      }
      case "OPEN_CONFIGURATOR": {
        return { ...state, openConfigurator: action.value };
      }
      default: {
        return state; // Simply return the unchanged state for unknown actions
      }
    }
  }

interface MaterialTailwindControllerProviderProps {
  children: ReactNode;
}

export function MaterialTailwindControllerProvider({ children }: MaterialTailwindControllerProviderProps) {
    const initialState: State = {
      openSidenav: false,
      sidenavColor: "dark",
      sidenavType: "white",
      transparentNavbar: true,
      fixedNavbar: false,
      openConfigurator: false,
    };
  
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo<[State, Dispatch<Action>]>(() => [controller, dispatch], [controller]);
  
    return (
      <MaterialTailwind.Provider value={value}>
        {children}
      </MaterialTailwind.Provider>
    );
  }

export function useMaterialTailwindController() {
  const context = useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "MaterialTailwindControllerProvider";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: Dispatch<Action>, value: string) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: Dispatch<Action>, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch: Dispatch<Action>, value: boolean) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
