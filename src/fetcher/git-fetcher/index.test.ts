import { Octokit } from "@octokit/rest";
import { fetchEnvFile } from "./index"; // 경로는 실제 파일 위치에 따라 변경해야 합니다.

jest.mock("@octokit/rest", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return {
        repos: {
          getContent: jest.fn().mockResolvedValue({
            data: {
              content: Buffer.from("mock content", "utf8").toString("base64"),
            },
          }),
        },
      };
    }),
  };
});



describe('git-fetcher', () => {
  it('should fetch env file from git', async () => {
    const params = {
      token: "mock_token",
      owner: "mock_owner",
      repo: "mock_repo",
      path: "mock_path",
      branch: "mock_branch",
    };
    
    const result = await fetchEnvFile(params);
    expect(Octokit).toHaveBeenCalledWith({ auth: params.token });
    expect(result).toBe("mock content");
  });
});
