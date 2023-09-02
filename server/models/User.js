const knex = require('../knex');

class User {

  constructor({
    firstName,
    lastName,
    email,
    password,
    picturePath = "",
    friends = [],
    location = "",
    occupation = "",
    viewedProfile = 0,
    impressions = 0,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.picturePath = picturePath;
    this.friends = friends;
    this.location = location;
    this.occupation = occupation;
    this.viewedProfile = viewedProfile;
    this.impressions = impressions;
  }

  static async create(newUser) {
    try {
      const [createdUser] = await knex('users')
        .insert(newUser)
        .returning('*'); // Use "returning" to get the inserted user

      return createdUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  static async getById(userId) {
    try {
      const user = await knex('users')
        .where('id', userId)
        .first(); // Retrieve the first matching record

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

};

// const testModel = async () => {
//   const postObj = await User.create('James');
//   console.log(postObj);
// };
// testModel();

module.exports = User;

