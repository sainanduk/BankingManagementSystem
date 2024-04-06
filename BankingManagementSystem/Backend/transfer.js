
const { User } = require('./db');

async function transfer(req, res) {
    try {
        const body = req.body;
        const user = req.session.user;
        console.log(body);
        console.log(user);
        const available_balance = user.balance;

        if (!user) {
            res.json({
                problem: "session time out"
            });
            return;
        }

        if (body.amount > available_balance) {
            res.json({
                error: "insufficient funds"
            });
            return;
        }

        if (user.sentotp == body.otp) {
            const senderbalance = user.balance - body.amount;
            const sender = await User.findOneAndUpdate({ customerid: user.customerid }, { $set: { balance: senderbalance } });
            const receiver = await User.findOne({ AccountNumber: body.accountnumber });
            let receiver_balance = receiver.balance + parseInt(body.amount);
            const received = await User.updateOne({ AccountNumber: body.accountnumber }, { balance: receiver_balance });
            res.send({
                message: "transfer successful",
                available_balance: senderbalance,
                receivedby: `${receiver.AccountNumber},${receiver.fullName}`
            });
            return;
        } else {
            res.json({
                error: "incorrect otp"
            });
            return;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An unknown error occurred" });
    }
}

module.exports = transfer;
