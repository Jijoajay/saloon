 import shavinghead from "../assets/shavinghead.png";
 import clock from "../assets/clock.png";
 import barbergirl from "../assets/barbergirl.png";
 import close from "../assets/close.png";
 import moneyimage from "../assets/moneyimage.png";

 export let  TYPES = ["Hair cut","Hair color","Beard","Facial","Groom Package"];
 export let  AVAILABLESERVICES = [
    {
        id:1,
        logo:shavinghead,
         heading:"Head Shave (Below 7 years)"
        ,timeimage:clock,time:"30 mins",
        money:"Rs.150",moneyimage:moneyimage,
        isAdded:false
    },
    {
        id:2,
        logo:barbergirl,
         heading:"Head Shave (Below 7 years)"
        ,timeimage:clock,time:"30 mins", 
        money:"Rs.150",moneyimage:moneyimage,
        isAdded:false
    },
];
