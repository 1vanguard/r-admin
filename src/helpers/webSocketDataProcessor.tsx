const processWebSocketMessage = (rawMessage: string) => {
  const message = JSON.parse(rawMessage),
    data = JSON.parse(message.message),
    mode = data.mode
  let processedData = null

    if (mode === "log" || mode === "idx") {
      processedData = data
    }
    if (mode === "log" || mode === "idx") {
      return processedData;
    }
};

export default processWebSocketMessage;