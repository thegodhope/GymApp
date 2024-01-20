const successResponse = (res, data, statusCode, message, accessToken) => {
  return res
    .status(statusCode)
    .json({ message, data, accessToken, status: true });
};

const errorResponse = (res, statusCode, error) => {
  return res.status(statusCode).json({ error, status: true });
};

module.exports = { successResponse, errorResponse };
