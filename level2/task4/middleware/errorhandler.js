// Global error handler
// 4 args hone hi chahiye (Express isse error handler maanta hai)

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
