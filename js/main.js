class CreateDataBase{
    constructor(name){
        this.name = name

        this.init = () => {
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB([])
            }
        }

        this.updateDB = (data) => {
            localStorage.setItem(this.name, JSON.stringify(data))
        }

        this.allData = () => {
            this.init()
            return JSON.parse(localStorage.getItem(this.name))
        }

    }


    addUser(userCreds){
        let allUser = this.allData()
        if(allUser.length === 0){
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        else{
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        allUser.push(userCreds)
        this.updateDB(allUser)
    }
}


class CurrentUser extends CreateDataBase{
    constructor(name){
        super(name)
        this.init = () =>{
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB({})
            }
        }
    }


    userWho(data){
        this.updateDB(data)
    }

    
    checkUser(){
        let data = {}
        this.updateDB(data)
    }
}


class UserDataBase extends CreateDataBase{
    constructor(name){
        super(name)
        this.init = () =>{
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB({})
            }
        }
    }


    dataHolder(info){
        let usersAllData = this.allData()
        if(Object.keys(usersAllData).length === 0){
            console.log(5)
            usersAllData.listed = []
            usersAllData.requested = []
            usersAllData.personalInfo = []
            usersAllData.personalInfo.push(info)
            this.updateDB(usersAllData)
        }
    }

    listCars(carData){
        let usersAllData = this.allData()
        if(usersAllData.listed.length === 0){
            console.log(5)
            carData.id = 0
            carData.requestedBy = []
            carData.requestHistory = []
            usersAllData.listed.push(carData)
            this.updateDB(usersAllData)
            return 0
        }
        else{
            let uniqueId = usersAllData.listed.length
            carData.id = uniqueId
            carData.requestedBy = []
            carData.requestHistory = []
            usersAllData.listed.push(carData)
            this.updateDB(usersAllData)
            return uniqueId
        }
    }


    carRented(no, requester){
        let usersAllData = this.allData()
        usersAllData.listed[no].requestedBy.push(requester)
        usersAllData.listed[no].requestHistory.push(requester)
        this.updateDB(usersAllData)
    }


    carRequested(carInfo){
        let usersAllData = this.allData()
        usersAllData.requested.push(carInfo)
        this.updateDB(usersAllData)
    }
    
}


class Ledger extends CreateDataBase{
    constructor(name){
        super(name)
    }


    addToLedger(carData){
        let allData = this.allData()
        allData.unshift(carData)
        this.updateDB(allData)
    }

}


let regUsers = new CreateDataBase('Registered_Users')
let lgdUser = new CurrentUser('Current_User')
let carLedger = new Ledger('listed_car_ledger')