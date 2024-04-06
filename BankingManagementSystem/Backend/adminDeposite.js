
const { Admin, User } = require('./db');

async function admin(req, res) {
    try {
        const body = req.body;
        const adminDetails = await Admin.findOne({ id: body.id, password: body.password });
        
        if (adminDetails) {
            res.render("deposite");
            return;
        }
        
        res.json({ error: "Invalid credentials" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal server error." });
    }
}

async function deposite(req, res) {
    try {
        const body = req.body;
        const deposite = await User.findOne({ AccountNumber: body.accountnumber });
        
        const updatedbalance = deposite.balance + parseInt(body.amount);
        
        const updated = await User.updateOne(
            { AccountNumber: body.accountnumber },
            { balance: updatedbalance }
        );

        res.json({
            successful: true,
            AccountNumber: deposite.accountnumber,
            name: deposite.fullName,
            amount: body.amount
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = { admin, deposite };
