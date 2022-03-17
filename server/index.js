let fs = require("fs");
const PORT = 8000;
// json file with the data
let data = fs.readFileSync("mockData.json");

let people = JSON.parse(data);
const express = require("express");
const app = express();

// To solve the cors issue
const cors = require("cors");

app.listen(PORT, () => console.log("Server Start at the Port " + PORT));

app.use(express.static("public"));
app.use(cors());

app.get("/api/people", alldata);
["Name Surname", "Company", "Email", "Date", "Country", "City"];

function alldata(request, response) {
  let result = categorizeData(people.data);
  response.send(result);
}

app.get("/api/people/:word", searchElement);

function searchElement(request, response) {
  const data = [...categorizeData(people.data)];
  // request data
  let word = request.params.word.toLowerCase();
  let page = request.query.page;
  let dataPerPage = request.query.dataPerPage;
  let orderBy = request.query.orderBy;

  //   filters
  let filterByNames = data.filter((a) => {
    let allParams = [a.fullName, a.email, a.company, a.country, a.city];
    let isArray = [];
    a.searchPoint = 0;

    allParams.forEach((param) => {
      param = param.toLowerCase();
      let isThere = filterData(param, word);

      if (isThere) {
        isArray.push(true);
        a.searchPoint++;
      }
      if (param.split(" ").join("").includes(word)) {
        a.searchPoint += 10;
      }
    });
    // let isFullName = filterData(a.fullName, word);
    // let isEmail = filterData(a.email, word);
    // let isCompany = filterData(a.company, word);
    // let isCountry = filterData(a.country, word);
    // let isCity = filterData(a.city, word);

    if (
      isArray.find((e) => {
        return e == true;
      })
    ) {
      return a;
    }
  });
  let totalSize = filterByNames.length;

  // sorting
  //normal
  filterByNames = filterByNames.sort((a, b) => {
    return b.searchPoint - a.searchPoint;
  });

  if (orderBy) {
    if (orderBy == "nameAsc") {
      filterByNames = filterByNames.sort((a, b) => {
        var nameA = a.fullName.toLowerCase(),
          nameB = b.fullName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (orderBy == "nameDesc") {
      filterByNames = filterByNames.sort((a, b) => {
        var nameA = b.fullName.toLowerCase(),
          nameB = a.fullName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (orderBy == "yearAsc") {
      filterByNames = filterByNames.sort((a, b) => {
        return b.year - a.year;
      });
    } else if (orderBy == "yearDesc") {
      filterByNames = filterByNames.sort((a, b) => {
        return a.year - b.year;
      });
    }
  }
  //paging
  if (page) {
    if (!dataPerPage) {
      dataPerPage = 6;
    }
    filterByNames = filterByNames.slice(
      (page - 1) * dataPerPage,
      page * dataPerPage
    );
  }

  response.send({
    totalSize,
    listedSize: filterByNames.length,
    data: filterByNames,
  });
}

//functions

function categorizeData(data) {
  let result = [];
  data.forEach((p) => {
    let person = new Object();
    person.fullName = p[0];
    person.company = p[1];
    person.email = p[2];
    person.date = p[3];
    person.country = p[4];
    person.city = p[5];
    person.year = p[3].split("/")[2];

    result.push(person);
  });

  return result;
}

//does it match

function filterData(parameter, word) {
  word = word.toLowerCase().split("");
  parameter = parameter.toLowerCase().split("");
  let letterCount = 0;
  let parameterChunks = [];
  let wordChunks = [];
  let chunked = true;

  for (let i = 0, charsLength = word.length; i < charsLength; i += 1) {
    wordChunks.push([...word].join("").substring(i, i + 2));
  }
  for (let j = 0, charsLength = parameter.length; j < charsLength; j += 1) {
    parameterChunks.push([...parameter].join("").substring(j, j + 2));
  }
  if (word.length > 4 || parameter.length > 12) {
    for (let x = 0; x < wordChunks.length; x++) {
      let isLetterThere = parameterChunks.find((l) => {
        if (l == wordChunks[x]) {
          return l;
        }
      });

      isLetterThere ? letterCount++ : null;
    }
  } else {
    chunked = false;
    for (let x = 0; x < word.length; x++) {
      let isLetterThere = parameter.find((l) => {
        if (l == word[x]) {
          return l;
        }
      });

      isLetterThere ? letterCount++ : null;
    }
  }

  if (chunked) {
    if (letterCount > Math.floor(wordChunks.length / 2)) {
      return true;
    } else return false;
  } else {
    if (letterCount > Math.floor(word.length / 1.2)) {
      return true;
    } else return false;
  }
}
