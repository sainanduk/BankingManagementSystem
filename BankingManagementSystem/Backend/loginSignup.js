

const { User, Account } = require('./db');

async function signup(req, res) {
    try {
        const body = req.body;
        const details = await User.findOne({ email: body.email });
        const accinfo = await Account.findOne({ Accountid: "acno" });

        body.AccountNumber = accinfo.AccountNumber;
        body.customerid = accinfo.customer_code + accinfo.customer_id;

        const updated = await Account.findOneAndUpdate(
            { Accountid: 'acno' },
            { $set: { AccountNumber: accinfo.AccountNumber + 1, customer_id: accinfo.customer_id + 1 } },
            { new: true }
        );

        const newUser = await User.create(body);

        res.json({ "AccountNumber": accinfo.AccountNumber, "customer_id": accinfo.customer_id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal server error." });
    }
}

async function login(req, res) {
    try {
        const body = req.body;
        console.log(body);
        console.log(req.session.user.sentotp);

        if (req.session.user.sentotp == body.otp) {
            const user = await User.findOne({
                customerid: body.customerid,
                password: body.password
            });
            console.log(user);
            req.session.user = user;
            if (user) {
                res.render("dashboard", { user: user });
                return;
            }
        }

        res.status(411).json({ message: "Incorrect credentials" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = { signup, login };
