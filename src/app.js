(function () {
  function Account(amount, type) {
    this.amount = parseFloat(amount);
    this.type = type;
  }

  Account.prototype.validate = function () {
    if (!this.amount || isNaN(this.amount)) {
      alert("Invalid amount!");
      return false;
    }
    return true;
  };

  var listAccounts = [
    new Account(23, "deposit"),
    new Account(19, "withdrawal"),
  ];

  function addAccount() {
    var amountInput = document.querySelector("#amount");
    var transactionType = document.querySelector("#transaction-type");
    var newTransaction = new Account(
      amountInput.value,
      transactionType.value
    );

    if (newTransaction.validate()) {
      listAccounts.push(newTransaction);

      amountInput.value = "";
      amountInput.classList.remove("show");
      amountInput.classList.add("hide");
      transactionType.classList.remove("show");
      transactionType.classList.add("hide");
      bindAccounts();
      updateTotalAmount();
    }
  }

  function bindAccounts() {
    var tbody = document.querySelector("#account tbody");
    var rows = "";

    listAccounts.forEach(function (newTransaction) {
      rows +=
        "<tr><td>" +
        "$ " +
        newTransaction.amount.toFixed(2) +
        "</td><td>" +
        newTransaction.type +
        "</td><td>" +
        "<button class='delete-button'>Delete</button" +
        "</td></tr>";
    });

    tbody.innerHTML = rows;
  }

  function onDeleteButtonClick(event) {
    if (event.target.classList.contains("delete-button")) {
      const row = event.target.closest("tr");
      const index = row.getAttribute("data-index");
      listAccounts.splice(index, 1);
      bindAccounts();
      updateTotalAmount();
    }
  }

  function onClearAllClick() {
    listAccounts = [];
    bindAccounts();
    updateTotalAmount();
  }

  function updateTotalAmount() {
    var totalAmount = listAccounts.reduce(function (total, account) {
      return (
        total +
        (account.type === "deposit"
          ? account.amount
          : -account.amount)
      );
    }, 0);

    var totalAmountText = document.getElementById("total-amount");
    totalAmountText.textContent = "$ " + totalAmount.toFixed(2);

    if (totalAmount >= 0) {
      totalAmountText.classList.add("positive");
      totalAmountText.classList.remove("negative");
    }
    else {
      totalAmountText.classList.add("negative");
      totalAmountText.classList.remove("positive");
    }
  }

  window.onload = function () {
    bindAccounts();
    updateTotalAmount();
    document.getElementById("addAccount").onclick = function () {
      var amountInput = document.getElementById("amount");
      amountInput.classList.remove("hide");
      amountInput.classList.add("show");
      amountInput.focus();
    };
    document
      .getElementById("account")
      .addEventListener("click", onDeleteButtonClick);

    document
      .getElementById("clearTrans")
      .addEventListener("click", onClearAllClick);
  };

  document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const transactionType = document.getElementById(
      "transaction-type"
    );

    amountInput.addEventListener("input", function () {
      if (amountInput.value) {
        transactionType.classList.remove("hide");
        transactionType.classList.add("show");
      } else {
        transactionType.classList.remove("show");
        transactionType.classList.add("hide");
      }
    });

    transactionType.addEventListener("change", function () {
      addAccount();
    });
  });
})();
