// var app = chrome.runtime.getBackgroundPage();

function hello() {
  chrome.tabs.executeScript({
    file: 'scriptSIMCA.js'
  }); 
}

document.getElementById('clickme').addEventListener('click', hello);
