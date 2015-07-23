angular.module('starter.services', [])

.factory("getRoom", function(room_id){
    var result = {};
    new Firebase("https://amber-inferno-7387.firebaseio.com/chat/room/" + room_id).child("room_name")
        .once("value", function (snap) {
            result = snap;
        });
    return result;
})

.factory("chatMessages", ["$firebaseArray",
  function ($firebaseArray) {
      return function (room) {
          var ref = new Firebase("https://amber-inferno-7387.firebaseio.com/chat/message");
          ref = ref.orderByChild("room").equalTo(room);
          return $firebaseArray(ref);
      }
  }
])

.factory("getRooms", ["$firebaseArray",
    function ($firebaseArray) {
        var ref = new Firebase("https://amber-inferno-7387.firebaseio.com/chat/room");
        return $firebaseArray(ref);
    }
])
    /*
.factory("getRoom", ["$firebaseObject",
    function ($firebaseObject) {
        return function (room_id) {
            var ref = new Firebase("https://amber-inferno-7387.firebaseio.com/chat/room/" + room_id);
            return $firebaseObject(ref.child("room_name"));
        }
    }
])
*/