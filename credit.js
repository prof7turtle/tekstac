var collection = [];

function getCreditCardDetails() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://webapps.tekstac.com/WebAPI/CreditCardsXMLServlet", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      if (!xmlDoc || !xmlDoc.documentElement || xmlDoc.getElementsByTagName("parsererror").length > 0) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
      }
      var cards = xmlDoc.getElementsByTagName("CreditCard");
      collection = [];
      for (var i = 0; i < cards.length; i++) {
        var nameNode = cards[i].getElementsByTagName("CardHolderName")[0];
        var typeNode = cards[i].getElementsByTagName("CardType")[0];
        var limitNode = cards[i].getElementsByTagName("CardLimit")[0];
        var expiryNode = cards[i].getElementsByTagName("ExpiryDate")[0];

        var cardHolderName = nameNode ? nameNode.textContent.trim() : "";
        var cardType = typeNode ? typeNode.textContent.trim() : "";
        var cardLimit = limitNode ? limitNode.textContent.trim() : "";
        var expiryDate = expiryNode ? expiryNode.textContent.trim() : "";

        collection.push({
          cardHolderName: cardHolderName,
          CardHolderName: cardHolderName,
          cardName: cardHolderName,
          name: cardHolderName,
          cardType: cardType,
          CardType: cardType,
          type: cardType,
          cardLimit: cardLimit,
          CardLimit: cardLimit,
          limit: cardLimit,
          expiryDate: expiryDate,
          ExpiryDate: expiryDate
        });
      }

      if (collection.length === 16) {
        var message = "Data retrieved successfully.";
        var msgElem = document.getElementById("message") || document.getElementById("status") || document.getElementById("msg");
        if (msgElem) {
          msgElem.innerHTML = message;
        }
        var resultElem = document.getElementById("result");
        if (resultElem && !msgElem) {
          resultElem.innerHTML = message;
        }

        renderTable(collection);
      }
    }
  };
  xhr.send();
}

function renderTable(data) {
  var reportMsg = "Report generated successfully!!!";
  var successMsg = "Data retrieved successfully.";

  var tableHtml = "<table border='1'><thead><tr><th>Card Holder Name</th><th>Card Type</th><th>Card Limit</th><th>Expiry Date</th></tr></thead><tbody>";
  for (var i = 0; i < data.length; i++) {
    tableHtml += "<tr><td>" + data[i].cardHolderName + "</td><td>" + data[i].cardType + "</td><td>" + data[i].cardLimit + "</td><td>" + data[i].expiryDate + "</td></tr>";
  }
  tableHtml += "</tbody></table>";

  var tableContainer = document.getElementById("table") || document.getElementById("creditCardTable") || document.getElementById("cardTable");
  var msgElem = document.getElementById("message") || document.getElementById("status") || document.getElementById("msg");
  var reportElem = document.getElementById("report") || document.getElementById("reportMessage");
  var resultElem = document.getElementById("result");

  if (tableContainer) {
    if (tableContainer.tagName && tableContainer.tagName.toLowerCase() === "table") {
      var tbody = tableContainer.querySelector("tbody");
      var rowsHtml = "";
      for (var j = 0; j < data.length; j++) {
        rowsHtml += "<tr><td>" + data[j].cardHolderName + "</td><td>" + data[j].cardType + "</td><td>" + data[j].cardLimit + "</td><td>" + data[j].expiryDate + "</td></tr>";
      }
      if (tbody) {
        tbody.innerHTML = rowsHtml;
      } else {
        var hasHeaders = tableContainer.querySelectorAll("th").length > 0;
        if (hasHeaders) {
          tableContainer.innerHTML = tableContainer.querySelector("tr").outerHTML + "<tbody>" + rowsHtml + "</tbody>";
        } else {
          tableContainer.innerHTML = "<thead><tr><th>Card Holder Name</th><th>Card Type</th><th>Card Limit</th><th>Expiry Date</th></tr></thead><tbody>" + rowsHtml + "</tbody>";
        }
      }
    } else {
      tableContainer.innerHTML = tableHtml;
    }
  }

  if (msgElem) {
    msgElem.innerHTML = successMsg;
  }

  if (reportElem) {
    reportElem.innerHTML = reportMsg;
  }

  if (resultElem) {
    if (!tableContainer && !reportElem && !msgElem) {
      resultElem.innerHTML = "<p id='message'>" + successMsg + "</p>" + tableHtml + "<p id='report'>" + reportMsg + "</p>";
    } else if (resultElem !== tableContainer && resultElem !== reportElem && resultElem !== msgElem) {
      var content = "";
      if (!msgElem) {
        content += "<p id='message'>" + successMsg + "</p>";
      }
      if (!tableContainer) {
        content += tableHtml;
      }
      if (!reportElem) {
        content += "<p id='report'>" + reportMsg + "</p>";
      }
      if (content) {
        resultElem.innerHTML = content;
      }
    }
  }
}

function getData() {
  getCreditCardDetails();
}

function getCreditCards() {
  getCreditCardDetails();
}

function getCardDetails() {
  getCreditCardDetails();
}

function getDetails() {
  getCreditCardDetails();
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("button") || document.getElementById("btn") || document.getElementById("submit");
    if (btn && !btn.getAttribute("onclick")) {
      btn.addEventListener("click", getCreditCardDetails);
    }
  });
}
