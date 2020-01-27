const handleRegister= (req,res,database,bcrypt) =>{
         
       const hash = bcrypt.hashSync(req.body.password,10);    

        database.transaction(trx =>{
            trx.insert({
                hash:hash,
                 email:req.body.email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:req.body.name,
                    joined:new Date()
                })
                .then(user =>{
                    res.json(user[0]);
                })
            })
        .then(trx.commit)
        .catch(trx.rollback)
        })
      

        .catch(err => res.status('400').json('Unable to register'));
    }

    module.exports ={
        handleRegister:handleRegister
    }