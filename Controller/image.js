const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: process.env.Hello_Api
   });

   const handleApiCall = (req , res) =>{
     app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
   }

const imageHandler = (req,res,db)=>{
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{
    res.json(entries[0]);
  })
  .catch(err =>res.status(400).json('wrong id enter'));

  //  found = false;
  // database.users.forEach(user =>{
  //   if(user.id === id){
  //     found = true;
  //     user.counter++;
  //     return res.json(user.counter);
  //   }
  // })
  // if(!found){
  //   res.status(404).json('user not found')
  // }
}
module.exports ={
  imageHandler  : imageHandler,
   handleApiCall : handleApiCall
}
