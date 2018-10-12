    var svg = d3.select("#container")
        .attr("width", innerWidth)
        .attr("height", 41);

    var bottomBar = d3.select("#bottom")
        .attr("width", innerWidth)
        .attr("height", 41);

    var bar = d3.select("#bar")
        .attr("height", 41)
        .attr("width", 0)
        .attr("fill", "#000")
        .attr("fill-opacity",0.15);


    var playKey = d3.select("#play")
        .attr("width", 40)
        .attr("height", 40);
    var pauseKey = d3.select("#pause")
        .attr("width", 40)
        .attr("height", 40)
        .attr("style", "display:none;");
    var display = "pause";

    var audio = document.querySelector("#audio");
    var audioDuration = audio.duration;

    function getCallback(callback) {
        var key = d3.select("#key")
            .append("rect")
            .attr("width", 40)
            .attr("height", 40)
            .attr("fill", "#fff")
            .attr("style", "fill-opacity:0;")
            .on("click", () => {
                if (display == "pause") {
                    pauseKey.attr("style", "display:inner");
                    playKey.attr("style", "display:none");
                    display = "play";
                    callback("play");
                } else {
                    playKey.attr("style", "display:inner");
                    pauseKey.attr("style", "display:none");
                    display = "pause";
                    callback("pause");
                }
            });
    }

    getCallback(callback);

    var barWidth = 0;

    // 播放暂停的回调函数,param="play/pause"为播放/暂停
    function callback(param) {
        if (param == "play") {
            if (audio.currentTime < audio.duration) {
                console.log("播放");
                audio.play();
                setInterval(() => {
                    var percent = audio.currentTime / audio.duration;
                    barWidth = percent * innerWidth;
                    bar.attr("width", barWidth);
                })
            }
        } else {
            audio.pause();
        }
    }