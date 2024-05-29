import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(e)
    }
}

let getMe = (req, res) => {
    return res.render('test/me.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('.............')
    // console.log(data)
    // console.log('.............')
    return res.render('displaycrud.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    //console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log('--------------')
        // console.log(userData);
        // console.log('--------------')

        //check userdata not found

        //let userdata
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        //  
        return res.send('user not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displaycrud.ejs', {
        dataTable: allUsers
    });

}
module.exports = {
    getHomePage: getHomePage,
    getMe: getMe,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}