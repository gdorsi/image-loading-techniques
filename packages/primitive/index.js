let { execSync } = require("child_process");

module.exports = (input, output, shapes=10) => {
    return execSync(`primitive -i ${input} -o ${output} -n ${shapes}`, { env: process.env });
};
