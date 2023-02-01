const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", e => {
  e.preventDefault();
  getColors();
});

function getColors() {
  const seedColor = document.querySelector("#seed-color");
  const seedColorValue = seedColor.value.split("").slice(1, 7).join("");
  const schemeModeValue = document.querySelector("select").value;
  ul.innerHTML = "";
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColorValue}&mode=${schemeModeValue}&count=5`
  )
    .then(res => res.json())
    .then(data => {
      for (let color of data.colors) {
        ul.innerHTML += `<li>
              <div style="background:${color.hex.value}" class="color"></div>
              <p title="복사" class="hex-value">${color.hex.value}</p>
            </li>`;
      }
      ul.addEventListener("click", e => {
        navigator.clipboard.writeText(e.target.textContent);
      });
    });
}
getColors();
