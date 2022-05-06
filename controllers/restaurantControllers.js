const restaurantDAO = require('../models/restaurantModel');
const userDAO = require("../models/userModel.js");
const db = new restaurantDAO();

db.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
    db.getAllEntries();
}
exports.landing_page = function(req, res) {
  db.getAllEntries().then((list) => {
      res.render('entries', {
        'title': 'Restaurant',
        'entries': list
      });
      console.log('promise resolved');
  })
  .catch((err) => {
      console.log('promise rejected', err);
  })
}

exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if(!req.body.menu){
        response.status(400).send("entries must have a menu to be placed in");
        return;
    }
    db.addEntry(req.body.menu, req.body.name, req.body.ingredients, req.body.allergyAdvice, req.body.price);
    res.redirect('/loggedIn');
}

exports.new_entries = function(req, res) {
    res.render('newEntry', {
        'title': 'Restaurant',
        'user': 'user'
    })
}

exports.dinner_entries = function(req, res) {
    console.log('filtering menu items', req.params.menu)
    let menuType = req.params.menu;
    db.getDinnerEntries(menuType).then(
        (entries) => {
            res.render('entries', {
                'title': 'Restaurant',
                'entries': entries
            });
        }).catch((err) => {
            console.log('error handling dinner posts', err);
        });
}

exports.lunch_entries = function(req, res) {
    console.log('filtering menu items', req.params.menu)
    let menuType = req.params.menu;
    db.getLunchEntries(menuType).then(
        (entries) => {
            res.render('entries', {
                'title': 'Restaurant',
                'entries': entries
            });
        }).catch((err) => {
            console.log('error handling lunch posts', err);
        });
}

exports.show_menu_entries = function(req, res) {
    console.log('filtering menu items', req.params.menu)
    let menuType = req.params.menu;
    db.getEntriesByMenu(menuType).then(
        (entries) => {
            res.render('entries', {
                'title': 'Restaurant',
                'entries': entries
            });
        }).catch((err) => {
            console.log('error handling menu posts', err);
        });
}

exports.show_register_page = function(req, res) {
    res.render("user/register");
};

exports.show_about = function (req, res) {
    res.render("user/about");
};

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if(!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDAO.lookup(user, function(err, u) {
        if(u) {
            res.redirect('/register');
            return;
        }
        userDAO.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
    });
};

exports.show_login = function(req, res) {
    res.render("user/login");
};

exports.handle_login = function (req, res) {
    res.render("newEntry", {
        title: "Restaurant",
        user: "user"
    });
};

exports.logout = function (req, res) {
    res
    .clearCookie("jwt")
    .status(200)
    .redirect("/");
}

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries().then((list) => {
        res.render("entries", {
            title: "Restaurant",
            entries: list,
            user: "user"
        });
        console.log("promise resolved");
    })
    .catch((err) => {
        console.log("promise rejected", err);
    });
}

exports.update_entry = function (req, res) {
    db.updateEntries().then((list) => {
        res.render("entries", {
            title: "Restaurant",
            entries: list,
            user: "user"
        });
        console.log("promise resolved");
    })
    .catch((err) => {
        console.log("promise rejected", err);
    });
}