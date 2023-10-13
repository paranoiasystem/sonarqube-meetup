const path = require('path');

module.exports = function(results) {
    const summary = {issues: []};
    results.forEach(function(result) {
        result.messages.forEach(function(msg) {
            const ruleDocsUrl = `https://github.com/paranoiasystem/sonarqube-meetup/blob/main/eslint-plugin-my-meetup-rules/docs/${msg.ruleId.replace('my-meetup-rules/', '')}.md`;  // Genera l'URL della documentazione
            
            const absolutePath = result.filePath;
            const relativePath = path.relative(__dirname, absolutePath);
            const correctedPath = relativePath.replace('../', '');

            const logMessage = {
                engineId: "eslint",
                ruleId: msg.ruleId,
                primaryLocation: {
                    message: roleDocsUrl,
                    // message: msg.message,
                    filePath: correctedPath,
                    textRange: {
                        startLine: msg.line,
                        endLine: msg.endLine,
                        endColumn: msg.endColumn
                    }
                }
            };

            // The log message type and severity is up to you but you need to take in consideration SonarQube properties
            if (msg.severity === 1) {
                logMessage.type = "CODE_SMELL";
                logMessage.severity = "INFO";
            }
            if (msg.severity === 2) {
                logMessage.type = "BUG";
                logMessage.severity="MAJOR";
            }
            summary.issues.push(logMessage);
        });
    });
    return JSON.stringify(summary);
}