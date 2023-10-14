const dbObjects = require("../dbInit.js");
const Contribution = dbObjects.Contribution;

const Variables = require("../index.js");
const contribution = Variables.contribution;

function getLang(id) {
    const user = contribution.get(id);

    if (user) {
        return user.lang; // return the language of the user
    }

    return "fr"; // default language is set to french
}

function setLang(id, lang) {
    let user = contribution.get(id);

    if (!user) {
        return createNewUser(id, 0, lang) // Create a new user with 0 points
    }
    user.lang = lang; // set the language of the user
    return user.save(); // save the user


}

function getPoint(id) {
  const user = contribution.get(id);

  if (user) {
    return user.contributionPoint;
  }

  return 0;
}

function resetPoint(id) {
  const user = contribution.get(id);

  if (user) {
    user.contributionPoint = 0;
    user.allContributionPoint = 0;
    return user.save();
  }

  return 0;
}

function resetAllPoint() {
  contribution.forEach((user) => {
    user.contributionPoint = 0;
    user.allContributionPoint = 0;
    user.save();
  });

  return 0;
}

async function addPoint(id, amount) {
	const user = contribution.get(id);

  if (user) {
		user.contributionPoint += Number(amount);
        user.allContributionPoint += Number(amount);
		return user.save();
	}

  return createNewUser(id, amount);
}

async function remPoint(id, amount) {
	const user = contribution.get(id);

  if (user) {
		user.contributionPoint -= Number(amount);
        user.allContributionPoint -= Number(amount);
		return user.save();
	}

  return createNewUser(id, amount);
}

async function createNewUser(id, amount, language = 'fr') {
    console.log("aa")
  const newUser = await Contribution.create(
      { user_id: id, contributionPoint: amount, allContributionPoint: amount, lang: language}
  );
    console.log("bb")
  contribution.set(id, newUser);
console.log("cc")
  return newUser;
}

module.exports = {
    getPoint: getPoint,
    resetPoint: resetPoint,
    resetAllPoint: resetAllPoint,
    addPoint: addPoint,
    remPoint: remPoint,
    getLang: getLang,
    setLang: setLang
};