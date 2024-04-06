module.exports = function setupGetRoutes(app) {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/dashboard", (req, res) => {
        res.render("dashboard");
    });

    app.get("/transfer", (req, res) => {
        res.render("transfer");
    });

    app.get("/admin", (req, res) => {
        res.render("admin");
    });
};
