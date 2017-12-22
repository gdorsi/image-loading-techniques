let express = require("express");
let microbundle = require("microbundle");

let app = express();

app.use(express.static("dist"));
app.use(express.static("style"));
app.use(express.static("images"));

let imageUrls = require("fs")
  .readdirSync("./images")
  .map(encodeURIComponent);

let tpl = () => `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Lazy load demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        ${imageUrls
          .map(
            (url, i) => `
            <article>
              ${i > 3 ? `<img src="/images/primitive100/${toSvg(url)}">` : ""}
              <img ${i > 3
                ? `src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-`
                : ""}src="/${url}" />
            </article>`
          )
          .join("")}
        <script src="index.umd.js"></script>
    </body>
</html>
`;

app.get("/", (req, res) => res.send(tpl()));

app.listen(8080, () => console.log("Lazy load demo on port 8080!"));

function toSvg(url) {
  return url.replace(/\..+$/, ".svg");
}
