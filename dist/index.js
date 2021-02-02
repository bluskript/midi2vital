"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const midi_1 = require("@tonejs/midi");
const fs_1 = require("fs");
const lfoRepr_1 = require("./lfoRepr");
const midiFile = fs_1.readFileSync(process.argv.slice(2)[0] || "./old-macdonald-had-a-farm.mid");
const midi = new midi_1.Midi(midiFile);
const strData = fs_1.readFileSync("./initial-preset.vital", {
    encoding: "utf-8",
});
const data = JSON.parse(strData);
const lfoNotes = [];
const voices = 6;
let voiceCounters = [];
const maxVoiceNotes = 45;
for (let i = 0; i < voices * 2; i++) {
    data.settings.modulations[i].line_mapping = {};
    data.settings.modulations[i].line_mapping.name = "generated" + i;
    data.settings.modulations[i].line_mapping.points = [];
    data.settings.modulations[i].line_mapping.num_points = 0;
    data.settings.modulations[i].line_mapping.powers = [];
    data.settings.modulations[i].line_mapping.points.push(0, 1);
    lfoNotes.push(0);
    voiceCounters.push(0);
}
const targetTrack = midi.tracks[0];
targetTrack.notes.forEach((v) => {
    const noteStartPercent = v.time / targetTrack.duration;
    const noteEndPercent = (v.time + v.duration) / targetTrack.duration;
    for (let i = 0; i < voices * 2; i += 2) {
        if (noteStartPercent < lfoNotes[i] || voiceCounters[i] > maxVoiceNotes) {
            continue;
        }
        lfoNotes[i] = noteEndPercent;
        voiceCounters[i]++;
        lfoRepr_1.applyNote(targetTrack, data.settings.modulations[i].line_mapping, data.settings.modulations[i + 1].line_mapping, noteStartPercent, noteEndPercent, v.name);
        break;
    }
});
for (let i = 0; i < voices * 2; i++) {
    data.settings.modulations[i].line_mapping.points.push(1, 1);
    data.settings.modulations[i].line_mapping.num_points = data.settings.modulations[i].line_mapping.points.length / 2;
    data.settings.modulations[i].line_mapping.powers = new Array(data.settings.modulations[i].line_mapping.num_points).fill(20);
}
fs_1.writeFileSync("./output.vital", JSON.stringify(data));
//# sourceMappingURL=index.js.map