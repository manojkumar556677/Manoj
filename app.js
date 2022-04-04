document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
    }
  }
};

function onAppActivate() {
  var textElement = document.getElementById("apptext");
  var getContact = client.data.get("contact");
  getContact.then(showContact).catch(handleErr);

  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
    client.interface
      .trigger("showModal", {
        title: "Contact Info",
        template: "modal.html",
        data: { name: "James", email: "James@freshdesk.com" },
      })
      .then(function (data) {
        console.log("data", data);
      })
      .catch(function (error) {
        console.log("err", error);
      });
  }
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
