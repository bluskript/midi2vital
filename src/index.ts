import { Midi } from "@tonejs/midi";
import { readFileSync, writeFileSync } from "fs";
import { applyNote } from "./lfoRepr";
import { RootObject, Lfo } from "./schema";

const args = process.argv.slice(2);
const midiFile = readFileSync(args[0] || "./old-macdonald-had-a-farm.mid");
const midi = new Midi(midiFile);
const strData = readFileSync("./initial-preset.vital", {
  encoding: "utf-8",
});
const data = JSON.parse(strData) as RootObject;
const lfoNotes = [];

const voices = parseInt(args[1]) || 6;
let voiceCounters = [];
let voiceNotes = [];
const maxVoiceNotes = 45;

for (let i = 0; i < voices*2; i++) {
  const currentMod = data.settings.modulations[i]
  currentMod.line_mapping = {} as Lfo;
  currentMod.line_mapping.name = "generated" + i;
  currentMod.line_mapping.points = [];
  currentMod.line_mapping.num_points = 0;
  currentMod.line_mapping.powers = [];
  currentMod.line_mapping.points.push(0, 1);
  lfoNotes.push(0);
  voiceCounters.push(0);
}

const targetTrack = midi.tracks[0];
targetTrack.notes.forEach((v) => {
  const noteStartPercent = v.time / targetTrack.duration;
  const noteEndPercent = (v.time + v.duration) / targetTrack.duration;
  for (let i = 0; i < voices*2; i += 2) {
    if (noteStartPercent < lfoNotes[i] || voiceCounters[i] > maxVoiceNotes) {
      continue;
    }
    lfoNotes[i] = noteEndPercent;
    voiceCounters[i]++;

    applyNote(
      targetTrack,
      data.settings.modulations[i].line_mapping,
      data.settings.modulations[i + 1].line_mapping,
      noteStartPercent,
      noteEndPercent,
      v.name,
      voiceNotes[i]
    );
    voiceNotes[i] = v.name;
    break;
  }
});

for (let i = 0; i < voices*2; i++) {
  data.settings.modulations[i].line_mapping.points.push(1, 1);
  data.settings.modulations[i].line_mapping.num_points = data.settings.modulations[i].line_mapping.points.length / 2;
  data.settings.modulations[i].line_mapping.powers = new Array(data.settings.modulations[i].line_mapping.num_points).fill(20);
}

writeFileSync("./output.vital", JSON.stringify(data));
