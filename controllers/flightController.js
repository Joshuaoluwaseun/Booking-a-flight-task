const { flightModel } = require('../models/Flight')
const Joi = require('joi');

exports.getFlight = (req, res) => {
    res.status(200).send(flightModel)
}

exports.getOneFlight = (req, res) => {
    const flight = flightModel.find(c => c.id === parseInt(req.params.id));
    if (!flight) return res.status(404).send('The flight with the given ID was not found.');
    res.send(flight);
}

exports.postFlight = (req, res) => {
    const { error } = validateFlight(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const date = new Date()

    const newFlight = {
      id: flightModel.length + 1,
      title: req.body.title,
      time: date.toTimeString(),
      price: req.body.price,
      date: date.toDateString()
    }
    flightModel.push(newFlight)
    res.status(200).send(newFlight)
}

exports.updateFlight = (req, res) => {
    const flight = flightModel.find(c => c.id === parseInt(req.params.id));
    if (!flight) return res.status(404).send('The flight with the given ID was not found.');
  
    const { error } = validateFlight(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    flight.title = req.body.title; 
    flight.price = req.body.price; 
    res.send(flight);
}

exports.deleteFlight = (req, res) => {
    const flight = flightModel.find(c => c.id === parseInt(req.params.id));
    if (!flight) return res.status(404).send('The flight with the given ID was not found.');
  
    const index = flightModel.indexOf(flight);
    flightModel.splice(index, 1);
  
    res.send(flight);
}

function validateFlight(flight) {
    const schema = {
      title: Joi.string().min(3).required(),
      price: Joi.number().min(3).required()
    };
  
    return Joi.validate(flight, schema);
  }
  