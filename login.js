const brandButtons = document.querySelectorAll("[data-brand]");
const brandName = document.querySelector("#selected-brand");
const brandMark = document.querySelector("#brand-mark");
const brandDetail = document.querySelector("#brand-detail");
const journeyBrandMark = document.querySelector("#journey-brand-mark");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const codeButton = document.querySelector("#send-code");
const codeMessage = document.querySelector("#code-message");
const registrationForm = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");
const brandSelection = document.querySelector("#brand-selection");
const affidInput = document.querySelector("#affid");
const registrationUrl = document.querySelector("#registration-url");
const countSelection = document.querySelector("#count");
const registrationUrls = {
  UM: "https://www.ultimamarkets.com/open-live-account-crm/",
  PU: "https://www.puprime.com/live-account-test/",
  MO: "https://www.monetamarkets.com/open-live-account-crm/",
  SA: "https://www.startrader.com/live-account-crm/",
  VT: "https://www.vtmarkets.com/bit-trade-now-test/",
  VJP: "https://www.vantagetradings.com/open-live-account-crm/",
};

function resetCountDefault() {
  countSelection.value = "1";
}

resetCountDefault();
window.addEventListener("pageshow", resetCountDefault);

function updateRegistrationUrl() {
  const baseUrl = registrationUrls[brandSelection.value];
  if (!baseUrl) {
    registrationUrl.textContent = "Select a brand with a configured URL to preview it.";
    return;
  }

  const affid = affidInput.value.trim();
  registrationUrl.textContent = affid
    ? `${baseUrl}?affid=${encodeURIComponent(affid)}`
    : baseUrl;
}

brandSelection.addEventListener("change", updateRegistrationUrl);
affidInput.addEventListener("input", updateRegistrationUrl);

brandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    brandButtons.forEach((brandButton) => {
      brandButton.classList.remove("is-selected");
      brandButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    brandName.textContent = button.dataset.brand;
    brandMark.textContent = button.dataset.mark;
    journeyBrandMark.textContent = button.dataset.mark;
    brandDetail.textContent = button.dataset.detail;
    document.title = `Brand registration | ${button.dataset.brand} Collective`;
    document.documentElement.style.setProperty("--brand-accent", button.dataset.accent);
    codeMessage.textContent = "";
    formMessage.textContent = "";
    formMessage.className = "form-message";
  });
});

passwordToggle.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  passwordToggle.textContent = isPassword ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

codeButton.addEventListener("click", () => {
  const emailInput = document.querySelector("#email");
  if (!emailInput.value || !emailInput.validity.valid) {
    emailInput.reportValidity();
    return;
  }

  codeMessage.textContent = "Email delivery is not connected yet. No code was sent.";
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Details are ready. Connect a registration API to create this account.";
  formMessage.className = "form-message is-visible";
});
