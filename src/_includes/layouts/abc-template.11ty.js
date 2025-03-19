const { noteStringToHTML } = require('../noteMap.js');

exports.data = {
    layout: 'base.njk'
};

exports.render = function(data) {
    const abcData = data.abcData;
    const noteHTML = noteStringToHTML(abcData.notes);
    const artistInfo = abcData.composer ? `<p class="artist">By ${abcData.composer}</p>` : '';
    
    // Handle multiple titles
    let mainTitle = abcData.title;
    let subtitle = '';
    if (abcData.title.includes('\n')) {
        const parts = abcData.title.split('\n');
        mainTitle = parts[0] || 'Untitled';
        subtitle = parts[1] || '';
    }
    
    // Add line breaks to the notes
    const measures = abcData.notes;  // No need for extra processing
    
    // Reconstruct the ABC notation with explicit newlines
    const abcNotation = `X:1
T:${mainTitle}
T:${subtitle}
C:${abcData.composer || ''}
M:${abcData.meter}
L:${abcData.noteLength || '1/4'}
Q:${abcData.tempo || 180}
K:${abcData.key}
${measures}`;
    
    return `
        <script src="https://unpkg.com/abcjs@6.2.2/dist/abcjs-basic-min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/abcjs@6.2.2/abcjs-audio.css"/>
        <style>
            .player-section {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
            .player-section h2 {
                text-align: center;
                margin-bottom: 20px;
            }
            #paper {
                max-width: 700px;
                margin: 20px auto;
                padding: 20px;
            }
            #audio {
                max-width: 700px;
                margin: 20px auto;
            }
            .title-section {
                text-align: center;
                margin-bottom: 30px;
            }
            .subtitle {
                font-size: 1.2em;
                color: #666;
                margin-top: 5px;
            }
        </style>

        <div class="title-section">
            <h1>${mainTitle}</h1>
            ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
            ${artistInfo}
            <p>Key: ${abcData.key}, Time: ${abcData.meter}</p>
        </div>
        
        <div class="notation">
            ${noteHTML}
        </div>

        <div class="player-section">
            <h2>Sheet Music & Player</h2>
            <div id="audio"></div>
            <div id="paper"></div>
        </div>

        <script>
            window.addEventListener('load', function() {
                const abcNotation = ${JSON.stringify(abcNotation).replace(/\\n/g, '\\\\n')};
                
                // Create the sheet music visualization
                const visualObj = ABCJS.renderAbc("paper", ${JSON.stringify(abcNotation)}, {
                    responsive: "wrap",
                    add_classes: true,
                    format: {
                        gchordfont: "16px Arial",
                    },
                    wrap: {
                        preferredMeasuresPerLine: 4,
                        minSpacing: 1.8
                    },
                    staffwidth: 600,
                    scale: 1.2
                })[0];

                // Create the audio player
                if (ABCJS.synth.supportsAudio()) {
                    const synthControl = new ABCJS.synth.SynthController();
                    synthControl.load("#audio", null, {
                        displayLoop: true,
                        displayRestart: true,
                        displayPlay: true,
                        displayProgress: true,
                        displayWarp: true,
                        displayClock: true
                    });

                    const createSynth = new ABCJS.synth.CreateSynth();
                    createSynth.init({ visualObj: visualObj }).then(function() {
                        synthControl.setTune(visualObj, false);
                    }).catch(function(error) {
                        console.warn("Audio initialization failed:", error);
                    });
                } else {
                    document.querySelector("#audio").innerHTML = 
                        "Audio is not supported in this browser.";
                }
            });
        </script>
    `;
}; 