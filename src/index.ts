import { Midi } from "@tonejs/midi";
import { readFileSync, writeFileSync } from "fs";
import { applyNote, pitchToLFO } from "./lfoRepr";
import { RootObject } from "./schema";

const midiData = readFileSync("./old-macdonald-had-a-farm.mid");
const midi = new Midi(midiData);
const strData = readFileSync("./initial-preset.vital", {
  encoding: "utf-8",
});
const data = JSON.parse(strData) as RootObject;
const lfoNotes = [];
data.settings.lfos.forEach((lfo) => {
  lfo.points = [];
  lfo.num_points = 0;
  lfo.powers = [];
  lfo.points.push(0, 0);
  lfo.points.push(0, 1);
  lfo.points.push(0, 0);
  lfoNotes.push(0);
});
const targetTrack = midi.tracks[0];
targetTrack.notes.slice(0, 30).forEach((v) => {
  const noteStartPercent = v.time / targetTrack.duration;
  const noteEndPercent = (v.time + v.duration) / targetTrack.duration;
  for (let i = 0; i < data.settings.lfos.length - 1; i += 2) {
    if (noteStartPercent < lfoNotes[i]) {
      continue;
    }
    lfoNotes[i] = noteEndPercent;
    lfoNotes[i + 1] = noteEndPercent;
    applyNote(
      targetTrack,
      data.settings.lfos[i],
      data.settings.lfos[i + 1],
      noteStartPercent,
      noteEndPercent,
      v.name
    );
    break;
  }
});
data.settings.lfos.forEach((lfo) => {
  lfo.points.push(1, 1);
  lfo.num_points = lfo.points.length / 2;
  lfo.powers = new Array(lfo.num_points).fill(0);
});

writeFileSync("./output.vital", JSON.stringify(data));
