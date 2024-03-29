const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const pg = require('pg');
const connectionString = require('./secrets.js')
pg.defaults.ssl = true;


const db = new Sequelize(connectionString, { logging: false });

const People = db.define('people', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
    }
});

const Places = db.define('places', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
    }
});

const Things = db.define('things', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
    }
});

People.belongsTo(Places);
Places.hasMany(People);
Things.belongsTo(People);
People.hasMany(Things);

const seedDB = async() => {
    try {
        const [pl1, pl2] = await Promise.all([
            Places.create({name: 'NYC'}),
            Places.create({name: 'SFO'}),
        ]);
        const [ppl1, ppl2] = await Promise.all([
            People.create({name: 'Alice', placeId: pl1.id}),
            People.create({name: 'Bobby', placeId: pl2.id})
        ]);
        const [th1, th2] = await Promise.all([
            Things.create({name: 'thing1', personId: ppl1.id}),
            Things.create({name: 'thing2', personId: ppl2.id})
        ]);
    }
    catch (e) {
        console.log('Error with seeding DB', e);
    }
}

module.exports = {
    db,
    seedDB,
    People,
    Places,
    Things
};
