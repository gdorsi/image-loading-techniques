#!/usr/bin/env node

let source = process.argv[2];
let dest = process.argv[3];

let sharp = require("sharp");

let {
  readdirSync,
  mkdirSync,
  existsSync,
  statSync,
  writeFileSync
} = require("fs");

let path = require("path");

function changed([input, output]) {
  return (
    !existsSync(output) || statSync(input).mtimeMs > statSync(output).mtimeMs
  );
}

(async function main() {
  let images = readdirSync(source).filter(
    image => image.endsWith(".jpg") || image.endsWith(".jpeg")
  );

  let dominantColorDest = path.join(dest, "dominant");
  if (!existsSync(dominantColorDest)) mkdirSync(dominantColorDest);

  images
    .map(image => [
      path.join(source, image),
      path.join(dominantColorDest, image)
    ])
    .filter(changed)
    .forEach(([input, output]) =>
      sharp(input)
        .resize(1, 1)
        .toFile(output)
    );

  let placeholderDest = path.join(dest, "4x4");
  if (!existsSync(placeholderDest)) mkdirSync(placeholderDest);

  images
    .map(image => [path.join(source, image), path.join(placeholderDest, image)])
    .filter(changed)
    .forEach(([input, output]) =>
      sharp(input)
        .resize(4, 4)
        .toFile(output)
    );

  let primitive = require("@sockhatso/primitive");

  let primitiveDest = path.join(dest, "primitive");
  if (!existsSync(primitiveDest)) mkdirSync(primitiveDest);

  images
    .map(image => [
      path.join(source, image),
      path.join(primitiveDest, image.replace(/\.(jpg|jpeg)$/, ".svg"))
    ])
    .filter(changed)
    .forEach(([input, output]) => primitive(input, output));

  let primitive100Dest = path.join(dest, "primitive100");
  if (!existsSync(primitive100Dest)) mkdirSync(primitive100Dest);

  images
    .map(image => [
      path.join(source, image),
      path.join(primitive100Dest, image.replace(/\.(jpg|jpeg)$/, ".svg"))
    ])
    .filter(changed)
    .forEach(([input, output]) => primitive(input, output, 100));

  let sqip = require("sqip");

  let sqipDest = path.join(dest, "sqip");
  if (!existsSync(sqipDest)) mkdirSync(sqipDest);

  images
    .map(image => [
      path.join(source, image),
      path.join(sqipDest, image.replace(/\.(jpg|jpeg)$/, ".svg"))
    ])
    .filter(changed)
    .forEach(([input, output]) =>
      writeFileSync(output, sqip({ filename: input }).final_svg)
    );
})();
