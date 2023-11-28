const KEYWORD_TO_BIT = (function() {
    let map = new Map();

    const kws = document.body.getElementsByClassName("keyword");
    let bit_n = 0;
    for (const kw of kws) {
        map.set(kw.id, bit_n);
        bit_n += 1;
    }

    return map;
})();

const Bitset = KEYWORD_TO_BIT.size <= INT_SIZE ? SmallBitset : LargeBitset;

const BOX_TO_KEYWORD = (function () {
    let array = new Array();

    const boxes = document.body.getElementsByClassName("box");
    for (const box of boxes) {
        const kws = box.dataset.keywords.split(" ");
        let bitset = new Bitset(KEYWORD_TO_BIT.size);
        for (const kw of kws) {
            bitset.insert_nth_bit(KEYWORD_TO_BIT.get(kw));
        }
        array.push(bitset);
    }

    return array;
})();

let chosen_keywords = new Bitset(KEYWORD_TO_BIT.size);