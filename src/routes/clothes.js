'use strict'

const express = require('express')
const GenericCollection = require('../models/generic-collections.js')
const clothesModel = require('../models/clothes-schema.js')
const clothesRouter = express.Router()
console.log('clothes model', clothesModel);
const clothes =  new GenericCollection(clothesModel)


clothesRouter.get('/clothes',getAll)
clothesRouter.get('/clothes/:id',getOne)
clothesRouter.post('/clothes',createItem)
clothesRouter.put('/clothes/:id',updateItem)
clothesRouter.delete('/clothes/:id',deleteItem)

async function getAll(req,res){
    let items = await clothes.read()
    res.status(200).json(items)
}

async function getOne(req,res){
    let id = req.params.id
    let item = await clothes.read(id)
    res.status(200).json(item)
}

async function createItem(req,res){
    let data = req.body
    let createItem = await clothes.create(data)
    res.status(201).json(createItem)
}

async function updateItem(req,res){
    let id = req.params.id
    let data =req.body
    let updateItem = await clothes.update(id,data)
    res.status(200).json(updateItem)
}

async function deleteItem(req,res){
    let id = req.params.id
    await clothes.delete(id)
    res.status(200).json({msg:'deleted!'})
}

module.exports = clothesRouter