import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { data } from "./data.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadImage(url, image_name) {
  const response = await axios({
    url,
    responseType: "stream",
  });
  response.data.pipe(
    fs.createWriteStream(path.join(__dirname, "imgs", image_name))
  );
}

const downloads = data.map((pokemon, index) => {
  return downloadImage(
    `https://cdn.traction.one/pokedex/pokemon/${index + 1}.png`,
    `${pokemon.name}.png`
  );
});

await Promise.all(downloads);
