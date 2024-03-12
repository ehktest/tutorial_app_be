module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;
  console.error(`Error : ${(err?.cause ?? err?.message ?? err?.stack) || err}`);
  res.status(statusCode).send({
    error: true,
    code: statusCode,
    body: req?.body,
    message: err?.message,
    cause: err?.cause,
    stack: err?.stack,
  });
};
