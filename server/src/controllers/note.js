const { response } = require('express')
const { activity } = require('../../models')

exports.addTodo = async (req, res) => {
    const data = req.body

    try {
        const newTodo = await activity.create({
            title: data.title,
            status: 'unchecked'
        })

        res.send({
            status: 'success',
            data: {
                newTodo
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const data = await activity.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const { id } = req.params
        const data = await activity.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.updateCheck = async (req, res) => {
    try {
        // const data = req.body
        const { id } = req.params
        const response = await activity.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        if(response.dataValues.status == 'checked'){
            const updateData = {
                status:"unchecked"
            }
            await activity.update(updateData, {
                where: {
                    id
                }
            })
        }else{
            const updateData = {
                status:"checked"
            }
            await activity.update(updateData, {
                where: {
                    id
                }
            })
        }

        const updated = await activity.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                updated
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params

        await activity.update(data, {
            where: {
                id
            }
        })

        const updated = await activity.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                updated
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}



exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        await activity.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            data: {
                id
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}