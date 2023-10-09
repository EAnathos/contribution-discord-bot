const dbObjects = require("../dbInit.js");
const Contribution = dbObjects.Contribution;

const Variables = require("../index.js");
const contribution = Variables.contribution;

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
    return user.save();
  }

  return 0;
}

function resetAllPoint() {
  contribution.forEach((user) => {
    user.contributionPoint = 0;
    user.save();
  });

  return 0;
}

async function addPoint(id, amount) {
	const user = contribution.get(id);

  if (user) {
		user.contributionPoint += Number(amount);
		return user.save();
	}

  const newUser = await Contribution.create({ user_id: id, contributionPoint: amount });
	contribution.set(id, newUser);

  return newUser;
}

async function remPoint(id, amount) {
	const user = contribution.get(id);

  if (user) {
		user.contributionPoint -= Number(amount);
		return user.save();
	}

  const newUser = await Contribution.create({ user_id: id, contributionPoint: amount });
	contribution.set(id, newUser);

  return newUser;
}

module.exports = {
  getPoint: getPoint,
  resetPoint: resetPoint,
  resetAllPoint: resetAllPoint,
  addPoint: addPoint,
  remPoint: remPoint,
};