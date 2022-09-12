//get day one tab element
const dayOne = document.getElementById('day-one-tab')
//if day one tab is clicked
dayOne.addEventListener('click', async () => {
  //use fetch api to get day one program schedule from the database via ajax
  const data = await fetchScheduleData('2022-07-30')
  await renderScheduleByDay(data)

})


//get day two tab element
const dayTwo = document.getElementById('day-two-tab')
//if day two tab is clicked
dayTwo.addEventListener('click', async () => {
    //use fetch api to get day two program schedule from the database via ajax
    const data = await fetchScheduleData('2022-07-31')
    await renderScheduleByDay(data)

})

//get day three tab element
const dayThree = document.getElementById('day-three-tab')
//if day three tab is clicked
dayThree.addEventListener('click', async () => {
    //use fetch api method to get day three program schedule from the database via ajax
    const data = await fetchScheduleData('2022-08-01')
    await renderScheduleByDay(data)

})

//render the schedule data on the screen
const renderScheduleByDay = (scheduleData) => {
    let dayOneSchedule = document.querySelector('.tab-contents')
    dayOneSchedule.innerHTML = "";
    //loop through the schedule JSON data
    scheduleData.forEach(function (schedule) {

        const startTime = formatTime(schedule.start_time)
        const endTime = formatTime(schedule.end_time)

        const performer = (schedule.performer) ? `<h4 class=\"speaker-info\">By <span>${schedule.performer}</span> </h4>` : ''
        let newcontent = document.createElement('div');
        if(schedule.type == 'Break') {

            //replace the content of the DOM with new schedule data
            newcontent.innerHTML = `<div class="event__card break">
                <h4 class="time">${startTime} - ${endTime} </h4>
                <h3 class="event__card-title">${schedule.title}</h3>            
                ${performer}           
            </div>`
        }else{
            //replace the content of the DOM with new schedule data
            newcontent.innerHTML = `<div class="event__card ">                    
                <h4 class="time">${startTime} - ${endTime} </h4>
                <h3 class="event__card-title">${schedule.title}</h3>
                <em class="">${schedule.type}</em>
                <em class="channel">Channel ${schedule.channel}</em>
                ${performer} 
            </div>`
        }
        dayOneSchedule.appendChild(newcontent)
    })
}
const fetchScheduleData = async (eventDate) => {
  //use the fetch method to get event schedule from the server
  const scheduleData = fetch(`http://localhost:3000/schedule?eventDate=${eventDate}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
          'Content-Type': 'application/json'
      },
  })
      .then(res=> res.json())
      .then(data => {

        if(data[0]){
              return data
        }

  })

  //return the schedule data that was retrieved from the database
  return scheduleData
}