const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        token: nanoid(),
        role: 'user',
        displayName: 'User'
    }, {
        email: '666nargiza@mail.ru',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin'
    });

    await Cocktail.create({
        title: 'Margarita',
        image: 'https://www.allrecipes.com/thmb/HbGbHFwDWwuAr17YVx7t_m8WTOk=/2000x2000/filters:fill(auto,1)/5365209-margarita-cocktail-Chef-Mo-1x1-1-3f296c6ac4fc47d89d35148d0d5dd519.jpg',
        publish: true,
        addedBy: user._id,
        recipe: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
        ingredients: [{title: 'Lime juice', amount: '1 oz'}, {title: 'Tequila', amount: '1.2 oz'}],
        ratings:[{user: user._id, rating: 3}, {user: admin._id, rating: 5}]
    },  {
        title: 'Lone Tree Cocktail',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NbZ322F01E8jjRR516E005u1tnMxOolH5w&usqp=CAU',
        publish: false,
        addedBy: user._id,
        recipe: 'Stir ingredients with ice, strain into a cocktail glass, and serve.',
        ingredients: [{title: 'Gin', amount: '3.4 oz'}, {title: 'Sweet Vermouth', amount: '1.2 oz'}],
        ratings:[{user: user._id, rating: 4}, {user: admin._id, rating: 2}]
    }, {
        title: 'English Highball',
        image: 'https://www.thecocktaildb.com//images//media//drink//dhvr7d1504519752.jpg',
        publish: true,
        addedBy: admin._id,
        recipe: 'Pour brandy, gin, and sweet vermouth into a highball glass over ice cubes. Fill with carbonated water. Add the twist of lemon peel, stir, and serve. (Ginger ale may be substituted for carbonated water, if preferred.).',
        ingredients: [{title: 'Brandy', amount: '3.4 oz'}, {title: 'Gin', amount: '3.4 oz'}, {title: 'Sweet Vermouth', amount: '3.4 oz'}, {title: 'Carbonated water', amount: '1.2 oz'}, {title: 'Lemon peel', amount: '1.2 oz'}],
        ratings:[{user: user._id, rating: 4}, {user: admin._id, rating: 4}]
    });


    await mongoose.connection.close();
};

run().catch(console.error);