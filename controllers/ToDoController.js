
const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    try {
        const toDo = await ToDoModel.find();
        res.send(toDo);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.saveToDo = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required in the request body' });
        }

        const newToDo = await ToDoModel.create({ text });
        console.log("Added Successfully...");
        console.log(newToDo);
        res.send(newToDo);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.updateToDo = async(req, res)=>{
    const {_id, text} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=> res.send("Updated Successfully"))
    .catch((err)=> console.log(err))
}

module.exports.deleteToDo = async(req, res)=>{
    const { _id } = req.body;
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("Deleted Successfully"))
    .catch((err)=> console.log(err))
}