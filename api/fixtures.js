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
        email: 'admin@gmail.com',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin'
    });

    await Cocktail.create({
        title: 'Margarita',
        image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.allrecipes.com%2Fthmb%2FHbGbHFwDWwuAr17YVx7t_m8WTOk%3D%2F2000x2000%2Ffilters%3Afill(auto%2C1)%2F5365209-margarita-cocktail-Chef-Mo-1x1-1-3f296c6ac4fc47d89d35148d0d5dd519.jpg&imgrefurl=https%3A%2F%2Fwww.allrecipes.com%2Frecipe%2F222416%2Fmargarita-cocktail%2F&tbnid=B1GKfGRRmQBxfM&vet=12ahUKEwjmidLH4_36AhVLAxAIHV1wCFQQMygGegUIARCcAg..i&docid=_0vr3uBBFZDgRM&w=2000&h=2000&q=margarita&ved=2ahUKEwjmidLH4_36AhVLAxAIHV1wCFQQMygGegUIARCcAg',
        publish: true,
        addedBy: user._id,
        recipe: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
        ingredients: [{title: 'Lime juice', amount: '1 oz'}, {title: 'Tequila', amount: '1.2 oz'}],
        ratings:[{user: user._id, rating: 3}, {user: admin._id, rating: 5}]
    },  {
        title: 'Lone Tree Cocktail',
        image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fhgtvhome.sndimg.com%2Fcontent%2Fdam%2Fimages%2Fhgtv%2Funsized%2F2017%2F8%2F12%2FCI_Cherrity-Bar_100-Acre-Wood-cocktail-2.jpg&imgrefurl=https%3A%2F%2Fwww.hgtv.com%2Flifestyle%2Fentertaining%2Fthe-secret-to-this-sweet-cocktail-is-honeysuckle-liqueur&tbnid=kFRZSJ8OTjQZJM&vet=12ahUKEwjU8rjb5P36AhUSDRAIHd8XC3EQMygaegUIARDwAQ..i&docid=n_cA-b1yyojp9M&w=3456&h=5184&q=Lone%20Tree%20Cocktail&ved=2ahUKEwjU8rjb5P36AhUSDRAIHd8XC3EQMygaegUIARDwAQ',
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