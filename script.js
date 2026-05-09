import { dark } from "./palettes/dark.js";
import { neon } from "./palettes/neon.js";
import { pastel } from "./palettes/pastel.js";

let currentStyle = "pastel";

const palettes = {
  pastel,
  neon,
  dark,
};

function setStyle(style) {
  currentStyle = style;

  generatePalette();
}

function generatePalette() {
  const container = document.getElementById("palette");

  container.innerHTML = "";

  const selectedColors = palettes[currentStyle];

  const shuffled = [...selectedColors].sort(() => Math.random() - 0.5);

  shuffled.slice(0, 5).forEach((color) => {
    container.innerHTML += `
        
          <div
            onclick="copyColor('${color}')"
            class="
              h-44
              sm:h-52
              rounded-3xl
              shadow-lg
              p-5
              flex
              items-end
              justify-between
              text-white
              font-bold
              cursor-pointer
              hover:scale-[1.03]
              active:scale-95
              transition-all
              duration-300
            "
            style="background:${color}"
          >
            <span class="text-sm sm:text-base">
              ${color}
            </span>
          </div>

        `;
  });
}

function copyColor(color) {
  navigator.clipboard.writeText(color);

  showToast(color);
}

function showToast(color) {
  const toast = document.createElement("div");

  toast.innerText = `${color} copied!`;

  toast.className = `
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        bg-[#021a24]
        text-white
        px-5
        py-3
        rounded-2xl
        shadow-xl
        text-sm
        font-medium
      `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1500);
}

generatePalette();

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();

    generatePalette();
  }
});

window.generatePalette = generatePalette;
window.setStyle = setStyle;
window.copyColor = copyColor;
