const nedb = require('nedb');

class Restaurant {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            menu: 'dinner',
            name: 'Garlic Bread',
            ingredients: 'Bread, Garlic, Butter',
            allergyAdvice: 'Contains Gluten',
            price: '£2.00',
        });
        //for later debugging
        console.log('db entry Garlic Bread inserted');
    
        this.db.insert({
            menu: 'lunch',
            name: 'Cheese and Crackers',
            ingredients: 'Cheese, Crackers',
            allergyAdvice: 'Contains Gluten, Contains Dairy',
            price: '£1.50',
        });
        //for later debugging
        console.log('db entry Cheese and Crackers inserted');
    }

    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }  
    getDinnerEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(menu:'Dinner) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ menu: 'dinner'}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getDinnerEntries() returns: ', entries);
                 }
            })
        })
    }

    getLunchEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(menu:'Dinner) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ menu: 'lunch'}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getDinnerEntries() returns: ', entries);
                 }
            })
        })
    }

    addEntry(menu, name, ingredients, allergyAdvice, price) {
        var entry= {
            menu: menu,
            name: name,
            ingredients: ingredients,
            allergyAdvice: allergyAdvice,
            price: price,
        }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
            if(err) {
                console.log('Error inserting document', name)
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    getEntriesByMenu(menuName){
        return new Promise((resolve, reject) => {
            this.db.find({'menu': menuName}, function(err, entries){
                if(err) {
                    reject(err);
                } else{
                    resolve(entries);
                    console.log('getEntriesByMenu returns: ', entries);
                }
            })
        })
    }

    updateEntries(){
        return new Promise((resolve, reject) => {
            this.db.findOne({'name': name}, function(err, entries){
                if(err){
                    reject(err);
                }else {
                    resolve(entries);
                    console.log('getSingleEntry returns', entries);
                }
            })
        })
    }
      
}//END OF CLASS
//make the module visible outside
module.exports = Restaurant;