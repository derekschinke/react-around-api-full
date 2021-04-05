function handleError(err, res, model) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: `Bad Request: invalid ${model} creation data passed`,
    });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: `Not Found: ${model} not found` });
  }
  return res.status(500).send({ message: 'Internal Server Error' });
}

module.exports = handleError;
