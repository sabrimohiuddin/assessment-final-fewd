const API = Cypress.env("API");
export default function () {
  return cy
    .intercept("GET", `${API}/films/ea660b10-85c4-4ae3-8a5f-41cea3648e3e`, {
      fixture: "kikisDeliveryService.json",
    })
    .as("kikiFilm");
}
