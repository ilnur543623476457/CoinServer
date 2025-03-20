const {User, Translation, Sale, GPU, CPU, Mouse, GPUUser, CPUUser, MouseUser, TopOneLatereia, UserGamingLatereia, TimerGame, TopOneLatereiaTwo, UserGamingLatereiaTwo} = require('../models/models')
const event = require('events')


const ws = require('ws')


const wss = new ws.Server({
    port: 3050
}, () => console.log('server online -- ws://localhost:3050/'))


wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'mes':
                broadcastMessageOne()
                break;
        }
    })
})


const broadcastMessageOne = () =>{
    try {
        wss.clients.forEach(async client => {
            const timer_all = await TimerGame.findOne({where: {id: 1}})
            const tx = {
                time: timer_all.chet
            }
            client.send(JSON.stringify(tx))
        })
    } catch (error) {}
}







const emitter = new event.EventEmitter()
class UserController {

    async Registration_Chek(req, res) { // Регистрация аккаунта
        try {
            const {id_user, userName} = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            if (user){
                return res.json(user)
            } else {
                const user = await User.create({id_user, userName, meRefCode: id_user})
                const AllGpu = await GPU.findAll()
                for (let i = 0; i < AllGpu.length; i++) {
                    const element = AllGpu[i];
                    // console.log(element);
                    await GPUUser.create({name: element.name, bust: element.bust, price: element.price, sum: element.sum, userId: user.id})
                }
                const AllCpu = await CPU.findAll()
                for (let i = 0; i < AllCpu.length; i++) {
                    const element = AllCpu[i];
                    // console.log(element);
                    await CPUUser.create({name: element.name, bust: element.bust, price: element.price, sum: element.sum, userId: user.id})

                }
                const AllMouse = await Mouse.findAll()
                for (let i = 0; i < AllMouse.length; i++) {
                    const element = AllMouse[i];
                    // console.log(element);
                    await MouseUser.create({name: element.name, bust: element.bust, price: element.price, sum: element.sum, userId: user.id})
                }
                return res.json(user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async NewCoinClick(req, res, next) { 
        const {id_user} = req.body
        const user  = await User.findOne({where: {id_user: id_user}})
        const coin = parseFloat(user.coin)
        const mouse = parseFloat(user.mouse)
        user.coin = coin + mouse;
        await user.save();
        return res.json((user.coin).toFixed(10))
    }


    async NewVideoCard(req, res, next) { 
        const {name, bust, price} = req.body
        const gpu = await GPU.create({name, bust, price})
        return res.json(gpu)

    }

    async NewProccesor(req, res, next) { 
        const {name, bust, price} = req.body
        const cpu = await CPU.create({name, bust, price})
        return res.json(cpu)
    }

    async NewMouse(req, res, next) { 
        const {name, bust, price} = req.body
        const mouse = await Mouse.create({name, bust, price})
        return res.json(mouse)
    }



    async AllVideoCard(req, res, next) { 
        const {id_user} = req.body
        const gpu = await GPUUser.findAll({where: {userId: id_user}})
        return res.json(gpu)
    }

    async AllProccesor(req, res, next) { 
        const {id_user} = req.body
        const cpu = await CPUUser.findAll({where: {userId: id_user}})
        return res.json(cpu)
    }

    async AllMouse(req, res, next) { 
        const {id_user} = req.body
        const mouse = await MouseUser.findAll({where: {userId: id_user}})
        return res.json(mouse)
    }


    async AllTop(req, res, next) { 
        const userAll = await User.findAll()
        return res.json(userAll)
    }


    async bustMS(req, res, next) { 
        try {
            const {id_user, name_card} = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            const mouseBust = await MouseUser.findOne({where: {name: name_card, userId: user.id}})
            const mouse = parseFloat(user.mouse) + parseFloat(mouseBust.bust)
            const coin = parseFloat(user.coin) - parseFloat(mouseBust.price)
            user.mouse = mouse;
            user.coin = coin;
            await user.save();
            const mouseBustMS = parseFloat(mouseBust.price) * 1.5
            const mouseSumMS = parseFloat(mouseBust.sum) + 1
            mouseBust.price = mouseBustMS
            mouseBust.sum = mouseSumMS
            await mouseBust.save()
            return res.json(user)
        } catch (error) {
            // return res.json(user)
        }
    }


    async bustVC(req, res, next) { 
        try {
            const {id_user, name_card} = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            const mouseBust = await GPUUser.findOne({where: {name: name_card, userId: user.id}})
            const mouse = parseFloat(user.gpu) + parseFloat(mouseBust.bust)
            const coin = parseFloat(user.coin) - parseFloat(mouseBust.price)
            user.gpu = mouse;
            user.coin = coin;
            await user.save();
            const mouseBustMS = parseFloat(mouseBust.price) * 1.5
            const mouseSumMS = parseFloat(mouseBust.sum) + 1
            mouseBust.price = mouseBustMS
            mouseBust.sum = mouseSumMS
            await mouseBust.save()
            return res.json(user)
        } catch (error) {
            // return res.json(user)
        }
    }


    async bustPR(req, res, next) { 
        try {
            const {id_user, name_card} = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            const mouseBust = await CPUUser.findOne({where: {name: name_card, userId: user.id}})
            const mouse = parseFloat(user.cpu) + parseFloat(mouseBust.bust)
            const coin = parseFloat(user.coin) - parseFloat(mouseBust.price)
            user.cpu = mouse;
            user.coin = coin;
            await user.save();
            const mouseBustMS = parseFloat(mouseBust.price) * 1.5
            const mouseSumMS = parseFloat(mouseBust.sum) + 1
            mouseBust.price = mouseBustMS
            mouseBust.sum = mouseSumMS
            await mouseBust.save()
            return res.json(user)
        } catch (error) {
            // return res.json(user)
        }
    }



    async NewCoinClickFarm(req, res, next) {
        try {
            const { id_user } = req.body
            const user = await User.findOne({ where: { id_user: id_user } })
            const coin = parseFloat(user.coin)
            const cpu = parseFloat(user.cpu)
            if (cpu != 0.0000000000) {
                user.coin = coin + cpu;
                await user.save();
                return res.json((user.coin).toFixed(10))
            }
        } catch (error) { }

    }



    async NewCoinClickFarmAFK(req, res, next) {
        try {
            const { id_user, timeSleep } = req.body
            const user = await User.findOne({ where: { id_user: id_user } })
            const coin = parseFloat(user.coin)
            const gpu = parseFloat(user.gpu) * parseInt(timeSleep)
            user.coin = coin + gpu;
            await user.save();
            return res.json((user.coin).toFixed(10))
        } catch (error) { }
    }


    async RefCodeUser(req, res, next) {
        try {
            const { id_user, valRefCode } = req.body
            const user = await User.findOne({ where: { id_user: id_user } })
            if (user.ToRefCode != null) {
                return res.json('no')
            } else {
                // console.log('pustota');
                user.ToRefCode = valRefCode
                await user.save();
                return res.json(user)
            }
        } catch (error) {}
    }


    async RefUser(req, res, next) {
        try {
            const { valRefCode } = req.body
            // console.log(valRefCode);
            const user = await User.findAll({ where: { ToRefCode: valRefCode } })
            var coinRef = []
            for (let i = 0; i < user.length; i++) {
                const element = user[i];
                coinRef.push(parseFloat(element.coin).toFixed(10))
            }
            // console.log(coinRef);
            var itog = coinRef.reduce(function (sum, current) {
                return sum + parseFloat(current);
            }, 0);
            const itogRefCoin = parseFloat(itog).toFixed(10) * (5 / 100)
            var UserRef = user.length
            var data = {
                itogRefCoin: parseFloat(itogRefCoin).toFixed(10),
                UserRef: UserRef
            }
            return res.json(data)
        } catch (error) { }
    }


    async SellUser(req, res, next) { 
        try {
            const {
                userIdMe,
                userNameMe,
                sum,
                curs,
            } = req.body
            await Sale.create({userIdMe, userNameMe, sum, curs})
            return res.json('ok')
        } catch (error) {}
    }

    async AllSellUser(req, res, next) { 
        try {
            const sellAll = await Sale.findAll()
            return res.json(sellAll)
        } catch (error) {}
    }


    async WithdrawCoinUser(req, res, next) { 
        try {
            const {
                nameUs1,
                nameUs2,
                sum,
            } = req.body
            await Translation.create({nameUs1, nameUs2, sum})
            const userOne  = await User.findOne({where: {userName: nameUs1}})
            const userTwo  = await User.findOne({where: {userName: nameUs2}})
            const CoinUserOne = parseFloat(userOne.coin).toFixed(10)
            const CoinUserTwo = parseFloat(userTwo.coin).toFixed(10)
            userOne.coin = parseFloat(CoinUserOne) - parseFloat(sum)
            userTwo.coin = parseFloat(CoinUserTwo) + parseFloat(sum)
            await userOne.save()
            await userTwo.save()
            return res.json('ok')
        
        } catch (error) {}
    }



    async AllWithdrawCoinUser(req, res, next) {
        try {
            var tr = await Translation.findAll()
            return res.json(tr)
        } catch (error) {}

    }

    async AllUser(req, res, next) {
        try {
            const { user_name } = req.body
            var user = await User.findOne({ where: { userName: user_name } })
            return res.json(user)
        } catch (error) { }

    }



    // игра одиночная латерея

   

    async NewGamerLat(req, res, next) {
        try {
            const { id_user, user_name, coinStavca } = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            var coinUser = parseFloat(user.coin).toFixed(10) - parseFloat(coinStavca)
            user.coin = coinUser
            await user.save()
            var userLat = await UserGamingLatereia.create({name: user_name, coin: coinStavca, on_of: 0})
            emitter.emit('newGamer', userLat)
            res.json('ok')
        } catch (error) {}

    }


    async AllGamersLat(req, res, next) {
        try {
            emitter.once('newGamer', (userLat) => {
                res.json(userLat)
            })
        } catch (error) {}

    }

    async WithAllGamerVse(req, res, next) {
        try {
            var userLat = await UserGamingLatereia.findAll()
            await res.json(userLat)
        } catch (error) {}
    }

    async CreateTimeGameOne(req, res, next) {
        try {
            const tm = TimerGame.create()
            await res.json(tm)
        } catch (error) {}
    }



    async TimeGameOne(req, res, next) {
        try {
            var result
            var time = 11
            setInterval(async () => {
                result = --time;
                if (!result) {
                    time = 11
                }
                const timer_all = await TimerGame.findOne({where: {id: 1}})
                timer_all.chet = result
                await timer_all.save()
            }, 1000);
        } catch (error) {}
    }




    async WithAllGamerVseOff(req, res, next) {
        try {
            var userLat = await UserGamingLatereia.findAll({where: {on_of: '0'}})
            for (let i = 0; i < userLat.length; i++) {
                const element = userLat[i];
                element.on_of = 1
                await element.save()
            }
            return res.json('ok')
        } catch (error) {}

    }


    async TopGamer(req, res, next) {
        try {
            const { name_user, coinsum } = req.body
            console.log(name_user, coinsum);
            await TopOneLatereia.create({name: name_user, coin: coinsum})

            var user = await User.findOne({where: {userName: name_user}})
            const winCoin = parseFloat(user.coin) + parseFloat(coinsum)
            user.coin = winCoin
            await user.save()

            // WithAllGamerVseOff()
            var userLat = await UserGamingLatereia.findAll({where: {on_of: '0'}})
            for (let i = 0; i < userLat.length; i++) {
                const element = userLat[i];
                element.on_of = 1
                await element.save()
            }
            return res.json('ok')
        } catch (error) {}

    }


    async AllRTopLat(req, res){
        var userLat = await TopOneLatereia.findAll()
        await res.json(userLat)
    }



    async DobCoin(req, res){
        try {
            const { name_user, coinsum } = req.body
            const user  = await User.findOne({where: {userName: name_user}})
            const coin = parseFloat(user.coin) + parseFloat(coinsum)
            user.coin = coin
            await user.save()
            return res.json(user)
        } catch (error) {}
    }

    async DelCoin(req, res){
        try {
            const { name_user, coinsum } = req.body
            const user  = await User.findOne({where: {userName: name_user}})
            const coin = parseFloat(user.coin) - parseFloat(coinsum)
            user.coin = coin
            await user.save()
            return res.json(user)
        } catch (error) {}

    }


    async BanAkk(req, res){
        try {
            const { name_user, valueBan } = req.body
            const user  = await User.findOne({where: {userName: name_user}})
            user.banAkk = valueBan
            await user.save()
            return res.json(user)
        } catch (error) {}

    }







    async NewGamerLatTwo(req, res, next) {
        try {
            const { id_user, user_name, coinStavca, comand } = req.body
            const user  = await User.findOne({where: {id_user: id_user}})
            var coinUser = parseFloat(user.coin).toFixed(10) - parseFloat(coinStavca)
            user.coin = coinUser
            await user.save()
            var userLat = await UserGamingLatereiaTwo.create({name: user_name, coin: coinStavca, on_of: 0, comand: comand})
            emitter.emit('newGamerTwo', userLat)
            res.json('ok')
        } catch (error) {}

    }


    async AllGamersLatTwo(req, res, next) {
        try {
            emitter.once('newGamerTwo', async (userLat) => {
                res.json(userLat)
            })
        } catch (error) {}

    }

    async WithAllGamerVseTwo(req, res, next) {
        try {
            var userLat = await UserGamingLatereiaTwo.findAll()
            await res.json(userLat)
        } catch (error) {}
    }


    async GetWinUser(req, res){
        try {
            const { win, formula } = req.body
            var userLat = await UserGamingLatereiaTwo.findAll()
            for (let i = 0; i < userLat.length; i++) {
                const element = userLat[i];
                if (element.comand == win) {
                    const user  = await User.findOne({where: {userName: element.name}})
                    var coin = parseFloat(element.coin) * parseFloat(formula)
                    var userCoin = parseFloat(user.coin) + parseFloat(coin)
                    user.coin = userCoin
                    await user.save()
                    if (win == 'user') {
                        var userLat = await TopOneLatereiaTwo.create({ name: 'Люди' })
                    } else {
                        var userLat = await TopOneLatereiaTwo.create({ name: 'Боты' })
                    }
                    return res.json('ok')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async GetWinUserAllOff(req, res){
        try {
            var userLat = await UserGamingLatereiaTwo.findAll({where: {on_of: '0'}})
            for (let i = 0; i < userLat.length; i++) {
                const element = userLat[i];
                element.on_of = 1
                await element.save()
            }
            return res.json('ok')
        } catch (error) {
            // console.log(error);
        }
    }


    async AllTopGamerTwoGame(req, res){
        try {
            var userLat = await TopOneLatereiaTwo.findAll()
            return res.json(userLat)
        } catch (error) {
            // console.log(error);
        }
    }
}



module.exports = new UserController()
