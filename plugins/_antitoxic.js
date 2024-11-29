const toxicRegex = /wueqiuoqfskxcvxncvhjdkfhuifhuiqyrukhjaskhdsjakhquyweyhudxjkczxnbuiyasdgshda/i

let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) { 
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup)
return !1
let delet = m.key.participant
let bang = m.key.id
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
let img = 'https://telegra.ph/file/d8d292eb0b2a3829e6720.png'
const isToxic = toxicRegex.exec(m.text)
    
if (isToxic && chat.antitoxic && !isOwner && !isAdmin && isBotAdmin) {
if (chat.delete) return conn.reply(m.chat, mid.mAdvertencia + mid.mAntiDelete, m)
user.warn += 1
if (!(user.warn >= 4)) {
await conn.reply(m.chat, mid.antitoxic1(isToxic, m, user), m)
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
}

if (user.warn >= 4) {
if (chat.delete) return conn.reply(m.chat, mid.mAdvertencia + mid.mAntiDelete, m)
user.warn = 0
await conn.reply(m.chat, mid.antitoxic2(isToxic, m, user), m)
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
//await this.updateBlockStatus(m.sender, 'block')
}}
return !1
}
export default handler
