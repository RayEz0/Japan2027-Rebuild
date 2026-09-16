import { migrateStorage, scopedStorageKey, migrateToScopedKey } from '../../utils/storage'

const INITIAL_GIFTS = {
  japan2027: [
    { id: 1, name: 'Japanese Kit Kat assortment — Matcha, Sake, Cheesecake', where: 'Don Quijote, Osaka Dotonbori', est: 3000, done: false },
    { id: 2, name: 'Matcha / Hojicha powder tins — premium grade', where: 'Nishiki Market, Kyoto', est: 2500, done: false },
    { id: 3, name: 'Loft stationery — notebooks, washi tape, stamps', where: 'Loft, Osaka or Shibuya', est: 2000, done: false },
    { id: 4, name: 'Wagashi — traditional sweets, individually wrapped', where: 'Kyoto Station', est: 2000, done: false },
    { id: 5, name: 'Japanese skincare — sheet masks, Hada Labo rice essence', where: 'Don Quijote, Osaka', est: 2000, done: false },
    { id: 6, name: 'Pocky + Pretz — limited Japan flavours only', where: '7-Eleven / Don Quijote', est: 1500, done: false },
    { id: 7, name: 'Furoshiki wrapping cloth — reusable traditional fabric', where: 'Nishiki Market, Kyoto', est: 1500, done: false },
    { id: 8, name: 'Omamori — temple good luck charms', where: 'Fushimi Inari Taisha / Sensoji', est: 1000, done: false },
  ],
  scotland: [
    { id: 1, name: 'Talisker Single Malt Whisky — Skye Distillery exclusive', where: 'Talisker Distillery, Carbost', est: 4500, done: false },
    { id: 2, name: 'Harris Tweed flat cap or scarf', where: 'Harris Tweed shop, Royal Mile, Edinburgh', est: 3500, done: false },
    { id: 3, name: 'Walkers shortbread assortment tin', where: 'Edinburgh shops / Airport', est: 1500, done: false },
    { id: 4, name: "Tunnock's tea cakes & caramel wafers", where: 'Any supermarket (Tesco, Lidl)', est: 800, done: false },
    { id: 5, name: 'Isle of Skye Sea Salt', where: 'Skye Seasalt, Portree', est: 1200, done: false },
    { id: 6, name: 'Mackays Dundee marmalade', where: 'Edinburgh supermarket or gift shops', est: 900, done: false },
    { id: 7, name: 'Glencoe / Highlands photography print', where: 'Glencoe Visitor Centre or local gallery', est: 2000, done: false },
    { id: 8, name: 'Highland Park whisky miniature set', where: 'Duty Free, Edinburgh Airport', est: 2500, done: false },
  ],
}

export function createGiftService(tripId, userId) {
  migrateStorage(tripId, 'gifts')
  migrateToScopedKey(tripId, 'gifts')
  const key = scopedStorageKey(userId, tripId, 'gifts')
  const initial = INITIAL_GIFTS[tripId] ?? []
  return {
    load()        { try { const p = JSON.parse(localStorage.getItem(key)); return Array.isArray(p) ? p : initial } catch { return initial } },
    save(entries) { try { localStorage.setItem(key, JSON.stringify(entries)) }       catch { /* intentional */ } },
  }
}
