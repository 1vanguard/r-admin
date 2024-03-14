const processWebSocketMessage = (rawMessage: string) => {

  const message = JSON.parse(rawMessage),
    data = JSON.parse(message.message),
    mode = data.mode
  let processedData = null

    if (mode === "log") {
      processedData = data

    }
      // console.log(data);
    if (mode === "log") {
      return processedData;
    }
};

export default processWebSocketMessage;