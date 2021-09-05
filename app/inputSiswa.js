const fs = require("fs");
const readline = require("readline");

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

//check direktori
if (!fs.existsSync("./data")) fs.mkdirSync("./data");
if (!fs.existsSync("./data/contacts.json"))
  fs.writeFileSync("./data/contacts.json", "[]", "utf8");

const question = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (input) => {
      if (!typeof question === "string")
        reject(new Error("You entered the wrong input"));
      resolve(input);
    });
  });
};

const main = async () => {
  const nama = await question("Masukan nama kamu : ");
  const kelas = await question("Masukan kelas : ");
  const hobi = await question("Masukan hobi : ");

  rl.close();

  const siswa = { nama, kelas, hobi };
  const fileBuffer = fs.readFileSync("./data/contacts.json", "utf8");
  const siswaList = JSON.parse(fileBuffer);

  siswaList.push(siswa);

  fs.writeFileSync("./data/contacts.json", JSON.stringify(siswaList));
};

exports.run = main;
