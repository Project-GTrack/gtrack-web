require('dotenv').config("./.env");
const { Sequelize } = require("sequelize");
const attachment_line = require("../models/attachment_line");
const attachment = require("../models/attachment");
const concern = require("../models/concern");
const event = require("../models/event");
const user = require("../models/user");
const dumpster = require("../models/dumpster");
const report = require("../models/report");
const waste_collection = require("../models/waste_collection");
const truck = require("../models/truck");
const truck_assignment = require("../models/truck_assignment");
const schedule = require("../models/schedule");
const announcement = require("../models/announcement");
// hasOne relationships
attachment_line.model.hasOne(attachment.model,{
    foreignKey:'attachment_line_id'
});
attachment.model.belongsTo(attachment_line.model);

attachment_line.model.hasOne(concern.model,{
    foreignKey:'attachment_line_id'
});
concern.model.belongsTo(attachment_line.model);

attachment.model.hasOne(announcement.model,{
    foreignKey:'attachment_line_id'
});
announcement.model.belongsTo(attachment_line.model);

attachment.model.hasOne(event.model,{
    foreignKey:'attachment_line_id'
});
event.model.belongsTo(attachment_line.model);

truck.model.hasOne(truck_assignment.model,{
    foreignKey:'truck_id'
});
truck_assignment.model.belongsTo(truck.model);

// hasMany relationships
user.model.hasMany(dumpster.model,{
    foreignKey:'user_id', as:'admin_id'
});
dumpster.model.belongsTo(user.model);

user.model.hasMany(concern.model,{
    foreignKey:'user_id', as:'resident_id'
});
concern.model.belongsTo(user.model);

user.model.hasMany(waste_collection.model,{
    foreignKey:'user_id',as:'driver_id'
});
waste_collection.model.belongsTo(user.model);

user.model.hasMany(truck.model,{
    foreignKey:'user_id'
});
truck.model.belongsTo(user.model);

user.model.hasMany(truck_assignment.model,{
    foreignKey:'user_id',as:'driver_id'
});
truck_assignment.model.belongsTo(user.model);

user.model.hasMany(schedule.model,{
    foreignKey:'user_id'
});
schedule.model.belongsTo(user.model,{
    as:'admin_id'
});
schedule.model.belongsTo(user.model,{
    as:'driver_id'
});

schedule.model.hasMany(truck_assignment.model,{
    foreignKey:'assignment_id'
});
truck_assignment.model.belongsTo(schedule.model);