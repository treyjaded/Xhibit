
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'hashedPassword',
          picturePath: "p11.jpeg",
          friends: [],
          location: "San Fran, CA",
          occupation: "Software Engineer",
          viewedProfile: 14561,
          impressions: 888822,
          // Other user attributes
        },
        {
          firstName: "test",
          lastName: "me",
          email: "aaaaaaa@gmail.com",
          password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
          picturePath: "p11.jpeg",
          friends: JSON.stringify(["friendId1", "friendId2", "friendId3"]),
          location: "San Fran, CA",
          occupation: "Software Engineer",
          viewedProfile: 14561,
          impressions: 888822,


        },
        {
          firstName: "Steve",
          lastName: "Ralph",
          email: "thataaa@gmail.com",
          password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
          picturePath: "p3.jpeg",
          friends: JSON.stringify(["friendId1", "friendId2", "friendId3"]),
          location: "New York, CA",
          occupation: "Degenerate",
          viewedProfile: 12351,
          impressions: 55555,


        },
        {
          firstName: "Some",
          lastName: "Guy",
          email: "someguy@gmail.com",
          password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
          picturePath: "p4.jpeg",
          friends: JSON.stringify(["friendId1", "friendId2", "friendId3"]),
          location: "Canada, CA",
          occupation: "Data Scientist Hacker",
          viewedProfile: 45468,
          impressions: 19986,


        },
        {
          firstName: "Whatcha",
          lastName: "Doing",
          email: "whatchadoing@gmail.com",
          password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
          picturePath: "p6.jpeg",
          friends: JSON.stringify(["friendId1", "friendId2", "friendId3"]),
          location: "Korea, CA",
          occupation: "Educator",
          viewedProfile: 41024,
          impressions: 55316,


        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "janedoe@gmail.com",
          password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
          picturePath: "p5.jpeg",
          friends: JSON.stringify(["friendId1", "friendId2", "friendId3"]),
          location: "Utah, CA",
          occupation: "Hacker",
          viewedProfile: 40212,
          impressions: 7758,


        },
        

        // Add more user entries as needed
      ]);
    });
};
