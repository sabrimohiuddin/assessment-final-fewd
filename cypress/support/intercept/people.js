const API = Cypress.env("API");
export default function () {
  return cy
    .intercept(`${API}/people`, {
      fixture: "people.json",
    })
    .as("people");
}
