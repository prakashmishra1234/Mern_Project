const sendData = (data, statuscode, res, message) => {
  res.status(statuscode).json({
    success: true,
    message: message,
    data: data,
  });
};

module.exports = sendData;
