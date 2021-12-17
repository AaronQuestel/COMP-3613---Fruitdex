# Setup

## Application Makeup

- Using firebase as a backend to hold the user information and to store images
- Using redux to manage application wide state
- Using React for the frontend Library
- Material UI or Materialize (May or may not be used)
- Express js to make code cleaner group code seperate routes properly
- Using Redux

## Example code to store data to a typical firestore

```javascript
app.post('/create',async (req,res)=>{
  let docRef=db.collection('user').doc(req.body.user.name)
  await docRef.set({
    email: req.body.user.email,
    password: req.body.user.password,
  });
   res.json({message:'done'});
})

```

```javascript
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

```
