var create_lyrics = (artist, song)=>{
    var button = document.getElementsByClassName("button")[0];
    button.classList.add("button--loading");
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"artist_name":artist, "track_name":song});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://eaqmh9pnlb.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => {
        if (JSON.parse(result).statusCode == 200){
            var div = document.createElement("div");
            div.className = "lyrics";
            var title = document.createElement("h3");
            var link = document.createElement("a");
            link.setAttribute("href", JSON.parse(result).body.url);
            link.setAttribute("target", "_blank");
            link.innerHTML = song;
            title.appendChild(link);
            title.innerHTML += " - " + artist + ":"
            div.appendChild(title);
            var inner_div = document.createElement("div");
            inner_div.className = "image";
            var image = document.createElement("img");
            image.setAttribute("src", JSON.parse(result).body.image_url);
            image.setAttribute("alt", song + "image art");
            inner_div.appendChild(image);
            div.appendChild(inner_div);
            var lyrics = document.createElement("p");
            output = JSON.parse(result).body.lyrics;
            lyrics.innerHTML = output;
            div.appendChild(lyrics);
            document.getElementById("new_lyrics").prepend(div);
        } else {
            alert("Error getting lyrics for " + song + " by " + artist + ". Please try again.");
        }
        button.classList.remove("button--loading");
    })
    .catch(error => {
        button.classList.remove("button--loading");
        alert("Error getting lyrics for " + song + " by " + artist + ". Please try again.")
    });
}
