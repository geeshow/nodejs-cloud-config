import {FetchEnvGitParam, GitFetcher} from "./index";
import {parseKeyValueFormat} from "../../utils/parser"; // 경로는 실제 파일 위치에 따라 변경해야 합니다.

jest.mock("../../utils/node/url-reader", () => {
  return {
    getUrlContent: jest.fn().mockResolvedValue(`
        {
          "sample":"response",
          "content":"${Buffer.from("KEY=VALUE", "utf8").toString("base64")}"
        }
    `)
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
    expect(result.KEY).toBe("VALUE");
  });
});
