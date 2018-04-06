document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector("#newGame");
    var numberOfRows = 3;
    var numberOfColumns = 4;

    function colorGen() {
        var data = [];
        var data2 = [];
        var dataDouble = [];
        for (var i = 0; i < Math.ceil((numberOfRows * numberOfColumns) / 2); i++) {
            data.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        console.log(data);
        data2 = data.slice(0);
        dataDouble = data.concat(data2);
        console.log(dataDouble);
        shuffleArray(dataDouble);
        console.log(dataDouble);
        return dataDouble;
    }

    function createBoxes(colors) {
        var containerDOM = document.querySelector("#boxesContainer");
        for (var i = 1; i <= numberOfRows; i++) {
            var row = document.createElement("div");
            row.classList.add("row");
            containerDOM.appendChild(row);
            var rowDOM = document.querySelector(".row:last-child");
            for (var j = 1; j <= numberOfColumns; j++) {
                var box = document.createElement("div");
                box.id = createBoxID(i, j);
                box.classList.add("col-sm");
                box.classList.add("animated");
                box.style.setProperty("background-color", "#002A35");

                box.style.setProperty("height", "150px");
                box.style.setProperty("margin", "5px");
                box.dataset.bgcolor = colors[box.id];
                rowDOM.appendChild(box);
            }

        }
    }

    function twist() {
        var allActiveElements = [];
        var boxDiv = document.querySelectorAll(".col-sm");
        for (var i = 0; i < boxDiv.length; i++) {
            boxDiv[i].addEventListener('click', function() {
                var that = this;
                allActiveElements = getAllActiveElements();
                if (allActiveElements.length < 2) {
                    if (this.dataset.status != 1) {
                        this.classList.add("flipInX");
                        setTimeout(function() {
                            that.classList.remove("flipInX");
                        }, 800);
                        this.style.setProperty("background-color", this.dataset.bgcolor);
                        this.dataset.status = 1;
                    } else if (this.dataset.status == 1) {
                        this.classList.add("flipInX");
                        setTimeout(function() {
                            that.classList.remove("flipInX");
                        }, 800);
                        this.style.setProperty("background-color", "#002A35");
                        this.dataset.status = 2;
                    }
                } else if (allActiveElements.length >= 2) {
                    for (var i = 0; i < boxDiv.length; i++) {
                        boxDiv[i].style.setProperty("background-color", "#002A35");
                        boxDiv[i].dataset.status = 2;
                    }
                }
                check();
            })
        }
    }

    function createBoxID(i, j) {
        var boxID;
        if (i == 2) {
            boxID = (j + numberOfColumns);
        } else if (i == 3) {
            boxID = (j + numberOfColumns * 2);

        } else if (i == 4) {
            boxID = (j + numberOfColumns * 3);
        } else if (i == 5) {
            boxID = (j + numberOfColumns * 4);
        } else {
            boxID = j;
        }
        return boxID - 1
    }

    function check() {
        var tab = getAllActiveElements();
        var winningBoxes = document.querySelectorAll('[data-status="1"]');
        console.log(tab);
        if (tab[0] == tab[1] && tab.length != 0) {
            console.log("brawo");
            for (var i = 0; i < winningBoxes.length; i++) {
                winningBoxes[i].style.setProperty("visibility", "hidden");
                winningBoxes[i].dataset.status = 2;
                winningBoxes[i].dataset.hidden = true;

            }
            winner()
        }
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function getAllActiveElements() {
        var allActive = document.querySelectorAll('[data-status="1"]');
        var tab = [];
        for (var i = 0; i < allActive.length; i++) {
            tab.push(allActive[i].dataset.bgcolor);
            tab.sort(function compareNumbers(a, b) {
                return a - b
            })
        }
        return tab;
    }

    function clear() {
        document.querySelector("#winnerText").innerHTML = "";
        var myNode = document.querySelector("#boxesContainer");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    function winner() {
        var hiddenElements = document.querySelectorAll('[data-hidden=true]');
        console.log(hiddenElements.length);
        console.log(numberOfColumns * numberOfRows);
        if (hiddenElements.length == numberOfColumns * numberOfRows) {
            document.querySelector("#winnerText").innerHTML = "YOU WIN";
        }

    }










    button.addEventListener('click', function() {
        clear();
        createBoxes(colorGen());
        twist();
    })

    createBoxes(colorGen());
    twist();


})