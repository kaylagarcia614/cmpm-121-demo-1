import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My very cool game";
const buttonName = "🎉";

document.title = gameName;

const header = document.createElement("header1");

header.innerHTML = gameName;

const button = document.createElement("button");
button.textContent = buttonName;

app.append(header);
app.append(button);
