import "dotenv/config";

import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Define the Account model
const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('cuid'),
    },
    userId: DataTypes.STRING,
    type: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerAccountId: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    access_token: DataTypes.TEXT,
    expires_at: DataTypes.INTEGER,
    token_type: DataTypes.STRING,
    scope: DataTypes.STRING,
    id_token: DataTypes.TEXT,
    session_state: DataTypes.STRING,
});

// Define the Session model
const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('cuid'),
    },
    sessionToken: {
        type: DataTypes.STRING,
        unique: true,
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
});

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('cuid'),
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    emailVerified: DataTypes.DATE,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
});

// Define the VerificationToken model
const VerificationToken = sequelize.define('VerificationToken', {
    identifier: DataTypes.STRING,
    token: {
        type: DataTypes.STRING,
        unique: true,
    },
    expires: DataTypes.DATE,
});

// Set up associations
Account.belongsTo(User, { foreignKey: 'userId' });
Session.belongsTo(User, { foreignKey: 'userId' });

// Define any additional associations if needed.

// Sync the models with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Models synchronized with the database.');
});

// Export the models
export { Account, Session, User, VerificationToken };

