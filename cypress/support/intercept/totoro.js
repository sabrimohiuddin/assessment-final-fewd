const API = Cypress.env("API");
export default function () {
  return cy
    .intercept("GET", `${API}/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49`, {
      fixture: "myNeighborTotoro.json",
    })
    .as("request");
}
