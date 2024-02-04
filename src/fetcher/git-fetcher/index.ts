const { Octokit } = require("@octokit/rest");

export interface FetchEnvFileParam {
  token: string;
  owner: string;
  repo: string;
  path: string;
}

export async function fetchEnvFile(param: FetchEnvFileParam) {
  const octokit = new Octokit({
    auth: param.token,
  })

  try {
    const content =
      await octokit.rest.repos.getContent( {
        owner: param.owner,
        repo: param.repo,
        path: param.path
      });
    const contentData = content.data.content;
    return decodeContent(contentData);
  } catch (error) {
    console.log('error', error)
  }
}

function decodeContent(content: string) {
  return Buffer.from(content, 'base64').toString('utf8');
}

