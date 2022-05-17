import React from "react";
import TestRenderer from "react-test-renderer";
import App from "../components/App";

describe("Test component App", () => {
  let componentApp;
  beforeEach(() => {
    componentApp = TestRenderer.create(<App />);
  });

  it("Render corectly", () => {
    expect(componentApp.toJSON()).toMatchSnapshot();
  });

  it("Check type", () => {
    expect(componentApp.toJSON().type).toBe("div");
  });
});
