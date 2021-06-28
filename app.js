const app = () =>{
    const song = document.querySelector('.song');
    const start = document.querySelector('.start');
    const restart = document.querySelector('.restart');
    const pause = document.querySelector('.pause');
    const outline = document.querySelector('.moving-outline circle');

    //sounds
    const sounds = document.querySelectorAll('.song-mood');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.duration button');

    //get the length of outline
    const outlineLength = outline.getTotalLength();

    //duration
    let fakeDuration = 120;

    //outline animation
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            checkPlaying(song);
        });
    });

    //play sound
    start.addEventListener('click', function(){
        checkPlaying(song);
    });
    pause.addEventListener('click', ()=>{
        song.pause();
    });

    //restart song
    restart.addEventListener('click', ()=>{
        song.currentTime = 0;
    });

    

    //select sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        })
    }); 

    //function specific to stop and play
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
        } else{
            song.pause();
        }
    }

    //we can animate circle
    song.ontimeupdate = ()=> {
        let currentTime = song.currentTime;
        let elapsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        //animate cirlce
        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
        }
        if(typeof song.loop == 'boolean'){
            song.loop = true;
            } else{
            song.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
            }, false);
        }
    };


};

app();