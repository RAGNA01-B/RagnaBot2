import fg from 'api-dylux' 
import axios from 'axios'
import * as cheerio from 'cheerio'
import { tiktokdl } from '../lib/tiktok.js';
import { tiktok } from "@xct007/frieren-scraper";

let handler = async (m, { conn, text, args, usedPrefix, command}) => {
	if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${mid.smsTikTok2}\n*${usedPrefix + command} https://vm.tiktok.com/ZM6n8r8Dk/*`, fkontak,  m);
	if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}${mid.smsTikTok3}`, fkontak,  m);

	await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}${mid.smsTikTok4}`, fkontak,  m);

	try {
		const media = await tiktokdl(args[0]);
		let description = media.description;

		if (media?.images?.[0]) {
			for (let image of media.images) {
				conn.sendFile(m.chat, image.link, 'tiktok.jpeg', `${description ? `\n⛱️ ${mid.smsYT14}\n*${description}*` : ''}\n${wm}`.trim(), m);
			}
		} else {
				await conn.sendMessage(m.chat, { video: { url: media.video[0].link }, caption: `${description ? `\n⛱️ ${mid.smsYT14}\n*${description}*` : ''}\n${wm}`.trim() }, { quoted: m });
		};
	} catch (e) {
		console.error(e);
		await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
		console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
		console.log(e)
		handler.limit = false
	}
};

handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i
//handler.limit = 2
export default handler

async function tiktokdlF(url) {
if (!/tiktok/.test(url)) return 'Enlace incorrecto';
const gettoken = await axios.get("https://tikdown.org/id");
const $ = cheerio.load(gettoken.data);
const token = $("#download-form > input[type=hidden]:nth-child(2)").attr( "value" );
const param = { url: url, _token: token };
const { data } = await axios.request("https://tikdown.org/getAjax?", { method: "post", data: new URLSearchParams(Object.entries(param)), headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36" }, });
var getdata = cheerio.load(data.html);
if (data.status) {
return { status: true, thumbnail: getdata("img").attr("src"), video: getdata("div.download-links > div:nth-child(1) > a").attr("href"), audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"), }} else
return { status: false }}
