const ENV = process.env.ENV
const baseUrl = require('../../Config/Config')
class EmailReporter {

    async emailReporter() {

        let username = 'lp_automation@byjus.com'
        let toList = 'sowmya.chandrasekaran@byjus.com,lp_automation@byjus.com'
        const password = 'bvjikduntydbuxad'
        var nodemailer = require('nodemailer')
        const filesData = [{ name: 'ExecutionReport.png', path: './testRunScreenshot/ExecutionReport.png', cid: 'ExecutionReport' }, { name: 'logo.jpg', path: './utils/Notifiers/logo.jpg', cid: 'Logo' }]
        const attachments = filesData.map((file) => {
            return { filename: file.name, path: file.path, cid: file.cid };
        });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: username,
                pass: password
            }
        })

        let runId = require('../Testrail/suitDetails.json')
        let runName = require('../Testrail/testRunNameDetails.json')
        runId = parseInt(runId)
        const testRunLink = `https://tnl.testrail.io/index.php?/runs/view/${runId}`
        async function sendMail() {
            let sendResult = await transporter.sendMail({
                from: username,
                to: toList,
                subject: `${runName}`,

                html:

                    `<h3>Testrail Link:${testRunLink}</h3>

<h3> Executed Environment:${ENV}</h3>

<h3>URL used for Execution:${baseUrl[ENV]}learn</h3>

<h3>Execution Report :<h3>

<img src="cid:ExecutionReport"/>

<h4>Thanks and Regards,</h4>
<h4>LP-Automation , Byjus</h4>
<img src="cid:Logo"/>`,



                attachments: attachments
            })
            console.log(sendResult)
            console.log("Mail sent Sucesssfully")
        }
        await sendMail().catch(err => console.error(err))
    }

}

export default new EmailReporter();