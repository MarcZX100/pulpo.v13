module.exports = async error => {
    error.client.message.reply(`An error was found:\n${error}`)
    console.log(`Client's WebSocket encountered a connection error: ${error}`);
  error.client.channels.cache.get("804337335058563122").send(error);
};
