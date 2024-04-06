const { generateOTP, sendEmail } = require("./otp");
const { User } = require('./db');

function setupGenerateOTP(app) {
    app.post("/generateotp", async (req, res) => {
        try {
            const sentotp = generateOTP();
            const body = req.body;
            req.session.user = { sentotp: sentotp };
            console.log(body);
            const useremail = await User.findOne({ customerid: body.customerId });

            if (useremail) {
                sendEmail(sentotp, useremail.email);
                res.status(200).json({ message: "OTP generated and sent successfully." });
            } else {
                res.status(404).json({ error: "User not found." });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error." });
        }
    });

    app.post("/generatetransferotp", async (req, res) => {
        try {
            const sentotp = generateOTP();
            req.session.user.sentotp = sentotp;
            if (req.session.user.email) {
                sendEmail(sentotp, req.session.user.email);
                res.status(200).json({ message: "OTP generated and sent successfully." });
            } else {
                res.status(404).json({ error: "session timeout" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Internal server error." });
        }
    });
}

module.exports = setupGenerateOTP;
