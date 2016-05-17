"use strict";

var exports = require('./exports');

var template_type_1_payload = {
    "payload": {
        "emailDetails": {
            "from": 'from@dummycompany.com',
            "to": ['to1.bangotra@dummycompany.com', 'to2.bangotra@dummycompany.com'],
            "subject": 'My AWS Lambda Simple Emailer',
            "html": '',
            "cc": ['cc1.verma@dummycompany.com', 'cc2.verma@dummycompany.com'],
            "bcc": ['bcc1.gour@dummycompany.com', 'bcc2.gour@dummycompany.com'],
            "emailType": 'template_type_1',
            "attachments": [{
                "filename": 'attachment_name_1',
                "path": 'https://url_for_attachment'
            }]
        },
        "params": {
            "firstName": "Nimesh",
            "companyName": "dummycompany",
        }
    }
}

var context = {
    fail: function(x) { console.log(" Fail " + x) },
    succeed: function(x) { console.log(" Success " + x) }
}

exports.sendEmail(template_type_1_payload, context, {})