const User = require("../models/User.js");
const knex = require("../knex.js"); // Import your Knex instance

/* READ */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await knex('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await knex('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = JSON.parse(user.friends || '[]');
    const parsedFriendIds = Array.isArray(friendIds) ? friendIds : [];
    
    // Now you can safely use parsedFriendIds in the query
    const friends = await knex('users').whereIn('id', parsedFriendIds);
    

    const formattedFriends = friends.map(({ id, firstName, lastName, occupation, location, picturePath }) => {
      return { id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
 const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    
    // Query the database using Knex to get user and friend records
    const user = await knex('users').where('id', id).first();
    const friend = await knex('users').where('id', friendId).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends) {
      user.friends = [] // Initialize user.friends as an empty array if it's undefined
    }

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Update user and friend records in the database using Knex
    await knex.transaction(async (trx) => {
      await knex('users').where('id', id).update({ friends: JSON.stringify(user.friends) }).transacting(trx);
      await knex('users').where('id', friendId).update({ friends: JSON.stringify(friend.friends) }).transacting(trx);
    });

    // Convert the friend IDs back to integers
    const friendIds = user.friends.map((id) => parseInt(id, 10));
    const friends = await knex('users').whereIn('id', friendIds);

    const formattedFriends = friends.map(({ id, firstName, lastName, occupation, location, picturePath }) => {
      return { id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






module.exports = {
  addRemoveFriend,
  getUserFriends,
  getUser

}
