import fetch from 'node-fetch';

export function tiktokdl(url) {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await fetch("https://tikvid.io/api/ajaxSearch", {
                method: 'POST',
                body: new URLSearchParams(Object.entries({ q: url, lang: 'en' }))
            });

            data = await data.json();
            let $ = cheerio.load(data.data);
            let description = $('h3').text().trim(); 
            let meta = [];

            $('li').each((index, element) => {
                let thumbnail = $(element).find('.download-items__thumb img').attr('src');
                let link = $(element).find('.download-items__btn a').attr('href');
                let mimetype = 'image/jpeg';
                let ext = 'jpg';

                meta.push({ ext, mimetype, thumbnail, link });
            });

            $('.tik-right .dl-action a').each((index, element) => {
                let ext = /mp4/gi.test($(element).text().trim()) ? 'mp4' : 'mp3';
                let quality = $(element).text().trim().replace('Download MP4 ', '');
                let mimetype = ext === 'mp4' ? 'video/mp4' : 'audio/mp3';
                let link = $(element).attr('href');

                meta.push({ ext, mimetype, quality, link });
            });

            if (!meta[0]) return reject('Failure scrap tiktok!');

            let audio = meta.filter((c) => c.ext === 'mp3') || null;
            let video = meta.filter((c) => c.ext === 'mp4' && c.quality === 'HD') || null;
            let images = meta.filter((c) => c.ext === 'jpg') || null;

            resolve({
                description,
                video,
                audio,
                images
            });
        } catch(e) {
            reject(String(e));
        };
    });
};