const sequelize = require("../db");
const {DataTypes, HasOne} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_user: {type: DataTypes.TEXT, unique: true},
    userName: {type: DataTypes.TEXT},
    photoURL: {type: DataTypes.TEXT},
    coin: {type: DataTypes.TEXT, defaultValue: "0.0000000001"},
    gpu: {type: DataTypes.TEXT, defaultValue: "0.0000000000"},
    cpu: {type: DataTypes.TEXT, defaultValue: "0.0000000000"},
    mouse: {type: DataTypes.TEXT, defaultValue: "0.0000000001"},
    meRefCode: {type: DataTypes.TEXT},
    ToRefCode: {type: DataTypes.TEXT},
    banAkk: {type: DataTypes.TEXT, defaultValue: "0"},
});

const Translation = sequelize.define('translation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameUs1: {type: DataTypes.TEXT},
    nameUs2: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT},
});


const Sale = sequelize.define('sale', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userIdMe: {type: DataTypes.TEXT},
    userNameMe: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT},
    curs: {type: DataTypes.TEXT},
});


const GPU = sequelize.define('gpu', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}
});

const CPU = sequelize.define('cpu', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}
});

const Mouse = sequelize.define('mouse', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}    
});




const GPUUser = sequelize.define('gpuUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}
});

const CPUUser = sequelize.define('cpuUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}
});

const MouseUser = sequelize.define('mouseUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    bust: {type: DataTypes.TEXT},
    price: {type: DataTypes.TEXT},
    sum: {type: DataTypes.TEXT, defaultValue: "0"}    
});


const TopOneLatereia = sequelize.define('topOneLatereia', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    coin: {type: DataTypes.TEXT}
});


const UserGamingLatereia = sequelize.define('userGamingLatereia', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    coin: {type: DataTypes.TEXT},
    on_of: {type: DataTypes.TEXT},
});


const TimerGame = sequelize.define('timerGame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chet: {type: DataTypes.TEXT, defaultValue: "0"},
});



const TopOneLatereiaTwo = sequelize.define('topOneLatereiaTwo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
});


const UserGamingLatereiaTwo = sequelize.define('userGamingLatereiaTwo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT},
    coin: {type: DataTypes.TEXT},
    comand: {type: DataTypes.TEXT},
    on_of: {type: DataTypes.TEXT},
});




User.hasOne(GPUUser)
GPUUser.belongsTo(User)

User.hasOne(CPUUser)
CPUUser.belongsTo(User)

User.hasOne(MouseUser)
MouseUser.belongsTo(User)


module.exports = {
    User,
    Translation,
    Sale,
    GPU,
    CPU,
    Mouse,
    GPUUser,
    CPUUser,
    MouseUser,
    TopOneLatereia,
    UserGamingLatereia,
    TimerGame,
    TopOneLatereiaTwo,
    UserGamingLatereiaTwo
}


