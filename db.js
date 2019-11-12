const { STRING, Sequelize } = require('sequelize');

const connectionString = 'postgres://localhost:5432/nouns';
const connection = new Sequelize(connectionString, { logging: false });

const People = connection.define('people', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
    }
});

const Places = connection.define('places', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        notNull: true,
        notEmpty: true
    }
});

const Things = connection.define('things', {
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


const seed = async() => {
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

module.exports = {
    connection,
    seed,
    People,
    Places,
    Things
};
