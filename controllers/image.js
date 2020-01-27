const handleImage = (req,res,database) =>{ //updates entries value and sends back the new value for the user 
    const{id} = req.body;
    
    database('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err=>{res.status(400).json('Unable to get entries')});
}

module.exports = ({
    handleImage:handleImage
})