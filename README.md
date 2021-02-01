# midi2vital
## An automatic MIDI to Vital converter

The most useless thing i've ever made. Basically feed it a MIDI file with some really specific parameters (MUST be one track, minimize amount of overlapping notes!)
and it will spit out a Vital preset with your song encoded in it. I am truly sorry for making this.

[![DEMO](https://img.youtube.com/vi/AgG_4bDf9tg/0.jpg)](https://www.youtube.com/watch?v=AgG_4bDf9tg)

### This is kinda janky to use, can u fix?

I'm probably never gonna touch this project again, **PRs are welcome though.**

### Known unsupported features (for now):
- Support for more than 30 notes (Vital LFOs have a maximum of 100 points)
- Including all notes (Vital also doesn't have enough oscs to make any complex MIDIs play nicely.)
- Proper pitches for LFO levels (I'm bad at music theory please help)
