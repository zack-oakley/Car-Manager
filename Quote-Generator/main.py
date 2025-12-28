from flask import Flask, jsonify

app = Flask(__name__)


# get quote based on inital input
def get_quote (initial):
     # mapping of initials to unique quotes   
    quote_map = {
    "a": ["A — Always aim higher than you think possible."],
    "b": ["B — Believe in your abilities, even on tough days."],
    "c": ["C — Consistency beats intensity every time."],
    "d": ["D — Determination turns goals into achievements."],
    "e": ["E — Every step forward counts, no matter how small."],
    "f": ["F — Focus on progress, not perfection."],
    "g": ["G — Great things take time—keep going."],
    "h": ["H — Hard work compounds; stay committed."],
    "i": ["I — Imagine the possibilities, then make them real."],
    "j": ["J — Just start; momentum will carry you."],
    "k": ["K — Keep pushing; your effort matters."],
    "l": ["L — Learn from yesterday, but live for today."],
    "m": ["M — Motivation follows action—get moving."],
    "n": ["N — Never underestimate your own potential."],
    "o": ["O — Opportunities grow when you stay open-minded."],
    "p": ["P — Persistence is your superpower."],
    "q": ["Q — Quitters never win; winners never quit."],
    "r": ["R — Rise above the challenges—they shape you."],
    "s": ["S — Stay strong; your best days are ahead."],
    "t": ["T — Trust the process and trust yourself."],
    "u": ["U — Unleash your potential one day at a time."],
    "v": ["V — Victory comes from preparation and patience."],
    "w": ["W — Work hard in silence; let results speak."],
    "x": ["X — X-factor: that unique strength only you have."],
    "y": ["Y — You are capable of more than you imagine."],
    "z": ["Z — Zest, drive, and determination define you."]
}


    quote = quote_map.get(initial)


    return quote


#Route to get a personalized quote based on an initial
@app.route('/quote/<initial>', methods=['GET'])
def get_data(initial):
    result = get_quote(initial)
    output = ({
        "quote": result[0]
    })

    return jsonify(output), 200







# run program
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8005, debug=True)