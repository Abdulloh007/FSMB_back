const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const AnthropometryModel = require("./anthropometry.model");
const ApplicationModel = require("./application.model");
const BattleModel = require("./battle.model");
const CategoryModel = require("./category.model");
const ClubModel = require("./club.model");
const LeagueModel = require("./league.model");
const NominationsModel = require("./nomination.model");
const NotificationModel = require("./notification.model");
const ReportModel = require("./report.model");
const UserRoleModel = require("./role.model");
const TournamentModel = require("./tournament.model");
const UserModel = require("./user.model");
const RelativeModel = require("./relative.model");

const Relatives = sequelize.define("relatives", RelativeModel);
const User = sequelize.define("users", UserModel, { timestamps: true, paranoid: true, });
const UserRole = sequelize.define("user_roles", UserRoleModel, { timestamps: true });
const Anthropometry = sequelize.define("anthropometry", AnthropometryModel, { timestamps: true });
const Nominations = sequelize.define("nominations", NominationsModel, { timestamps: true });
const League = sequelize.define("league", LeagueModel, { timestamps: true });
const Club = sequelize.define("clubs", ClubModel, { timestamps: true });
const Tournament = sequelize.define("tournaments", TournamentModel, { timestamps: true });
const Application = sequelize.define("applications", ApplicationModel, { timestamps: true });
const Battle = sequelize.define("battle", BattleModel, { timestamps: true });
const Notification = sequelize.define("notifications", NotificationModel, { timestamps: true });
const Category = sequelize.define("category", CategoryModel, { timestamps: true });
const Report = sequelize.define("reports", ReportModel, { timestamps: true });

// Family.hasMany(User)
User.belongsToMany(User, {through: "relatives", as: 'relative'})

User.hasMany(UserRole);
UserRole.belongsTo(User);

User.hasMany(Notification)
Notification.belongsTo(User, { as: "to" })

User.hasOne(Anthropometry)

User.hasOne(Club)
Club.belongsTo(User, { as: 'owner' })
Club.hasMany(User)
User.belongsTo(Club)

Club.belongsToMany(League, { through: 'LeagueClub' })
League.belongsToMany(Club, { through: 'LeagueClub' })
Club.belongsToMany(Nominations, { through: 'NominationsClub' })
Nominations.belongsToMany(Club, { through: 'NominationsClub' })

// User.hasMany(Achivments)
// Achivments.belongsTo(User)

Tournament.hasMany(Application);
Application.belongsTo(Tournament);

Tournament.hasMany(Battle)
Battle.belongsTo(Tournament)

module.exports = {
    Anthropometry,
    Application,
    Battle,
    Category,
    Club,
    // Family,
    League,
    Nominations,
    Notification,
    Report,
    Tournament,
    UserRole,
    User
}