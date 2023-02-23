const express = require("express");
const router = express.Router();
const List = require("../../models/List.model");
const User = require("../../models/User.model");
const Ingredient = require("../../models/Ingredient.model");
const Category = require("../../models/Category.model");
const Unit = require("../../models/Unit.model");
const { isLoggedIn } = require("../middlewares/auth");

// Route prefix : /lists

router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        // display all lists
        res.locals.navbar.link = "/lists/create";

        const user = req.session.currentUser.id;
        const userLists = await List.find({
            $and: [{ template: { $ne: true } }, { user: user }],
        });
        res.render("lists/list-of-lists", { userLists });
    } catch (error) {
        next(error);
    }
});

router.get("/create", (req, res, next) => {
    try {
        res.locals.navbar.link = `/lists`;
        res.locals.scripts = ["/js/list-edit.js"];
        res.locals.list = {
            name: "New List",
        };

        res.render("lists/list-edit");
    } catch (error) {
        next(error);
    }
});

router.post("/create", (req, res, next) => {
    try {
        res.locals.navbar.link = `/lists`;
        res.locals.scripts = ["/js/list-edit.js"];
        res.locals.list = {
            name: "New List",
        };

        res.render("lists/list-edit");
    } catch (error) {
        next(error);
    }
});

router.get("/:listId", async (req, res, next) => {
    // display list details
    try {
        res.locals.navbar.icon = "fa-regular fa-pen-to-square";
        res.locals.navbar.link = `/lists/edit/${req.params.listId}`;
        res.locals.scripts = ["/js/list-details.js"];

        // #TODO aggregate with mongoose
        const list = await List.findById(req.params.listId)
            .populate({
                path: "rows.unit",
                model: Unit,
            })
            .populate({
                path: "rows.ingredient",
                model: Ingredient,
                populate: { path: "category", model: Category },
            });

        res.render("lists/list-details", { list });
    } catch (error) {
        next(error);
    }
});

router.get("/edit/:listId", async (req, res, next) => {
    try {
        res.locals.navbar.icon = "fa-solid fa-check";
        res.locals.navbar.link = `/lists/${req.params.listId}`;
        res.locals.scripts = ["/js/list-edit.js"];

        // #TODO aggregate with mongoose
        const list = await List.findById(req.params.listId)
            .populate({
                path: "rows.unit",
                model: Unit,
            })
            .populate({
                path: "rows.ingredient",
                model: Ingredient,
                populate: { path: "category", model: Category },
            });

        res.render("lists/list-edit", { list });
    } catch (error) {
        next(error);
    }
});

router.patch("/edit/:listId", (req, res, next) => {
    // list edition form submission
    res.send(req.body);
});

router.post("/", (req, res, next) => {
    try {
        //create new list
    } catch (error) {
        next(error);
    }
});

module.exports = router;
