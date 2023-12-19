const sendData = (statuscode, message, data, res) => {
  res.status(statuscode).json({
    success: true,
    message: message,
    data: data,
  });
};

module.exports = sendData;
