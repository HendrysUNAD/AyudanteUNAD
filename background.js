chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "createWindow") {
        chrome.tabs.create({ url: message.url }, function(newTab) {
            console.log("Nueva pestaña creada:", newTab);
          });
      // Se retorna true para indicar que se usará sendResponse de forma asíncrona.
      return true;
    }
  });