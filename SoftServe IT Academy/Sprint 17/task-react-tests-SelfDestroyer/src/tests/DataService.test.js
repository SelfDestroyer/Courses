import axios from "axios";
import getGitHubUser from "../services/DataService/index";

// TODO: Your test need to be here instead of fake tests

jest.mock("axios");

describe("Test servives", () => {
  const someData = {
    login: "user1",
    id: "123123",
  };

  let response;

  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: someData }));
  });

  it("should call axios.get 1 time", async () => {
    response = await getGitHubUser("vova");
    expect(axios.get).toBeCalledTimes(1);
  });

  it("should test services zxios request with some github data", async () => {
    response = await getGitHubUser("vova");
    expect(response.data.login).toMatch("user1");
  });
});
