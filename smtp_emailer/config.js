var config = {};

SMTP Credentials and Connection Details
config.SMTP = {
        host: "your_host_name",
        port: 25,
        auth: {
            user: "your_user_name",
            pass: "your_password"
        }
    }
    // Mapping if SchemaName and Paths of template and schema
config.schemaMapping = {
    "template_type_1": {
        "templatePath": "./template_type_1.ejs",
        "schemaPath": "./template_type_1.json",
    }
}
module.exports = config;