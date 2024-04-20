import { screen } from "@testing-library/react";
import { customRender } from "../../utils/tests";
import Temperature from "./Temperature";

describe("Temperature", () => {
  test("renders value from state", async () => {
    const providerProps = {
      value: {
        weather: {
          current: {
            temp: 30,
          },
        },
      },
    };
    customRender(<Temperature />, { providerProps });

    expect(await screen.findByText(/30/i)).toBeInTheDocument();
  });

  test("renders -- if data is missing", async () => {
    const providerProps = {
      value: {
        weather: undefined,
      },
    };
    customRender(<Temperature />, { providerProps });

    expect(await screen.findByText(/--/i)).toBeInTheDocument();
  });
});
