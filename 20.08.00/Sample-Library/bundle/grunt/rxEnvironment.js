module.exports = {
    variableRegex: /^\$([A-Z_]+)/,

    processConfigValue: function (value, environment) {
        var result = value;

        if (this.variableRegex.test(value)) {
            var matches = value.match(this.variableRegex),
                placeholder = matches[0],
                environmentVariableName = matches[1];

            var environmentVariableValue = environment[environmentVariableName];

            if (environmentVariableValue) {
                result = value.replace(placeholder, environmentVariableValue);
            } else {
                console.log('Environment variable ' + environmentVariableName + ' is not set.');
            }
        }

        return result;
    }
};