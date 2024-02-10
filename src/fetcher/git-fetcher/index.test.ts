import { Octokit } from "@octokit/rest";
import {FetchEnvGitParam, GitFetcher} from "./index";
import {parseJsonFormat, parseKeyValueFormat} from "../../utils/parser"; // 경로는 실제 파일 위치에 따라 변경해야 합니다.

const mockResponse = {
  data: {
    content: Buffer.from("data=mock content", "utf8").toString("base64"),
  }
}
jest.mock("@octokit/rest", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return {
        repos: {
          getContent: jest.fn().mockResolvedValue(mockResponse),
        },
      };
    }),
  };
});

describe('GitFetcher', () => {
  it('should fetch env file from git', async () => {
    const parser = parseKeyValueFormat
    const params = {
      token: "mock_token",
      owner: "mock_owner",
      repo: "mock_repo",
      path: "mock_path",
      branch: "mock_branch",
    } as FetchEnvGitParam;
    
    const gitFetcher = new GitFetcher(params, parser);
    await gitFetcher.fetchConfigFromRemote();
    const result = gitFetcher.parseToMapData()
    expect(Octokit).toHaveBeenCalledWith({ auth: params.token });
    expect(result.data).toBe("mock content");
  });
});
