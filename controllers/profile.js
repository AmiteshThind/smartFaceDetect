const handleProfile = (req,res,database) =>{
    const userID = req.params.userid;//lets us find the value of userid (which is stored as part of user object)
    
    database.select('*').from('users').where({
        id:userID
    }).then(user =>{console.log(user[0])})
      .catch(err =>res.json(err))
}

module.exports=({
handleProfile:handleProfile
}) 