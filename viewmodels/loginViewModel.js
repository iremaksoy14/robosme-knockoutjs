function LoginViewModel() {
  const self = this;

  self.companyCode = ko.observable("");
  self.region = ko.observable("");
  self.email = ko.observable("");
  self.password = ko.observable("");

  self.companyCodeError = ko.observable("");
  self.regionError = ko.observable("");
  self.emailError = ko.observable("");
  self.passwordError = ko.observable("");

  self.loginUser = function () {
    let isValid = true;

    if (!self.companyCode()) {
      self.companyCodeError("Company Code is required.");
      isValid = false;
    } else self.companyCodeError("");

    if (!self.region()) {
      self.regionError("Region is required.");
      isValid = false;
    } else self.regionError("");

    if (!self.email()) {
      self.emailError("Email is required.");
      isValid = false;
    } else self.emailError("");

    if (!self.password()) {
      self.passwordError("Password is required.");
      isValid = false;
    } else self.passwordError("");

    if (isValid) {
      localStorage.setItem("userEmail", self.email());
      localStorage.setItem("companyCode", self.companyCode());
      window.location.href = "posts.html";
    }
  };
}
