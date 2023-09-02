/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          userId: 1,
          firstName: "Steve",
          lastName: "Ralph",
          location: "New York, CA",
          description: "Some really long random description",
          picturePath: "post1.jpeg",
          userPicturePath: "p3.jpeg",
          likes: JSON.stringify({ user1Id: 'user1_id', user2Id: 'user2' }),
          comments: JSON.stringify([
            "random comment",
            "another random comment",
            "yet another random comment",
          ])
        },
        {
          userId: 2,
          firstName: "Whatcha",
          lastName: "Doing",
          location: "Korea, CA",
          description:
            "Another really long random description. This one is longer than the previous one.",
          picturePath: "post2.jpeg",
          userPicturePath: "p6.jpeg",
          likes: [],
          comments: JSON.stringify([
            "one more random comment",
            "and another random comment",
            "no more random comments",
            "I lied, one more random comment",
          ]),
        },
        {
          userId: 3,
          firstName: "Jane",
          lastName: "Doe",
          location: "Utah, CA",
          description:
            "This is the last really long random description. This one is longer than the previous one.",
          picturePath: "post3.jpeg",
          userPicturePath: "p5.jpeg",
          likes: JSON.stringify([]),
          comments: JSON.stringify([]),
        },
        {
          userId: 4,
          firstName: "Harvey",
          lastName: "Dunn",
          location: "Los Angeles, CA",
          description:
            "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
          picturePath: "post4.jpeg",
          userPicturePath: "p7.jpeg",
          likes: JSON.stringify([]),
          comments: JSON.stringify([]),
        },
        {
          userId: 5,
          firstName: "Carly",
          lastName: "Vowel",
          location: "Chicago, IL",
          description:
            "Just a short description. I'm tired of typing. I'm going to play video games now.",
          picturePath: "post5.jpeg",
          userPicturePath: "p8.jpeg",
          likes: [],
          comments: JSON.stringify(["I lied again, one more random comment",
            "Why am I doing this?",
            "Man I'm bored",
            "What should I do?",
            "I'm going to play video games"]),
        },
        {
          userId: 6,
          firstName: "Jessica",
          lastName: "Dunn",
          location: "Washington, DC",
          description:
            "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
          picturePath: "post6.jpeg",
          userPicturePath: "p9.jpeg",
          likes: JSON.stringify([]),
          comments: JSON.stringify([]),
        },
        // Add more seed data as needed
      ]);
    });
};
