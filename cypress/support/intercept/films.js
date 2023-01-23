const API = Cypress.env("API");
export default function () {
  return cy
    .intercept(`${API}/films`, {
      fixture: "films.json",
    })
    .as("request");
}
