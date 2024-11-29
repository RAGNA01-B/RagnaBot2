import axios from 'axios';

export function ytDownload(url, type = 'audio') {
    return new Promise(async(resolve, reject) => {
        try {
            let id = url.match(/(?<=watch\?v=|\/videos\/|embed\/|youtu.be\/|\/v\/|watch\?v%3D|%2Fvideos%2F|embed%2F|youtu.be%2F|%2Fv%2F)[^#\&\?\n]*/g);
            url = 'https://www.youtube.com/watch?v=' + id[0];
    
            let { data } = await axios({
                url: 'https://cnvmp3.com/fetch.php',
                method: "POST",
                data: JSON.stringify({ filenamePattern: "pretty", isAudioOnly: /audio/.test(type), url: url })
            });

            if (data?.url) return resolve(data.url);

            reject('Error convert video from youtube.com');
        } catch(e) {
            reject(e);
        }
    });
};