# midi2vital
## An automatic MIDI to Vital converter

Made by Bluskript, modifications and additions done by Vlams

The most useless thing i've ever made. Basically feed it a MIDI file with some really specific parameters (MUST be one track, minimize amount of overlapping notes!)
and it will spit out a Vital preset with your song encoded in it. I am truly sorry for making this.

[![DEMO](https://img.youtube.com/vi/AgG_4bDf9tg/0.jpg)](https://www.youtube.com/watch?v=AgG_4bDf9tg)

### This is kinda janky to use, can u fix?

I'm probably never gonna touch this project again, **PRs are welcome though.**

### Current limitations:
- Every voice can only play 45 notes (Vital LFOs have a maximum of 100 points)
- A maximum of 6 notes can be played at once with the included patch (though it should technically be possible to play up to 9 notes on both the left and right channel)