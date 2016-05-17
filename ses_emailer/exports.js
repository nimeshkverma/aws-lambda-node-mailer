"use strict";

exports.sendEmail = function(event, context, callback) {
    var config = require('./config');
    var fs = require('fs');
    var _ = require('lodash');

    if (_validSchema(event.payload)) {
        var templatePath = config.schemaMapping[event.payload.emailDetails.emailType]["templatePath"]
        var emailHTML = _getHTML(templatePath, event.payload.params)
        if (emailHTML && templatePath) {
            _sendSESEmail(_emailParams(event.payload.emailDetails), emailHTML)
            console.log("After _sendSESEmail");
        } else
            context.fail(JSON.stringify(_setResponse(400, [{
                code: "01",
                source: "Email template or Email params in payload",
                message: "Please provide correct Email template and correct email params",
                detail: "Template path is provided via config and Params via Payload"
            }])));
    } else {
        context.fail(JSON.stringify(_setResponse(400, [{
            code: "02",
            source: "Payload schema",
            message: "Please provide correct schema to validate and a payload validating it",
            detail: "Payload is provided "
        }])));
    }

    function _validSchema(payload) {
        var schemaPath = config.schemaMapping[payload.emailDetails.emailType]["schemaPath"];
        var payloadVerification = _verifyPayload(payload, schemaPath);
        console.log(payloadVerification.valid);
        return payloadVerification.valid;
    }

    function _emailParams(emailDetails) {
        var details = {};
        details.to = _.join(emailDetails.to, ',');
        details.from = emailDetails.from;
        details.cc = _.join(emailDetails.cc, ',');
        details.bcc = _.join(emailDetails.bcc, ',');
        details.attachments = emailDetails.attachments;
        details.subject = emailDetails.subject;
        return details;
    }

    function _verifyPayload(payload, schemaPath) {
        var schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        var Validator = require('jsonschema').Validator;
        var verifier = new Validator();
        console.log(verifier.validate(payload, schema))
        return verifier.validate(payload, schema);
    }

    function _setResponse(status_code, error_list = []) {
        return {
            status: status_code,
            errors: error_list
        };
    }

    function _sendSESEmail(email, emailHTML) {
        var nodemailer = require('nodemailer');
        var sesTransport = require('nodemailer-ses-transport');
        var transporter = nodemailer.createTransport(sesTransport({
            accessKeyId: config.SES.accessKeyId,
            secretAccessKey: config.SES.secretAccessKey
        }));
        var success_callback = function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log("In callback of sendMail");
            context.succeed(JSON.stringify(_setResponse(200, [{
                code: "11",
                source: "Email template or Email params in payload",
                message: "Please provide correct Email template and correct email params",
                detail: "Template path is provided via config and Params via Payload"
            }])));

        }
        transporter.sendMail({
            from: email.from,
            to: email.to,
            cc: email.cc,
            bcc: email.bcc,
            attachments: email.attachments,
            subject: email.subject,
            html: emailHTML
        }, success_callback);
    }

    function _getHTML(templateFile, params) {
        var ejs = require('ejs');
        console.log({ params: params })
        var baseHTML = fs.readFileSync(templateFile, 'ascii');
        return ejs.render(baseHTML, { params: params });
    }
}