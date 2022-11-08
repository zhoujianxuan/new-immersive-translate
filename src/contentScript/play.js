  class AudioPlayer {
    /**
     * Defines the Service class for the text-to-speech service.
     */
    constructor() {
      this.audios = new Map();
      this.audioSpeed = 1.0;
    }

    /**
     * Transform text into audio and play then.
     * @param {string} fullText
     * @param {string} targetLanguage
     * @returns {Promise<void>} Promise\<void\>
     */
    async textToSpeech(fullText, targetLanguage) {
      const response = await getAudioURLs(fullText, targetLanguage);
      const keys = Object.keys(response);
      for (const key of keys) {
        this.audios.set(key, new Audio(response[key]));
      }

      return await this.play(
        keys.map((key) =>
          this.audios.get(key)
        )
      );
    }

    /**
     * Play the audio or all the audio in the array.
     * @param {HTMLAudioElement | HTMLAudioElement[]} audios
     */
    async play(audios) {
      this.stopAll();
      return await new Promise((resolve) => {
        try {
          if (audios instanceof Array) {
            const playAll = (/** @type {number} */ currentIndex) => {
              this.stopAll();
              const audio = audios[currentIndex];
              if (audio) {
                audio.playbackRate = this.audioSpeed;
                audio.play();
                audio.onended = () => {
                  playAll(currentIndex + 1);
                };
              } else {
                resolve();
              }
            };
            playAll(0);
          } else if (audios instanceof HTMLAudioElement) {
            audios.playbackRate = this.audioSpeed;
            audios.play();
            audios.onended = () => {
              resolve();
            };
          }
        } catch (e) {
          console.error(e);
          resolve();
        }
      });
    }

    /**
     * Sets the audio speed
     * @param {number} speed
     */
    setAudioSpeed(speed) {
      this.audioSpeed = speed;
      this.audios.forEach((audio) => {
        audio.playbackRate = this.audioSpeed;
      });
    }

    /**
     * Pause all audio and reset audio time to start
     */
    stopAll() {
      this.audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }

const audioPlayer = new AudioPlayer();


function getAudioURLs(text, targetLanguage) {

  return new Promise((resolve,reject) => {
    chrome.runtime.sendMessage({
            action: "getAudioURLs",
            text,
            targetLanguage
        }, (response) => {
          resolve(response)
		})
  })
}
