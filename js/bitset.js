const INT_SIZE = 32;
const ALL_ONES = -1 >> 0;

// With zero-based numbering
class SmallBitset {
    #bits;

    constructor(n_bits) {
        this.#bits = 0;
    }

    empty() {
        return this.#bits === 0;
    }

    has_nth_bit(n) {
        return (this.#bits | ~(1 << n)) === ALL_ONES;
    }

    has(smallbitset) {
        return (this.#bits | ~smallbitset.#bits) === ALL_ONES;
    }

    insert_nth_bit(n) {
        this.#bits |= 1 << n;
    }

    remove_nth_bit(n) {
        if (this.has_nth_bit(n)) {
            this.#bits = ~(~this.#bits | (1 << n));
        }
    }

    clear() {
        this.#bits = 0;
    }
}

// With zero-based numbering
class LargeBitset {
    #bits;
    #is_empty;

    constructor(n_bits) {
        const capacity = Math.ceil(n_bits / INT_SIZE);
        this.#bits = new Int32Array(capacity);
        this.#is_empty = true;
    }

    empty() {
        if (this.#is_empty == undefined) {
            for (const bucket of this.#bits) {
                if (bucket != 0) {
                    this.#is_empty = false;
                }
            }
            this.#is_empty == true;
        }
        return this.#is_empty;
    }

    has_nth_bit(n) {
        const bucket_n = Math.trunc(n / INT_SIZE);
        return (this.#bits[bucket_n] | ~(1 << n)) === ALL_ONES;
    }

    has(largebitset) {
        if (this.#is_empty) {
            return largebitset.#is_empty;
        }

        const size = Math.min(this.#bits.length, largebitset.#bits.length);
        for (let bucket_n = 0; bucket_n < size; ++bucket_n) {
            const result = this.#bits[bucket_n] | ~largebitset.#bits[bucket_n];
            if (result !== ALL_ONES) {
                return false;
            }
        }
        for (let bucket_n = this.#bits.length;
                bucket_n < largebitset.#bits.length; ++bucket_n) {
            if (largebitset.#bits[bucket_n] !== 0) {
                return false;
            }
        }
        return true;
    }

    insert_nth_bit(n) {
        const bucket_n = Math.trunc(n / INT_SIZE);
        this.#bits[bucket_n] |= 1 << n;
        this.#is_empty = false;
    }

    remove_nth_bit(n) {
        if (this.has_nth_bit(n)) {
            const bucket_n = Math.trunc(n / INT_SIZE);
            this.#bits[bucket_n] = ~(~this.#bits[bucket_n] | (1 << n));
        }
        this.#is_empty = undefined;
    }

    clear() {
        for (let bucket of this.#bits) {
            bucket = 0;
        }
        this.#is_empty = true;
    }
}