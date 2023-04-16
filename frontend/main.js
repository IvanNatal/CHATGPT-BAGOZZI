// Evento para limpar todo o conteúdo do chat
document.getElementById("clear-chat-button").addEventListener("click", () => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Limpa o conteúdo do elemento
});

// Evento para enviar a mensagem quando pressionar a tecla Enter
document.getElementById("prompt").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const prompt = document.getElementById("prompt").value.trim(); // Obtém o valor do campo de entrada e remove espaços em branco

    if (prompt !== "") {
      // Verifica se o campo de entrada não está vazio
      const response = await fetch("http://localhost:3030/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();

      if (response.ok) {
        const messagesContainer = document.getElementById("messages");
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.innerText = prompt;
        messagesContainer.appendChild(userMessage);

        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = result.data;
        messagesContainer.appendChild(botMessage);

        document.getElementById("prompt").value = ""; // Limpa o campo de entrada após o envio da mensagem
      } else {
        document.getElementById("response").innerText =
          result.error || "Houve um erro com o servidor";
      }
    }
  }
});

// Evento para limpar o campo de entrada de texto
document.getElementById("clear-button").addEventListener("click", () => {
  document.getElementById("prompt").value = "";
});
