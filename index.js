const workout = [
    {
        speed: 4,
        incline: 0.5,
        time: 120
    },
    {
        speed: 6.5,
        incline: 0.5,
        time: 120
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 180
    },
    {
        speed: 6.5,
        incline: 0.5,
        time: 120
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 180
    },
    {
        speed: 9.0,
        incline: 0.5,
        time: 60
    },
    {
        speed: 4,
        incline: 0.5,
        time: 60
    },
    {
        speed: 6.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 6.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 9.0,
        incline: 0.5,
        time: 60
    },
    {
        speed: 4.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 6.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 5.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 7.5,
        incline: 0.5,
        time: 60
    },
    {
        speed: 9,
        incline: 0.5,
        time: 60
    },
    {
        speed: 4,
        incline: 0.5,
        time: 120
    }
];

var index = 0;

var hasStarted = false;

var isPaused = false;

var totalTime = 0;

for (let index in workout) {
    totalTime += workout[index].time;
}

function convertTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;

    if (minutes === 0) {
        return "" + seconds;
    }
    else if (seconds < 10) {
        return minutes + ":0" + seconds;
    }
    else {
        return minutes + ":" + seconds;
    }

}

function startWorkout() {
    if (!hasStarted) {
        hasStarted = true;
        document.querySelector("h3").innerHTML = "NEXT UP";
        document.querySelector("#actionbutton").innerHTML = "Pause";
        document.querySelector("#speednow").innerHTML = "SPEED: " + workout[0].speed + " MPH";
        document.querySelector("#inclinenow").innerHTML = "INCLINE: " + workout[0].incline + "%";
        document.querySelector("#timenow").textContent = convertTime(workout[0].time);
        nextAction();
    }
    else {
        isPaused = !isPaused;
        document.querySelector("#actionbutton").innerHTML = isPaused ? "Continue" : "Pause";
    }
}

function flashScreen() {
    document.querySelector(".info").classList.add("flash");
    setTimeout(() => {
        document.querySelector(".info").classList.remove("flash");
    }, 250);
}

function nextAction() {
    const next = workout[index];

    flashScreen();
    setTimeout(() => {
        flashScreen();
    }, 450) 

    if (index === workout.length - 1) {
        doAction(next, next.time);
        document.querySelector("#speednext").innerHTML = "";
        document.querySelector("#inclinenext").innerHTML = "";
        document.querySelector("#timenext").textContent = "";
    }
    else if (index === workout.length) {
        hasStarted = false;
        index = 0
        document.querySelector("#actionbutton").innerHTML = "Reset";
        alert("Workout Completed");
    }
    else {
        doAction(next, next.time);
        const nextAfter = workout[index + 1];
        document.querySelector("#speednext").innerHTML = "SPEED: " + nextAfter.speed + " MPH";
        document.querySelector("#inclinenext").innerHTML = "INCLINE: " + nextAfter.incline + "%";
        document.querySelector("#timenext").textContent = (nextAfter.time / 60) + " min";
    }
}

function doAction(action, timeLeft) {
    var i = timeLeft;
    setTimeout(function() {
    document.querySelector("#speednow").innerHTML = "SPEED: " + action.speed + " MPH";
    document.querySelector("#inclinenow").innerHTML = "INCLINE: " + action.incline + "%";
    document.querySelector("#timenow").textContent = convertTime(i);
    if (isPaused === false) {
        i--;
    }
    if (i >= 0) {
        doAction(action, i);
    }
    else {
        index++;
        nextAction();
    }
    }, 1000)
    
}