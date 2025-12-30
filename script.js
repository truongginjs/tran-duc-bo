// read `model` from query string: e.g. ?model=jackienjine
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const modelParam = (getQueryParam('model') || '').toLowerCase();
let resourceFolder;
if (modelParam === 'jackienjine') {
    resourceFolder = 'jackienjine';
} else if (modelParam === 'minhbeo') {
    resourceFolder = 'minhbeo';
} else if (modelParam === 'bebo') {
    resourceFolder = 'bebo';
} else {
    resourceFolder = 'tranducbo';
}

const audioMeo = new Audio(`./resource/${resourceFolder}/sound.wav`);
const audioOhno = new Audio('./resource/ohnoshort.wav');

function setHeightTamche() {
    $('.tam-che').height($(window).height() - $('#hop').offset().top - 150)
}

$(window).on('load', setHeightTamche)
$(window).resize(setHeightTamche)

// ensure model image is loaded from the correct resource folder
$(window).on('load', function () {
    $('.model .image').attr('src', `./resource/${resourceFolder}/image.png`);
    // add classes for model-specific styling
    if (resourceFolder === 'jackienjine') {
        $('.model').addClass('jackienjine');
        $('.model').removeClass('minhbeo bebo');
    } else if (resourceFolder === 'minhbeo') {
        $('.model').addClass('minhbeo');
        $('.model').removeClass('jackienjine bebo');
    } else if (resourceFolder === 'bebo') {
        $('.model').addClass('bebo');
        $('.model').removeClass('jackienjine minhbeo');
    } else {
        $('.model').removeClass('jackienjine minhbeo bebo');
    }
});

function pauseAudio(audio) {
    audio.pause()
    audio.currentTime = 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let present = $(".present")

present.mouseenter(() => {
    if (audioMeo.duration > 0 && !audioMeo.paused) {
        audioOhno.play()
    }
})

present.mouseout(function () {
    pauseAudio(audioOhno)
});

present.click(async function () {
    // tranDucBo.addClass('animation-bo')

    pauseAudio(audioOhno)
    audioMeo.play()

    let nap = $("#nap");
    let model = $('.model');
    let background = $('.background')
    let tamche = $('.tam-che');
    let clickhere = $('.clickhere')
    let items = $('.items')

    clickhere.addClass('visible')
    background.addClass('shake run')
    tamche.addClass('shake run')
    items.addClass('appear')

    model.addClass("appear");
    await sleep(10)
    nap.addClass("present-rotate")
    model.addClass("move")

    await sleep(audioMeo.duration * 1000)

    background.removeClass('shake run')
    tamche.removeClass('shake run')
    model.removeClass("move")
    nap.removeClass("present-rotate")
    items.removeClass('appear')
});
