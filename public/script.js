const textArea = document.getElementById("text_to_summarize");
const summarizedText = document.getElementById("summary");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const summarizeLength = document.querySelector("#summarylength");
const summValue = document.querySelector(".Sumvalue");
const clearInput = document.getElementById("clear-button-input");
const clearResult = document.getElementById("clear-button-result");
const popup = document.querySelector("#popup");
const popupText = document.querySelector("#popup h2");
const copyResult = document.getElementById("copy-button");
const lengthToGenerate = document.getElementById("summarylength");
const deletebtn = document.querySelector(".resultSummary svg");

summarizeLength.oninput = (e) => {
  let range = e.target.value;
  if (range == 1) {
    summValue.innerHTML = "S";
  } else if (range == 2) {
    summValue.innerHTML = "M";
  } else {
    summValue.innerHTML = "L";
  }
};

function showPopup() {
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
}

function popUp(message) {
  popupText.textContent = message;
  setTimeout("showPopup()", 0);
  setTimeout("hidePopup()", 2000);
}

deletebtn.onclick = () => {
  if (textArea.value || summarizedText.value || summarizeLength.value != 2) {
    textArea.value = "";
    summarizedText.value = "";
    summarizeLength.value = "2";
    summValue.textContent = "M";
    popUp("Reset To Initial State Sucessfull");
    submitButton.disabled = true;
  } else {
    popUp("Nothing To Rest");
  }
};

clearInput.onclick = () => {
  if (textArea.value) {
    textArea.value = "";
    popUp("Cleared Successfully");
    submitButton.disabled = true;
  }
};

clearResult.onclick = () => {
  if (summarizedText.value) {
    summarizedText.value = "";
    popUp("Summary Cleared Successfully");
  }
};

copyResult.onclick = () => {
  if (summarizedText.value) {
    popUp("Summary Copied to Clipboard.");
    navigator.clipboard.writeText(summarizedText.value);
  } else {
    popUp("Nothing to Copy");
  }
};

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");

  if (summarizedText) {
    summarizedText.value = "";
  }

  const text_to_summarize = textArea.value;
  const range = lengthToGenerate.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    text_to_summarize: text_to_summarize,
    range: range,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/summarize", requestOptions)
    .then((response) => response.text())
    .then((summary) => {
      summarizedTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
