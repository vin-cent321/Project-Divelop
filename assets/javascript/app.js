new WOW().init();

$(document).ready(function () {

    $(document).on("click", ".content-btn", displayContent);

    var btnArray = ["HTML", "CSS", "JAVASCRIPT", "NODE.js"];

    function displayContent() {
        var input = $(this).attr("data-content");

        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + input,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            results = response.items;

            $("#bookContent").empty();

            for (let i = 0; i < results.length - 5; i++) {
                let bookImg = results[i].volumeInfo.imageLinks.smallThumbnail
                let bookTitle = results[i].volumeInfo.title + " - " + results[i].volumeInfo.subtitle;
                let bookPublisher = results[i].volumeInfo.publisher;
                let bookAuthor = results[i].volumeInfo.authors;
                let buyBook = results[i].saleInfo.buyLink;
                let available = results[i].saleInfo.saleability
                console.log("book " + i + " - " + bookImg + bookTitle + bookPublisher + bookAuthor + buyBook);
                let mainDiv = $("<div>", {
                    class: "text-center"
                });
                let TitleH2 = $("<h2>");
                let extraDiv = $("<div>");
                let publisherH3 = $("<h3>");
                let authorH4 = $("<h4>");
                let hr = $("<hr>")
                let bookImgTag = $("<img>", {
                    src: bookImg
                });
                let linkATag = $("<a>", {
                    href: buyBook ? buyBook : "Unavailable for Purchase"
                });
                TitleH2.text(bookTitle);
                publisherH3.text(bookPublisher);
                authorH4.text(bookAuthor);
                linkATag.text(available === "FOR_SALE" ? "Link To Buy" : "Not For Sale");
                extraDiv.append(linkATag);
                mainDiv.append(TitleH2, publisherH3, authorH4, bookImgTag, extraDiv, hr);
                $(mainDiv).prependTo("#bookContent");
            }
        });

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + input + "&type=video&key=AIzaSyCvqUrUAM3tsApawvpldjbR90NfJe629FU",
            key: "AIzaSyBrQPakOkX2Jxa4NvIKVD4cRyWPlB67Bx4",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var results = response.items;

            $("#videoContent").empty();

            for (var i = 0; i < results.length; i++) {
                var videoDiv = $("<div>", {
                    class: "wow slideInLeft"
                });
                var vidFrame = $("<iframe>");
                vidFrame.attr("src", "https://www.youtube.com/embed/" + results[i].id.videoId);
                videoDiv.append(vidFrame);
                //$("#vidDisplay").append(videoDiv);
                videoDiv.prependTo("#videoContent");
            }
            videoDiv.empty();
        });

        getAdvice();

    }

    function getAdvice() {

        var queryURL = "https://api.adviceslip.com/advice";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var advice = JSON.parse(response).slip.advice;
            $("#dayContent").html(advice);
            console.log("Advice - " + advice);
        });
    };

    var key = '54832f693a9d4141bb9b0f6d483fde23';
    var search = 'computer AND (software OR programming OR javascript OR coding OR jquery OR html OR css OR python OR database) NOT police NOT trump NOT murder NOT sneaker NOT unity NOT slides NOT ebay NOT offer NOT sale';
    var sort = 'popularity';
    // ADDED MOMENT.JS FOR TODAYS NEWS
    var date = moment().format('YYYY MM DD');
    console.log(date);
    $.ajax({
        url: 'https://newsapi.org/v2/everything?q=' + search + '&from=' + date + '&language=en' + '&sortBy=' + sort + '&apikey=' + key,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        var results = response.articles;
        console.log(results.length);
        //IF WE NEED LESS ARTICLES PLACE "-X" BEHIND RESULTS.LENGTH EX. "i < results.length -16"
        for (var i = 0; i < results.length; i++) {
            console.log("article " + i + " - " + results[i].description);
            console.log("article " + i + " - " + results[i].title);
            console.log("article " + i + " - " + results[i].url);
            console.log("article " + i + " - " + results[i].content);
            //CREATED VARIABLES THAT RESPOND TO BOOTSTRAP HTML
            var contentHolderHTML = $("#headingOne");
            var div = $("<div class='accordion card card-header mb-0' id='accordionExample'>");
            var resultsTitle = $("<button class='btn btn-link news-button' type='button' data-toggle='collapse' data-target='#collapse" + i + "'' aria-expanded='false' aria-controls='collapseOne'></button>");
            // TO ADD TO VINCENT FINAL COPY
            var resultsDescription = $(" <div id='collapse" + i + "' class='collapse collapse-color' aria-labelledby='headingOne' data-parent='#accordionExample'><div class='card-body'>");
            var resultsUrl = $(" <div id='collapse" + i + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordionExample'><div class='card-body'> <a href='" + results[i].url + "'> Read More...</a> </div>");
            /*
                Can bootstrap classes maintain format after being placed in jquery function? YES
                 `->How should I change href for bootstrap layout to maintain? URL FORMAT SHOULD WORK
                What can I use with variables I have already defined to make it work within what I already have? UPS
            */
            resultsDescription.text(results[i].description);
            //resultsContent.text(results[i].content);
            resultsTitle.text(results[i].title);
            div.append(resultsTitle, resultsDescription, resultsUrl); //resultsContent
            div.appendTo("#articleContent");
        }
    });


    function renderButtons() {
        $("#btnHome").empty();
        for (i = 0; i < btnArray.length; i++) {
            var a = $("<button>", {
                class: "bounceIn btn btn-primary"
            });
            a.addClass("content-btn");
            a.attr("data-content", btnArray[i]);
            a.text(btnArray[i]);
            $("#btnHome").prepend(a);
        }
    };

    $(".btn").on("click", function (event) {
        event.preventDefault();
        var newBtn = $("#inputSearch").val().trim();
        btnArray.push(newBtn);
        renderButtons();
    });

    renderButtons();


});