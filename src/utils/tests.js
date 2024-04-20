import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppContext } from "../context/index";

export const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  );
};
