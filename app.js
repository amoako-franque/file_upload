const express = require("express")
const path = require("path")
const multer = require("multer")
const { log } = require("console")

const app = express()
const port = 8900

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads")
	},
	filename: (req, file, cb) => {
		log(file)
		cb(null, Date.now() + path.extname(file.originalname))
	},
	fileSize: 10 * 1024 * 1024, //10mb
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs")

app.get("/upload", (req, res) => {
	res.render("upload")
})

app.post("/upload", upload.single("image"), (req, res) => {
	res.send("image uploaded")
})

app.get("/", (req, res) => res.send("Slightly Techie"))

app.listen(port, () =>
	console.log(`Server app listening on port http://localhost:${port}`)
)
