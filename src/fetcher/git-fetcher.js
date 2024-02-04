const { Octokit } = require("@octokit/rest");

export async function fetchEnvFile(param) {
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

function decodeContent(content) {
  return Buffer.from(content, 'base64').toString('utf8');
}

