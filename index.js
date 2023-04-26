const core = require("@actions/core");
const axios = require('axios')

const getParameters = () => {
    const jiraBaseUrl = core.getInput('JIRA_BASE_URL')
    const jiraIssueKey = core.getInput('JIRA_ISSUE_KEY_OR_ID')
    const jiraEpicId = core.getInput('JIRA_EPIC_ID')
    const jiraToken = core.getInput('JIRA_TOKEN')
    const jiraEmail = core.getInput('JIRA_EMAIL')
    return {
        jiraBaseUrl,
        jiraIssueKey,
        jiraEpicId,
        jiraToken,
        jiraEmail
    }
}


const exec = async () => {
    const { jiraBaseUrl, jiraIssueKey, jiraEpicId, jiraToken, jiraEmail } = getParameters()

    const url = `${jiraBaseUrl}/rest/api/3/issue/${jiraIssueKey}`;

    const data = {
        "fields": {
            "parent": {
                "key": jiraEpicId
            }
        }
    };



    return axios
        .put(url, data, {
            auth: {
                username: jiraEmail,
                password: jiraToken,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })


}

exec().then((output) => core.setOutput('results', output)).catch(err => core.setFailed(err.message))
