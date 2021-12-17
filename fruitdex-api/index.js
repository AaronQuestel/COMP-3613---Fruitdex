
const express = require('express')
const cors = require('cors')
const http = require('http')
const config = require('./utils/config')

const app = express()

app.use(express.json())
app.use(cors())

//Get all images from firestore
app.get("/", async (req, res) => {
    const snapshot = await config.Images.get();
    res.send(snapshot.docs);
});

//get all posts by users
app.get("/posts", (req, res) => {
    config.Posts.orderBy('createdAt', 'desc').get().then((data) => {
        let posts = [];
        data.forEach((doc) => {
            posts.push({
                postId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(posts);
    })
    .catch((err) => console.error(err));
});

//Create a user in this route
app.post("/register", async (req, res) => {
    const newUser = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString(),
        img: req.body.postImages
    };
    config.projectFirestore
        .collection('posts')
        .add(newUser)
        .then(doc =>{
            res.json({ message: `document ${doc.id} created successfully`});

        })
        .catch(error => {
            res.status(500).json({ error: 'Something went wrong creating user' });
            console.log(error);
        })
})


//helper functions for the Signup route

const isEmail = (email) => {
    const EMAIL_REGEX = /^[\w\.]+@[\w\.]+$/;
    if(email.match(EMAIL_REGEX)){
        return true;
    }
    return false;
}
const isEmpty = (string) => {
    if(string.trim() === '') {
        return true;
    }
    return false;
}

//Signup User route
app.post("/signup", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
        phone: req.body.phone,
        name: req.body.name,
        photoURL: req.body.photo,
    };

    let errors = {};

    if(isEmpty(newUser.email)){
        errors.email = 'Must not be empty'
    } else if(!isEmail(newUser.email)) {
        errors.email = 'Must be a valid address'
    }

    if(isEmpty(newUser.password)){
        errors.password = 'Must not be empty'
    }
    if(newUser.password !== newUser.confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }
    if(isEmpty(newUser.handle)){
        errors.handle = 'Must not be empty'
    }


    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    // TODO Validate user
    let token, userId;
    config.projectFirestore.doc(`/users/${newUser.handle}`).get()
    .then((doc) => {
        if(doc.exists){
            return res.status(400).json({ handle: 'This handle is already taken' });
        } else {
            return config.admin.auth().createUser({
                email: newUser.email,
                emailVerified: false,
                phoneNumber: newUser.phone,
                password: newUser.password,
                displayName: newUser.name,
                photoURL: newUser.photoURL,
                disabled: false,
            })
        }
    }).then((data) => {
        //returning an access token
        //userId = data.user.uid;

        console.log(`Successfully created new user: ${data.uid}`);
        userId = data.uid;
        return config.admin.auth().createCustomToken(data.uid);

    }).then((userToken) => {
        token = userToken;
        const userCreds = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        };
        return config.projectFirestore.doc(`/users/${newUser.handle}`).set(userCreds);
    }).then(() => {
        return res.status(201).json({ token });
    }).catch((err) => {
        console.error(err);
        if(err.code === 'auth/email-already-exists'){
            return res.status(400).json({ email: 'Email is already in use' });
        }else{
            return res.status(500).json({ error: err.code });
        }
        
    });

    
})

//We can handle the login of a user on the client side

const server = http.createServer(app)

server.listen(3003, () => {
    console.log('Server running on port 3003')
})