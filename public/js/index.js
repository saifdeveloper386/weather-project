const submit_btn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name_text = document.getElementById("city_name_text");
const temp_val = document.getElementById("temp_val");
const temp_status = document.getElementById("temp_status");
const hide_data = document.getElementById("hide_data");
const todays_date = document.getElementById("todays_date");
const day = document.getElementById("day");


const getcurrentday = () => {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var n = weekday[d.getDay()];
    let currenttime = new Date();
    let Day =weekday[currenttime.getDay()];
    return Day;
};
const getcurrenttime=()=>{
    var month=[
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ]
    var d = new Date();
    var month = month[ d.getMonth()];
    var date = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    let period="AM";
    if(hours >11){
        period = "PM";
        if(hours > 12) hours -= 12;
    };
    if(minutes<10){
        minutes="0"+minutes;
    }


    return `${date}  ${month}   | ${hours}:${minutes} ${period}`;
    
};
day.innerText=getcurrentday();
todays_date.innerText=getcurrenttime();
const get_info = async(event) => {
    event.preventDefault();
    let city_Name=cityName.value;
    // console.log(city_Name)
    if (city_Name==="") {
        city_name_text.innerText=`Enter city name before you click on search`
        hide_data.classList.add("data_hide")
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_Name}&units=metric&appid=220998c3e9fed319ffcc16acd32f0d05`
            const response = await fetch(url);
            const data = await response.json();
            const arrData=[data];
            // console.log(arrData[0].main.temp);
            city_name_text.innerText=`${arrData[0].name} , ${arrData[0].sys.country}`
            temp_val.innerText=arrData[0].main.temp;
            const temp_mode =arrData[0].weather[0].main
            console.log(temp_mode);
            if(temp_mode == "Sunny"){
                temp_status.innerHTML =` <i class='fa fa-sun' style='color:#eccc68'>${temp_mode}</i>`
            }else if(temp_mode == "Clouds"){
                temp_status.innerHTML =` <i class='fa fa-cloud' style='color:#f1f2f6'>${temp_mode}</i>`
            }else if(temp_mode == "Rain"){
                temp_status.innerHTML =` <i class='fas fa-cloud-rain' style='color:#44c3de'>${temp_mode}</i>`
            }
            else if(temp_mode == "Clear"){
                temp_status.innerHTML =` <i class='fas fa-cloud-sun' style='color:orange'>${temp_mode}</i>`
            }else{
                temp_status.innerHTML =` <i class='fa fa-cloud' style='color:#a4b0be'>${temp_mode}</i>`
            }
            
            hide_data.classList.remove("data_hide")
        } catch{
            city_name_text.innerText=`Please Enter City Name Properly`;
            hide_data.classList.add("data_hide")
        }
    }

}
submit_btn.addEventListener('click', get_info)