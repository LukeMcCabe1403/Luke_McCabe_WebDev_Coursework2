const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/", controller.landing_page);
router.get('/restaurant', controller.entries_list);
router.get('/new', verify,  controller.new_entries);
router.post('/new', controller.post_new_entry);

router.get('/about', controller.show_about);

router.get('/posts/:menu', controller.show_menu_entries);

router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/login', controller.show_login);

router.post('/login', login, controller.handle_login);

router.get('/dinner', controller.dinner_entries);

router.get('/lunch', controller.lunch_entries);

router.get("/logout", verify, controller.logout);

router.get("/loggedIn", verify, controller.loggedIn_landing);

//router.patch('/posts/:name', verify, controller.show_name_entries);

//router.delete('/', controller.delete_entry);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;