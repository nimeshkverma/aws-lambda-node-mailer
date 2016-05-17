# aws-lambda-node-mailer

![alt CoverPic](https://github.com/nimeshkverma/aws-lambda-node-mailer/blob/master/images/cover_pic.jpg)

AWS-Lambda-Node-Mailer contains NodeJs scripts to send Emails via AWS Lambda services using Nodemailer package. The scripts are provided for both SMTP and SES.

## Prerequisites
- A working AWS Lambda account
- `node` , amazon supports lambdas in node version 4.3
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [nodemailer-smtp-transport](https://github.com/nodemailer/nodemailer-smtp-transport) or [nodemailer-smtp-transport](https://github.com/andris9/nodemailer-ses-transporte)
- [ejs](https://www.npmjs.com/package/ejs)
- [jsonschema](https://www.npmjs.com/package/jsonschema)

## Usage

1. Clone the repository move into any of the two directory `smtp_emailer` or `ses_emailer` according to your need, then execute below:

    `npm install`

2. Provide the neccesary credentials in `config.js`

3. Provide the template for the email, for eg presently the template being used is `template_type_1.ejs`, don't forget to provide the path of the template in the `config.js`

4. Provide the schema for the payload, for eg presently the payload being used is `template_type_1.json`, don't forget to provide the path of the template in the `config.js`

5. Once above is done, provide correct values in place of dummy values in `test.js`, then execute below:

    `node test.js`

## How to Contribute

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull RequestThe scripts in this
