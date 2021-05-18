const profileHandler = (req, res, db, bcrypt) => {
  const { id } = req.params;
  //  let found = false;
  // database.users.forEach( user =>{
  //   if( user.id === id ){
  //     found = true;
  //     return res.json(user);
  //   }
  // })
  // if(!found) {
  //     res.status(404).json('user not found')
  //   }
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.start(400).json('user not found');
      }
    })
    .catch((err) => res.status(400).json('error in getting user'));
};
module.exports = {
  profileHandler: profileHandler
};
