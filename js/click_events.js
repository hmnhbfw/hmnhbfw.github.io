document.body.querySelectorAll(".keyword").forEach(button => {
    button.onclick = function() {
        const keyword = button.id;
        button.classList.toggle("chosen");

        const is_chosen = button.classList.contains("chosen");
        if (is_chosen) {
            chosen_keywords.insert_nth_bit(KEYWORD_TO_BIT.get(keyword));
        } else {
            chosen_keywords.remove_nth_bit(KEYWORD_TO_BIT.get(keyword));
        }

        let reset_button = document.getElementById("reset_button");
        if (chosen_keywords.empty()) {
            reset_button.style.display = "none";
        } else {
            reset_button.style.display = "block";
        }

        let box_n = 0;
        for (let box of document.body.getElementsByClassName("box")) {
            if (BOX_TO_KEYWORD[box_n].has(chosen_keywords)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
            box_n += 1;
        }
    };
});

document.getElementById("reset_button").onclick = function() {
    let reset_button = document.getElementById("reset_button");
    reset_button.style.display = "none";
    chosen_keywords.clear();

    for (let keyword of document.querySelectorAll(".keyword")) {
        keyword.classList.remove("chosen");
    }

    for (let box of document.body.getElementsByClassName("box")) {
        box.style.display = "block";
    }
};