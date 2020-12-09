var mentorMap = new Map();
var userMap = new Map();

module.exports = {
    userKey:function(id,name){
        userMap.set(id,name);
    },
    mentorKey:function(id,name){
        mentorMap.set(id,name);
    },
    getUserName:function(id){
        return userMap.get(id);
    },
    getMentorName:function(id){
        return mentorMap.get(id);
    },
    printUsers:function(){
        var entries = userMap.values();
        for(var entry of entries){
          console.log(entry);
        }
    },
};