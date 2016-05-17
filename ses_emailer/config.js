var config = {};

// SES Credentials and Connection Details
config.SES = {
        accessKeyId: 'your_accessKeyId',
        secretAccessKey: 'your_secretAccessKey'
    }
    // Mapping if SchemaName and Paths of template and schema
config.schemaMapping = {
    "template_type_1": {
        "templatePath": "./template_type_1.ejs",
        "schemaPath": "./template_type_1.json",
    }
}
module.exports = config;