// 曼谷之旅資料 2026/07/15-2026/07/18
window.TRIP = {
  meta: {
    title: "曼谷之旅",
    subtitle: "Bangkok",
    startDate: "2026-07-15",
    endDate: "2026-07-18",
    days: 4,
    people: "團體出遊",
    city: "曼谷 Bangkok",
    currency: "泰銖 THB（1 TWD ≈ 1 THB，目前約 1:1）",
  },

  itinerary: [
    {
      day: 1, date: "7/15", weekday: "三", title: "落地曼谷，下午自由活動",
      theme: "Arrival",
      summary: "08:00 桃園出發（香港轉機）→ 14:00 抵達 BKK → Adelphi Suites Check-in → 下午自由安排",
      blocks: [
        { time: "08:00", icon: "✈️", title: "桃園機場出發", nomap: true, detail: "CX407 國泰航空，08:00 TPE 起飛，10:00 抵達香港" },
        { time: "10:00", icon: "✈️", title: "香港轉機", nomap: true, detail: "轉機約 2 小時，接續 CX653，12:00 香港起飛" },
        { time: "14:00", icon: "✈️", title: "抵達 BKK 素萬那普機場", detail: "出關後前往飯店 Adelphi Suites" },
        { time: "下午", icon: "🏨", title: "Adelphi Suites Check-in", detail: "飯店在 Sukhumvit Soi 8（近 BTS Nana），放好行李後自由活動、附近走走" },
        { time: "晚上", icon: "🍜", title: "自由活動 / 覓食", nomap: true, detail: "Sukhumvit 8 一帶選擇多，第一天先輕鬆逛逛、簡單吃，不排重頭戲" },
      ],
      tips: "去程改搭國泰航空經香港轉機，14:00 就抵達曼谷，下午時間多，check-in 後自由安排即可。",
    },
    {
      day: 2, date: "7/16", weekday: "四", title: "Siam 血拼，晚上看秀逛夜市",
      theme: "Shopping & Show",
      summary: "Siam 區 → Siam Paragon 採購精品 → 金東尼人妖秀 → Jodd Fairs 夜市",
      blocks: [
        { time: "上午", icon: "🚇", title: "Siam 區", mapurl: "https://maps.app.goo.gl/Vu5HNqYRqSfDLJrg6", detail: "曼谷最熱鬧的購物中心區，百貨一間連一間，逛街從這裡開始" },
        { time: "上午", icon: "🛍️", title: "Siam Paragon 採購精品", mapurl: "https://maps.app.goo.gl/AHQy2Ff3bvMT2EaP7", detail: "曼谷最指標的豪華百貨，M 層國際精品、G 層美食廣場，精品採購主力在這" },
        { time: "中午", icon: "🍽️", title: "午餐：Paragon 美食廣場", nomap: true, detail: "G 層美食廣場選擇多，逛累了直接在百貨裡解決一餐" },
        { time: "晚上", icon: "🎭", title: "金東尼人妖秀", detail: "曼谷經典人妖歌舞秀，華麗服裝與表演很值得一看，建議先線上訂票選好場次" },
        { time: "晚些", icon: "🌃", title: "Jodd Fairs 夜市", detail: "曼谷人氣夜市，小吃、攤販、火山排骨都有，邊吃邊逛收尾" },
      ],
      tips: "金東尼人妖秀建議先訂票；Jodd Fairs 入夜後最熱鬧，現金為主。",
    },
    {
      day: 3, date: "7/17", weekday: "五", title: "變裝拍照，臥佛寺河岸一次收",
      theme: "Costume & Temple",
      summary: "ICONSIAM → ONE DAY MASTER 租服裝 → 臥佛寺街拍 → 帕空花市 → 曼谷紀念大橋 → 泰服進臥佛寺 → Chom Arun",
      blocks: [
        { time: "上午", icon: "🚇", title: "BTS Saphan Taksin 轉接駁船 → ICONSIAM", mapurl: "https://maps.app.goo.gl/Vf7njfnNPPAQPCb1A", detail: "搭 BTS 到 Saphan Taksin 站，再轉免費接駁船前往 ICONSIAM" },
        { time: "上午", icon: "🏢", title: "ICONSIAM", detail: "超豪華百貨，室內水上市場很好拍，B1 美食區品項多，建議留 2 小時以上" },
        { time: "中午", icon: "👗", title: "ONE DAY MASTER 租借服裝", mapurl: "https://maps.app.goo.gl/vJaPC6UXgK3q2pC27", detail: "租學生服與泰服，先穿學生服出門，拍完再回來換泰服" },
        { time: "下午", icon: "📸", title: "學生服 · 臥佛寺周邊街拍", nomap: true, detail: "穿學生服在臥佛寺一帶拍泰式街頭照，很有在地感" },
        { time: "下午", icon: "🌸", title: "帕空鮮花市場選花", mapurl: "https://maps.app.goo.gl/2fUBxQvoWzi7xuvT7", detail: "曼谷最大鮮花市場，挑幾束喜歡的花，順便拍照" },
        { time: "下午", icon: "🌉", title: "曼谷紀念大橋", mapurl: "https://maps.app.goo.gl/tPFEExujQAKonLD67", detail: "近期最熱門的打卡橋，拍幾張美照" },
        { time: "傍晚", icon: "⛪", title: "換泰服 · 臥佛寺拍照", mapurl: "https://maps.app.goo.gl/pHKCyzWHxp8cXTwu9", detail: "回來換上泰服進臥佛寺拍照，黃昏氛圍感最好" },
        { time: "晚上", icon: "🍽️", title: "晚餐：Chom Arun", mapurl: "https://maps.app.goo.gl/ZLVpuE5npa7hUPB28", book: true, detail: "正對鄭王廟的景觀餐廳，黃昏用餐視野絕佳，記得提前訂位" },
      ],
      tips: "ONE DAY MASTER 建議先預約；學生服拍完再換泰服。進臥佛寺要過膝、有袖，泰服剛好符合。Chom Arun 熱門，建議提前訂位。",
    },
    {
      day: 4, date: "7/18", weekday: "六", title: "近郊小旅行，最後趕飛機回家",
      theme: "Day Trip & Departure",
      summary: "丹嫩莎朵 → 美功鐵道市集 → 安帕瓦 → วัดจุฬามณี → Bubble in the Forest → Save One Go 夜市 → 廊曼機場",
      blocks: [
        { time: "10:00", icon: "🚐", title: "從飯店出發", nomap: true, detail: "包車前往近郊，行李可先收好、退房寄放" },
        { time: "上午", icon: "🛥️", title: "丹嫩莎朵水上市場 Damnoen Saduak", detail: "經典水上市場，搭船穿梭在運河間邊吃邊買" },
        { time: "中午", icon: "🚂", title: "美功鐵道市集 Maeklong", mapurl: "https://maps.app.goo.gl/zhtKMawGZhsENaNY9", detail: "火車穿越市場的奇景，火車來時攤販迅速收傘，記得先確認火車時刻" },
        { time: "下午", icon: "🛥️", title: "安帕瓦水上市場 Amphawa", detail: "最有氣氛的水上市場，搭船遊河、邊吃邊買，傍晚開始最熱鬧" },
        { time: "下午", icon: "⛪", title: "วัดจุฬามณี Wat Chulamani", mapurl: "https://maps.app.goo.gl/fj73vCXGYHJXNXNV8", detail: "安帕瓦當地知名佛寺，順路過去參拜、拍照" },
        { time: "傍晚", icon: "☕", title: "Bubble in the Forest Cafe", detail: "森林系網美咖啡廳，木屋配水景超好拍，來喝杯咖啡吃個下午茶" },
        { time: "晚上", icon: "🌃", title: "Save One Go 夜市", detail: "廊曼機場旁邊的夜市，回程路上的覓食點，吃飽再拉車去機場" },
        { time: "深夜", icon: "✈️", title: "前往廊曼機場 DMK", nomap: true, detail: "約 00:00 抵達廊曼機場，搭紅眼班機 SL396，7/19 (日) 凌晨 03:00 起飛回台北，提早辦登機與退稅" },
      ],
      tips: "近郊全程建議包車；美功鐵道班次有限，先抓好火車時刻。回程是 7/19 凌晨 03:00 的紅眼班機（SL396，廊曼 DMK），今晚要留時間趕機。",
    },
  ],

  food: [],

    shopping: [],

  spas: [],

  extras: [
    { day: 2, date: "7/15", weekday: "三", area: "Siam 一帶", items: [
      { type: "shop", name: "Siam Paragon", area: "Siam", note: "曼谷最指標性的豪華百貨，M 層是國際精品區，G 層美食廣場選擇豐富，地下有 SEA LIFE 水族館，精品採購主力在這", mapurl: "https://maps.app.goo.gl/AHQy2Ff3bvMT2EaP7" },
      { type: "shop", name: "Siam Center", area: "Siam", note: "泰國本土設計師與國際潮流品牌集合，跟 Siam Paragon 直接相連，風格比較年輕活潑，美食廣場選擇也多", mapurl: "https://maps.app.goo.gl/1pFEEXmirSWevETGA" },
      { type: "shop", name: "Frank Garcon", area: "Siam Square Soi 2", note: "Siam Square Soi 2 高評分選品時裝店（4.8 / 5），主打獨立設計師品牌，風格介於歐式與街頭之間，在台灣找不到", mapurl: "https://maps.app.goo.gl/L4NxaTC3QS48MPrNA" },
      { type: "shop", name: "Daddy and the Muscle Academy", area: "Siam", note: "Siam Square Soi 2 上的少女風時裝店，評分 4.7，甜美風服飾配件，同棟還有大頭貼機可以拍，很好玩", mapurl: "https://maps.app.goo.gl/tuxcdkrYhKGRdgVU6" },
      { type: "shop", name: "Seek 'N Keep Club", area: "Siam Square Soi 2", note: "Siam Square Soi 2 的高評分選物店（4.9 / 5），風格獨特，不是大路貨，逛 Siam Square 一定會走到門口", mapurl: "https://maps.app.goo.gl/6hXqAgpw2jpoxNcJ9" },
      { type: "shop", name: "MINISO LAND Siam Square", area: "Siam Square", note: "曼谷旗艦大店，比台灣門市更大、商品更齊，聯名款跟限定品比較容易買到，喜歡 MINISO 可以在這裡掃一輪", mapurl: "https://maps.app.goo.gl/GBR7M95dxesHeKtM7" },
      { type: "shop", name: "BEAUTRIUM Siam Square", area: "Siam Square", note: "泰國最大連鎖美妝集合店，泰國本土保養品牌跟日韓選品都齊全，CP 值比機場免稅店好，想買保養品伴手禮在這挑就對了", mapurl: "https://maps.app.goo.gl/Zq16F71EGC3XgJ199" },
    ]},
    { day: 3, date: "7/16", weekday: "四", area: "ICONSIAM・松瓦路・河岸一帶", items: [
      { type: "food", name: "% ARABICA 暹羅天地店", area: "ICONSIAM", note: "日本頂級精品咖啡品牌，在 ICONSIAM 裡，極簡白色空間很好拍，招牌 Latte 和 Matcha Latte 必點，逛完百貨來一杯剛好", mapurl: "https://maps.app.goo.gl/mH8UWKE8TFEhsbbB7" },
      { type: "food", name: "After Sunrise", area: "臥佛寺旁 Chetuphon Gate 2F", note: "臥佛寺旁的高評分餅店（4.9 / 5），新鮮手工烘焙，逛完廟出來肚子餓直接上 2 樓，簡單好吃", mapurl: "https://maps.app.goo.gl/aUX1Gkw6D7cGtQKt9" },
      { type: "food", name: "Song Wat Coffee Roasters : Tha Tian", area: "Tha Tian（鄭王廟旁）", note: "自家烘焙精品咖啡，評分 4.8，就在 Tha Tian 碼頭附近，老城巷弄裡喝咖啡特別有氣氛", mapurl: "https://maps.app.goo.gl/WgH1nCoStQVPbg3x7" },
      { type: "spot", name: "帕空鮮花市場", area: "Pak Khlong Talat", note: "曼谷最大鮮花市場，4.5 分、逾 15,000 則評論，24 小時都有在賣，各色花海視覺衝擊力超強，在唐人街旁的河邊，很適合清晨或傍晚去", mapurl: "https://maps.app.goo.gl/786BEbBuaZkEaXeK9" },
      { type: "spot", name: "Phra Phutthayotfa Bridge", area: "昭披耶河", note: "橫跨昭披耶河的百年紀念橋，4.7 分，走上橋可以同時拍到曼谷老城天際線和河景，就在帕空花市附近，順路一起逛", mapurl: "https://maps.app.goo.gl/wTeZwa6r8KNF6EWk8" },
    ]},
  ],

  practical: {
    visa: "台灣護照 30 天內免簽，確認護照效期還有 6 個月以上",
    currency: "1 TWD ≈ 1 THB（目前約 1:1）｜建議帶台幣現金到 Super Rich 換，匯率最好；⚠️ 入境需備 20,000 THB 等值現金（台幣可），移民官若查驗不足有遭遣返風險",
    weather: "7 月雨季：日均 27–33°C，下午易有陣雨，薄雨衣或折傘記得帶",
    time: "曼谷比台灣慢 1 小時（GMT+7）",
    plug: "插座 220V，泰國相容 A / B / C 型，台灣插頭可直插；但充電器需支援 100–240V 自動變壓，否則會燒毀，出發前務必確認",
    transport: [
      { type: "BTS 空鐵", note: "市區最方便，買 Rabbit Card 儲值比較省" },
      { type: "MRT 地鐵", note: "藍線連接火車站、唐人街、Chatuchak" },
      { type: "Grab", note: "東南亞版 Uber，叫車最方便，多人叫 Grab XL" },
      { type: "包車", note: "Day 4 近郊行程建議包車，美功 → 安帕瓦全程接送" },
    ],
    vat: "購物滿 2,000 THB 可在機場辦 VAT Refund 退稅（約 7%），結帳時索取 PP10 表格並保留收據，機場出境前在 Revenue Department 櫃檯辦理",
    emergency: [
      { name: "台灣駐泰代表處", phone: "+66-2-119-3555（急難救助 24h）" },
      { name: "泰國旅遊警察", phone: "1155（有中文服務）" },
      { name: "緊急醫療救護", phone: "1669" },
      { name: "Bumrungrad 國際醫院", phone: "+66-2-066-8888" },
    ],
    phrases: [
      { th: "สวัสดี", th_zh: "Sa-wat-dee", zh: "你好" },
      { th: "ขอบคุณ", th_zh: "Khob-khun", zh: "謝謝" },
      { th: "เท่าไหร่", th_zh: "Tao-rai", zh: "多少錢？" },
      { th: "ลดได้ไหม", th_zh: "Lod-dai-mai", zh: "可以便宜點嗎？" },
      { th: "ไม่เผ็ด", th_zh: "Mai-ped", zh: "不要辣" },
      { th: "อร่อย", th_zh: "A-roi", zh: "好吃！" },
      { th: "ห้องน้ำ", th_zh: "Hong-nam", zh: "廁所" },
      { th: "ช่วยด้วย", th_zh: "Chuay-duay", zh: "救命 / 幫忙" },
    ],
  },

  packing: [
    { cat: "證件 & 金錢", items: ["護照（效期 6 個月以上）","護照影本 2 份","電子機票：CX407 / CX653（去，經香港轉機）/ SL396（回）","旅遊保險證明","信用卡（含 Visa）","台幣現金（到 Super Rich 換）⚠️ 入境需備 20,000 THB 等值現金（台幣可），移民官若查驗不足有遭遣返風險"] },
    { cat: "電子用品", items: ["手機 + 充電線","行動電源（放隨身行李）","相機","耳機","泰國 SIM 卡 / eSIM","充電器確認支援 100–240V（需自動變壓，否則 220V 會燒毀）"] },
    { cat: "衣物", items: ["短袖 T 恤 x 4","長褲 / 長裙（寺廟備用）","薄外套（冷氣很強）","好走的涼鞋 / 球鞋","薄雨衣 / 折傘","防曬帽"] },
    { cat: "盥洗 & 藥品", items: ["牙刷牙膏","防曬乳 SPF50+","防蚊液","止瀉藥（必備！）","止痛退燒藥","個人慢性病藥","OK 繃 / 痠痛貼布"] },
    { cat: "其他", items: ["環保購物袋","小背包（出遊用）","濕紙巾","面紙","保溫水壺","折疊行李袋（裝伴手禮）"] },
  ],
}
