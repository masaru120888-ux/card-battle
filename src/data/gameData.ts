// AUTO-GENERATED from the Claude Design bundle (do not hand-edit).
// Source: design HTML export -> embedded gzip+base64 JSON resource (id 53557503-...).
// Regenerate with: python3 scripts/extract_game_data.py
// This is the source of truth for the diagnosis system (16 types / 48 animals / 24 questions).

export type AxisKey = "EI" | "NS" | "TF" | "JP";

export interface PersonalityType {
  code: string;        // MBTI 4-letter code, e.g. "INTJ"
  name: string;        // Japanese name, e.g. "静謀"
  EI: string;
  NS: string;
  TF: string;
  JP: string;
  hitokoto: string;    // one-line tagline
  desc: string;
}

export interface Animal {
  id: number;
  type: string;        // MBTI code this animal belongs to
  typeName: string;
  tier: number;        // 1..3 within its type
  name: string;
  emoji: string;
  size: string;
  hp: number;
  spd: number;
  luk: number;
  passiveName: string;
  passive: string;
  card: string;        // signature card name
  cost: number;        // signature card cost
  cardEffect: string;  // signature card effect text
  flavor: string;
}

export interface Question {
  id: number;
  axis: AxisKey;
  axisMeaning: string;
  text: string;
  leftPole: string;    // pole assigned when answering No
  yesPole: string;     // pole assigned when answering Yes
}

export const PERSONALITY_TYPES: PersonalityType[] = [
  {"code": "INTJ", "name": "静謀", "EI": "内向", "NS": "直観", "TF": "思考", "JP": "計画", "hitokoto": "盤上を読み切る孤高の策略家", "desc": "誰にも見せない設計図を胸に、最短の勝ち筋だけを選ぶ。群れず、媚びず、結果で語る。"},
  {"code": "INTP", "name": "探究", "EI": "内向", "NS": "直観", "TF": "思考", "JP": "探索", "hitokoto": "仕組みを暴かずにいられない理論家", "desc": "「なぜ」を解くためなら時間も眠りも忘れる。実戦より検証、答えより問いを愛する。"},
  {"code": "ENTJ", "name": "統率", "EI": "外向", "NS": "直観", "TF": "思考", "JP": "計画", "hitokoto": "全軍を動かす生まれながらの指揮官", "desc": "目標を掲げ、人を束ね、退路を断つ。勝利への意志がそのまま号令になる。"},
  {"code": "ENTP", "name": "弁舌", "EI": "外向", "NS": "直観", "TF": "思考", "JP": "探索", "hitokoto": "常識をひっくり返す論客トリックスター", "desc": "退屈が最大の敵。型を壊し、隙を突き、議論も戦いも遊びに変える。"},
  {"code": "INFJ", "name": "神秘", "EI": "内向", "NS": "直観", "TF": "感情", "JP": "計画", "hitokoto": "静かに世界を見通す導きの賢者", "desc": "言葉少なに核心を射抜く。理想のために、誰よりも深く静かに燃える。"},
  {"code": "INFP", "name": "夢想", "EI": "内向", "NS": "直観", "TF": "感情", "JP": "探索", "hitokoto": "心の奥に物語を抱く繊細な夢追い", "desc": "現実より理想、勝敗より意味。優しさと頑固さを同じ心に同居させる。"},
  {"code": "ENFJ", "name": "導者", "EI": "外向", "NS": "直観", "TF": "感情", "JP": "計画", "hitokoto": "人の力を引き出す主人公", "desc": "仲間の可能性を信じ、前へ押し出す。自分より誰かのために強くなれる。"},
  {"code": "ENFP", "name": "奔放", "EI": "外向", "NS": "直観", "TF": "感情", "JP": "探索", "hitokoto": "好奇心が翼になる自由人", "desc": "面白そうな方へ全力疾走。型にはまらず、その場の閃きで道を切り開く。"},
  {"code": "ISTJ", "name": "堅実", "EI": "内向", "NS": "現実", "TF": "思考", "JP": "計画", "hitokoto": "約束を守り抜く堅牢な守護者", "desc": "派手さはいらない。決めたことを淡々と、確実に積み上げる岩のような信頼。"},
  {"code": "ISFJ", "name": "献身", "EI": "内向", "NS": "現実", "TF": "感情", "JP": "計画", "hitokoto": "背中で仲間を守る縁の下の盾", "desc": "目立たずとも、いざという時に身体を張る。誰かの安心が自分の喜び。"},
  {"code": "ESTJ", "name": "統制", "EI": "外向", "NS": "現実", "TF": "思考", "JP": "計画", "hitokoto": "秩序を敷く現場の総司令", "desc": "ルールと段取りで混沌を制す。やると決めたら最後までやり切る現実派。"},
  {"code": "ESTP", "name": "挑戦", "EI": "外向", "NS": "現実", "TF": "思考", "JP": "探索", "hitokoto": "危険に飛び込む行動の天才", "desc": "考える前に身体が動く。土壇場の勝負勘とスピードで局面をこじ開ける。"},
  {"code": "ISTP", "name": "職人", "EI": "内向", "NS": "現実", "TF": "思考", "JP": "探索", "hitokoto": "無駄なく仕留める静かな技巧者", "desc": "必要なときに必要なだけ。冷静な観察と手際で、最小の動きで最大の効果を出す。"},
  {"code": "ISFP", "name": "風雅", "EI": "内向", "NS": "現実", "TF": "感情", "JP": "探索", "hitokoto": "感性で舞う一匹狼の表現者", "desc": "縛られず、媚びず、自分の美意識で動く。物静かだが芯は誰より強い。"},
  {"code": "ESFJ", "name": "世話", "EI": "外向", "NS": "現実", "TF": "感情", "JP": "計画", "hitokoto": "場をまとめる温かな世話役", "desc": "みんなの様子に目を配り、輪をつなぐ。守りたいものがあるとき一番強くなる。"},
  {"code": "ESFP", "name": "華燭", "EI": "外向", "NS": "現実", "TF": "感情", "JP": "探索", "hitokoto": "その場を照らす天性のエンタメ", "desc": "注目を浴びてこそ本領発揮。明るさと瞬発力で戦場すら舞台に変える。"},
];

export const ANIMALS: Animal[] = [
  {"id": 1, "type": "INTJ", "typeName": "静謀", "tier": 1, "name": "カマキリ", "emoji": "🦗", "size": "体長〜8cm", "hp": 14, "spd": 7, "luk": 8, "passiveName": "待ち伏せ", "passive": "戦闘開始時、最初の攻撃カードに+4ダメージ", "card": "鎌撃", "cost": 1, "cardEffect": "ダメージ7／このターン被弾で反撃2", "flavor": "じっと機を待ち、一撃で仕留める。"},
  {"id": 2, "type": "INTJ", "typeName": "静謀", "tier": 2, "name": "ヤマネコ", "emoji": "🐈", "size": "体長50〜60cm", "hp": 22, "spd": 7, "luk": 6, "passiveName": "忍び寄り", "passive": "ブロックを持っていると攻撃+3", "card": "不意打ち", "cost": 1, "cardEffect": "ダメージ6／敵に狙われていなければ+4", "flavor": "音もなく間合いを詰める静かな狩人。"},
  {"id": 3, "type": "INTJ", "typeName": "静謀", "tier": 3, "name": "シャチ", "emoji": "🐋", "size": "全長6〜8m", "hp": 34, "spd": 6, "luk": 3, "passiveName": "連携戦術", "passive": "tier3カードの取得率が上がる", "card": "捕食", "cost": 2, "cardEffect": "ダメージ16＋自己回復4", "flavor": "群れで海を統べる冷徹な戦略家。"},
  {"id": 4, "type": "INTP", "typeName": "探究", "tier": 1, "name": "クモ", "emoji": "🕷", "size": "体長〜2cm", "hp": 13, "spd": 8, "luk": 9, "passiveName": "罠張り", "passive": "ブロックを張ると敵に粘着1(行動遅延)付与", "card": "糸罠", "cost": 0, "cardEffect": "敵の素早さを下げ、粘着1付与", "flavor": "巣を張り、理を張り、獲物を待つ。"},
  {"id": 5, "type": "INTP", "typeName": "探究", "tier": 2, "name": "タコ", "emoji": "🐙", "size": "全長〜60cm", "hp": 21, "spd": 5, "luk": 7, "passiveName": "擬態", "passive": "1戦闘に1回、手札を全て引き直せる", "card": "墨煙", "cost": 1, "cardEffect": "ブロック5＋敵の命中を下げる", "flavor": "八本の手で同時に思考する探究者。"},
  {"id": 6, "type": "INTP", "typeName": "探究", "tier": 3, "name": "ダイオウイカ", "emoji": "🦑", "size": "全長〜13m", "hp": 32, "spd": 5, "luk": 4, "passiveName": "深淵", "passive": "手札が3枚揃うとダメージ+5", "card": "触腕", "cost": 2, "cardEffect": "ダメージ6×2＋1ドロー", "flavor": "深海の謎、その正体は誰も知らない。"},
  {"id": 7, "type": "ENTJ", "typeName": "統率", "tier": 1, "name": "アリ", "emoji": "🐜", "size": "体長〜1cm", "hp": 15, "spd": 5, "luk": 9, "passiveName": "群勢", "passive": "同名カードが手札に複数あると攻撃+3", "card": "増殖", "cost": 1, "cardEffect": "「牙」を1枚山札に追加", "flavor": "小さな個が集まり巨大な軍となる。"},
  {"id": 8, "type": "ENTJ", "typeName": "統率", "tier": 2, "name": "コヨーテ", "emoji": "🐺", "size": "体長75〜90cm", "hp": 24, "spd": 7, "luk": 5, "passiveName": "狩りの号令", "passive": "味方が攻撃した敵に2追撃", "card": "連携", "cost": 1, "cardEffect": "味方の次の攻撃に+4", "flavor": "群れを率い、獲物を追い詰める指揮官。"},
  {"id": 9, "type": "ENTJ", "typeName": "統率", "tier": 3, "name": "ライオン", "emoji": "🦁", "size": "体長1.8〜2m", "hp": 32, "spd": 6, "luk": 4, "passiveName": "百獣の王", "passive": "HP満タン時、攻撃が大きく上がる", "card": "王の咆哮", "cost": 2, "cardEffect": "ダメージ12＋味方全体に攻撃バフ", "flavor": "誇り高く、退くことを知らぬ王。"},
  {"id": 10, "type": "ENTP", "typeName": "弁舌", "tier": 1, "name": "コウモリ", "emoji": "🦇", "size": "体長5〜10cm", "hp": 14, "spd": 8, "luk": 9, "passiveName": "かく乱", "passive": "敵を倒すと報酬抽選に+1回", "card": "超音波", "cost": 0, "cardEffect": "敵1体の次の攻撃を逸らす", "flavor": "闇を自在に舞う、つかみどころのない撹乱者。"},
  {"id": 11, "type": "ENTP", "typeName": "弁舌", "tier": 2, "name": "キツネ", "emoji": "🦊", "size": "体長60〜70cm", "hp": 21, "spd": 7, "luk": 8, "passiveName": "化かし", "passive": "運判定が報酬寄りに補正される", "card": "幻惑", "cost": 1, "cardEffect": "敵の次の攻撃を反らす＋ブロック4", "flavor": "真偽の境を踊る、油断ならない策士。"},
  {"id": 12, "type": "ENTP", "typeName": "弁舌", "tier": 3, "name": "アリゲーター", "emoji": "🐊", "size": "全長3〜4m", "hp": 35, "spd": 5, "luk": 3, "passiveName": "水面下", "passive": "HPが高いほど命中時ダメージ+", "card": "噛み砕き", "cost": 2, "cardEffect": "ダメージ14＋敵を1ターン拘束", "flavor": "静寂から一瞬で喰らいつく、騙し討ちの達人。"},
  {"id": 13, "type": "INFJ", "typeName": "神秘", "tier": 1, "name": "ホタル", "emoji": "✨", "size": "体長〜2cm", "hp": 12, "spd": 7, "luk": 9, "passiveName": "灯火", "passive": "HPが減るほど運が上がる", "card": "導き光", "cost": 0, "cardEffect": "味方1体を2回復＋1ドロー", "flavor": "闇に小さな希望を灯す静かな魂。"},
  {"id": 14, "type": "INFJ", "typeName": "神秘", "tier": 2, "name": "フクロウ", "emoji": "🦉", "size": "全長50〜60cm", "hp": 23, "spd": 6, "luk": 7, "passiveName": "千里眼", "passive": "ターン開始時、山札の一番上を見てから引く", "card": "看破", "cost": 1, "cardEffect": "ダメージ5＋敵の次の行動を弱体化", "flavor": "闇の中でも全てを見通す静かな知性。"},
  {"id": 15, "type": "INFJ", "typeName": "神秘", "tier": 3, "name": "クジラ", "emoji": "🐳", "size": "全長15m〜", "hp": 36, "spd": 5, "luk": 4, "passiveName": "大海の慈悲", "passive": "味方が倒れそうな時、被ダメを肩代わり(1回)", "card": "潮鳴り", "cost": 2, "cardEffect": "味方全体を6回復", "flavor": "海そのもののように深く、静かに包む。"},
  {"id": 16, "type": "INFP", "typeName": "夢想", "tier": 1, "name": "チョウ", "emoji": "🦋", "size": "翅長〜10cm", "hp": 12, "spd": 9, "luk": 8, "passiveName": "変容", "passive": "ターンを重ねるごとに素早さ上昇", "card": "鱗粉", "cost": 0, "cardEffect": "敵の命中を下げる＋自己ブロック4", "flavor": "儚くも、確かに世界を変える羽ばたき。"},
  {"id": 17, "type": "INFP", "typeName": "夢想", "tier": 2, "name": "ウサギ", "emoji": "🐇", "size": "体長40〜50cm", "hp": 24, "spd": 8, "luk": 7, "passiveName": "跳躍", "passive": "低確率で攻撃を完全回避", "card": "ホップ", "cost": 0, "cardEffect": "ブロック5＋次ターン素早さ上昇", "flavor": "臆病でしなやか、夢を追って跳ね続ける。"},
  {"id": 18, "type": "INFP", "typeName": "夢想", "tier": 3, "name": "マナティー", "emoji": "🌊", "size": "全長3m級", "hp": 34, "spd": 4, "luk": 5, "passiveName": "癒しの海", "passive": "状態異常を受けない", "card": "抱擁", "cost": 2, "cardEffect": "味方1体を10回復＋浄化", "flavor": "ただ穏やかに、傷ついた者に寄り添う。"},
  {"id": 19, "type": "ENFJ", "typeName": "導者", "tier": 1, "name": "ミツバチ", "emoji": "🐝", "size": "体長〜2cm", "hp": 13, "spd": 8, "luk": 7, "passiveName": "献身の針", "passive": "攻撃時に毒1付与", "card": "集団行動", "cost": 1, "cardEffect": "ダメージ3＋味方全体ブロック2", "flavor": "仲間のために身を捧げる小さな勇者。"},
  {"id": 20, "type": "ENFJ", "typeName": "導者", "tier": 2, "name": "オオカミ", "emoji": "🐺", "size": "体長1〜1.3m", "hp": 24, "spd": 7, "luk": 6, "passiveName": "群れの絆", "passive": "味方が多いほど攻撃が上がる", "card": "鼓舞の遠吠え", "cost": 1, "cardEffect": "味方全体に攻撃バフ＋自己ブロック5", "flavor": "仲間を信じ、群れを前へ導くリーダー。"},
  {"id": 21, "type": "ENFJ", "typeName": "導者", "tier": 3, "name": "ゾウ", "emoji": "🐘", "size": "体高3m級", "hp": 36, "spd": 4, "luk": 4, "passiveName": "群れの長", "passive": "隣接する味方の被ダメを軽減", "card": "大地震", "cost": 2, "cardEffect": "ダメージ10＋敵全体をよろめかせる", "flavor": "記憶と情を背負い、群れを導く巨体。"},
  {"id": 22, "type": "ENFP", "typeName": "奔放", "tier": 1, "name": "リス", "emoji": "🐿", "size": "体長20cm前後", "hp": 13, "spd": 9, "luk": 9, "passiveName": "たくわえ", "passive": "報酬のゴールドが増える", "card": "木の実", "cost": 0, "cardEffect": "1ドロー＋次の攻撃+3", "flavor": "好奇心のままに駆け回る小さな冒険者。"},
  {"id": 23, "type": "ENFP", "typeName": "奔放", "tier": 2, "name": "アライグマ", "emoji": "🦝", "size": "体長40〜60cm", "hp": 22, "spd": 7, "luk": 8, "passiveName": "好奇心", "passive": "毎ターン低確率で追加ドロー", "card": "つかみどり", "cost": 1, "cardEffect": "ランダムなtier2カードを1枚生成", "flavor": "何でも触りたがる陽気ないたずら者。"},
  {"id": 24, "type": "ENFP", "typeName": "奔放", "tier": 3, "name": "チーター", "emoji": "🐆", "size": "体長1.2〜1.5m", "hp": 29, "spd": 9, "luk": 5, "passiveName": "疾走", "passive": "常に行動順が最速付近", "card": "電光", "cost": 2, "cardEffect": "ダメージ9＋もう一度行動可能", "flavor": "風を置き去りにする、自由の化身。"},
  {"id": 25, "type": "ISTJ", "typeName": "堅実", "tier": 1, "name": "ダンゴムシ", "emoji": "🪲", "size": "体長〜1.5cm", "hp": 16, "spd": 3, "luk": 6, "passiveName": "鉄壁", "passive": "防御カードの効果が+50%", "card": "丸まる", "cost": 1, "cardEffect": "ブロック10", "flavor": "小さくとも決して崩れぬ、忍耐の象徴。"},
  {"id": 26, "type": "ISTJ", "typeName": "堅実", "tier": 2, "name": "リクガメ", "emoji": "🐢", "size": "甲長40cm級", "hp": 25, "spd": 3, "luk": 6, "passiveName": "築城", "passive": "余ったブロックを次ターンに持ち越す", "card": "重甲羅", "cost": 1, "cardEffect": "ブロック11", "flavor": "ゆっくり、しかし確実に。岩のような守り。"},
  {"id": 27, "type": "ISTJ", "typeName": "堅実", "tier": 3, "name": "サイ", "emoji": "🦏", "size": "体長3.5m級", "hp": 35, "spd": 4, "luk": 4, "passiveName": "重装甲", "passive": "受けるダメージを常に2軽減", "card": "突進", "cost": 2, "cardEffect": "ダメージ14＋ブロック6", "flavor": "真っ直ぐ、確実に、止まらない一突き。"},
  {"id": 28, "type": "ISFJ", "typeName": "献身", "tier": 1, "name": "ハリネズミ", "emoji": "🦔", "size": "体長20cm前後", "hp": 15, "spd": 5, "luk": 7, "passiveName": "反撃の棘", "passive": "攻撃を受けると相手に1ダメージ", "card": "丸まる", "cost": 1, "cardEffect": "ブロック8＋反撃2", "flavor": "小さくとも、守るためなら棘を立てる。"},
  {"id": 29, "type": "ISFJ", "typeName": "献身", "tier": 2, "name": "イヌ", "emoji": "🐕", "size": "体長50〜70cm", "hp": 23, "spd": 6, "luk": 6, "passiveName": "忠誠", "passive": "味方が攻撃されると割り込んで軽減", "card": "かばう", "cost": 1, "cardEffect": "味方1体に大ブロック付与", "flavor": "主と仲間に尽くす、ゆるがぬ忠義。"},
  {"id": 30, "type": "ISFJ", "typeName": "献身", "tier": 3, "name": "ゴリラ", "emoji": "🦍", "size": "体長1.7m級", "hp": 36, "spd": 4, "luk": 4, "passiveName": "守護者", "passive": "隣接する味方の被ダメを軽減", "card": "胸叩き", "cost": 2, "cardEffect": "敵全体を威圧＋味方全体ブロック6", "flavor": "静かな巨体、守るべきもののために牙をむく。"},
  {"id": 31, "type": "ESTJ", "typeName": "統制", "tier": 1, "name": "スズメバチ", "emoji": "🐝", "size": "体長〜4cm", "hp": 14, "spd": 8, "luk": 6, "passiveName": "統率の毒", "passive": "毒持ち敵への攻撃が上がる", "card": "刺突", "cost": 1, "cardEffect": "ダメージ5＋毒2", "flavor": "規律正しく、容赦なく標的を制圧する。"},
  {"id": 32, "type": "ESTJ", "typeName": "統制", "tier": 2, "name": "アナグマ", "emoji": "🦡", "size": "体長60〜90cm", "hp": 25, "spd": 5, "luk": 5, "passiveName": "不屈", "passive": "HP半分以下で防御が上がる", "card": "掘削", "cost": 1, "cardEffect": "ブロック7＋敵の防御を削る", "flavor": "頑固に、地道に、決して退かぬ現場主義。"},
  {"id": 33, "type": "ESTJ", "typeName": "統制", "tier": 3, "name": "バイソン", "emoji": "🐃", "size": "体長3m級", "hp": 37, "spd": 4, "luk": 4, "passiveName": "突撃陣形", "passive": "味方が多いほど攻撃が上がる", "card": "猛進", "cost": 2, "cardEffect": "ダメージ16・直線上を蹂躙", "flavor": "大地を揺らし群れを率いる、秩序の重量。"},
  {"id": 34, "type": "ESTP", "typeName": "挑戦", "tier": 1, "name": "イタチ", "emoji": "🦦", "size": "体長20〜40cm", "hp": 14, "spd": 9, "luk": 8, "passiveName": "電撃戦", "passive": "先制で攻撃するとダメージ+2", "card": "早抜き", "cost": 0, "cardEffect": "ダメージ4＋このターン素早さ上昇", "flavor": "隙あらば飛び込む、無謀という名の才能。"},
  {"id": 35, "type": "ESTP", "typeName": "挑戦", "tier": 2, "name": "ジャッカル", "emoji": "🐺", "size": "体長70〜85cm", "hp": 22, "spd": 8, "luk": 6, "passiveName": "血の嗅覚", "passive": "低HPの敵への攻撃+3", "card": "噛みつき", "cost": 1, "cardEffect": "ダメージ7／とどめで1ドロー", "flavor": "勝機を逃さぬ、抜け目なき挑戦者。"},
  {"id": 36, "type": "ESTP", "typeName": "挑戦", "tier": 3, "name": "サメ", "emoji": "🦈", "size": "全長3〜4m", "hp": 31, "spd": 7, "luk": 3, "passiveName": "血の匂い", "passive": "低HP敵への攻撃が倍増", "card": "捕食ラッシュ", "cost": 2, "cardEffect": "ダメージ12／敵が瀕死なら+8", "flavor": "止まれば死ぬ。常に前へ、獲物の元へ。"},
  {"id": 37, "type": "ISTP", "typeName": "職人", "tier": 1, "name": "サソリ", "emoji": "🦂", "size": "体長〜8cm", "hp": 13, "spd": 7, "luk": 8, "passiveName": "急所狙い", "passive": "毒で敵を倒すと報酬が増える", "card": "毒針", "cost": 1, "cardEffect": "ダメージ3＋毒3", "flavor": "無駄なく、静かに、確実に仕留める職人。"},
  {"id": 38, "type": "ISTP", "typeName": "職人", "tier": 2, "name": "テン", "emoji": "🦡", "size": "体長45〜55cm", "hp": 22, "spd": 8, "luk": 6, "passiveName": "狙撃", "passive": "手札が少ないほど攻撃が上がる", "card": "一閃", "cost": 1, "cardEffect": "ダメージ8／手札1枚以下なら+4", "flavor": "必要な一手だけを、研ぎ澄ませて放つ。"},
  {"id": 39, "type": "ISTP", "typeName": "職人", "tier": 3, "name": "グリズリー", "emoji": "🐻", "size": "体長2〜2.5m", "hp": 37, "spd": 5, "luk": 4, "passiveName": "一撃必殺", "passive": "クリティカル率が高い", "card": "熊掌", "cost": 2, "cardEffect": "ダメージ18", "flavor": "孤高にして最強。一撃で全てを終わらせる。"},
  {"id": 40, "type": "ISFP", "typeName": "風雅", "tier": 1, "name": "アマガエル", "emoji": "🐸", "size": "体長〜4cm", "hp": 16, "spd": 6, "luk": 8, "passiveName": "変わり身", "passive": "状態異常を付与するとHP1回復", "card": "粘液", "cost": 1, "cardEffect": "敵の素早さを下げ毒1", "flavor": "気ままに、しなやかに、自分の色で生きる。"},
  {"id": 41, "type": "ISFP", "typeName": "風雅", "tier": 2, "name": "ネコ", "emoji": "🐈‍⬛", "size": "体長45〜55cm", "hp": 21, "spd": 8, "luk": 7, "passiveName": "気まぐれ", "passive": "低確率で攻撃を完全回避", "card": "しのび足", "cost": 1, "cardEffect": "ブロック5＋次の攻撃を回避", "flavor": "媚びず群れず、美しく自由な一匹狼。"},
  {"id": 42, "type": "ISFP", "typeName": "風雅", "tier": 3, "name": "キリン", "emoji": "🦒", "size": "体高4〜5m", "hp": 34, "spd": 6, "luk": 5, "passiveName": "孤高", "passive": "単独行動時、全能力が上がる", "card": "天上の蹴り", "cost": 2, "cardEffect": "ダメージ14＋このターン回避1", "flavor": "静かに高みに立つ、気高く美しい存在。"},
  {"id": 43, "type": "ESFJ", "typeName": "世話", "tier": 1, "name": "ハムスター", "emoji": "🐹", "size": "体長〜10cm", "hp": 14, "spd": 6, "luk": 9, "passiveName": "おすそわけ", "passive": "報酬を味方に分配でき、絆ボーナス", "card": "ほお袋", "cost": 0, "cardEffect": "味方1体を3回復", "flavor": "小さくとも、みんなの輪の真ん中に。"},
  {"id": 44, "type": "ESFJ", "typeName": "世話", "tier": 2, "name": "ペンギン", "emoji": "🐧", "size": "体高50〜70cm", "hp": 24, "spd": 5, "luk": 6, "passiveName": "群れの温もり", "passive": "味方の数だけターン開始時ブロック", "card": "身を寄せ", "cost": 1, "cardEffect": "味方全体をブロック6", "flavor": "厳しい環境でも寄り添い助け合う世話役。"},
  {"id": 45, "type": "ESFJ", "typeName": "世話", "tier": 3, "name": "カバ", "emoji": "🦛", "size": "体長3.5m級", "hp": 37, "spd": 4, "luk": 5, "passiveName": "縄張り", "passive": "周囲の味方の防御を底上げ", "card": "大口", "cost": 2, "cardEffect": "ダメージ12＋味方全体を4回復", "flavor": "穏やかに見えて、群れを守る時は無敵。"},
  {"id": 46, "type": "ESFP", "typeName": "華燭", "tier": 1, "name": "インコ", "emoji": "🦜", "size": "体長15〜25cm", "hp": 13, "spd": 8, "luk": 9, "passiveName": "喝采", "passive": "攻撃が当たると低確率でエナジー+1", "card": "囃し立て", "cost": 0, "cardEffect": "味方全体の攻撃を少し上げる", "flavor": "明るい声で場を一気に華やかにする。"},
  {"id": 47, "type": "ESFP", "typeName": "華燭", "tier": 2, "name": "クジャク", "emoji": "🦚", "size": "体長(尾除く)50cm", "hp": 22, "spd": 7, "luk": 7, "passiveName": "魅了", "passive": "ターン開始時、敵1体の狙いを自分に", "card": "羽広げ", "cost": 1, "cardEffect": "敵を挑発＋自己ブロック8", "flavor": "見られてこそ咲く、絢爛の主役。"},
  {"id": 48, "type": "ESFP", "typeName": "華燭", "tier": 3, "name": "イルカ", "emoji": "🐬", "size": "全長2〜3m", "hp": 31, "spd": 7, "luk": 5, "passiveName": "花形", "passive": "観客(味方)が多いほど攻撃が上がる", "card": "ジャンプショー", "cost": 2, "cardEffect": "ダメージ13＋味方全体に攻撃バフ", "flavor": "舞台を駆け、観客を沸かせる海のスター。"},
];

export const QUESTIONS: Question[] = [
  {"id": 1, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "知らない人だらけの飲み会、テンション上がる？", "leftPole": "内向(I)", "yesPole": "外向(E)"},
  {"id": 2, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "一人の時間がないと、正直しんどい？", "leftPole": "外向(E)", "yesPole": "内向(I)"},
  {"id": 3, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "電話よりLINEやチャット派？", "leftPole": "外向(E)", "yesPole": "内向(I)"},
  {"id": 4, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "初対面でも、わりとすぐ打ち解けられる？", "leftPole": "内向(I)", "yesPole": "外向(E)"},
  {"id": 5, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "週末は家から一歩も出たくない日がある？", "leftPole": "外向(E)", "yesPole": "内向(I)"},
  {"id": 6, "axis": "EI", "axisMeaning": "外向 ⟷ 内向", "text": "黙ってると「怒ってる?」と聞かれがち？", "leftPole": "外向(E)", "yesPole": "内向(I)"},
  {"id": 7, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "気づいたら、よく空想にふけってる？", "leftPole": "現実(S)", "yesPole": "直観(N)"},
  {"id": 8, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "「で、結論は？」とよく言う／言われる？", "leftPole": "直観(N)", "yesPole": "現実(S)"},
  {"id": 9, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "ありえない「もしも」を考えるのが好き？", "leftPole": "現実(S)", "yesPole": "直観(N)"},
  {"id": 10, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "目に見える事実しか基本は信じない？", "leftPole": "直観(N)", "yesPole": "現実(S)"},
  {"id": 11, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "例え話やたとえで物事を捉えがち？", "leftPole": "現実(S)", "yesPole": "直観(N)"},
  {"id": 12, "axis": "NS", "axisMeaning": "直観 ⟷ 現実", "text": "新しい家電、説明書は最初に読む派？", "leftPole": "直観(N)", "yesPole": "現実(S)"},
  {"id": 13, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "友達の相談、つい解決策から出しちゃう？", "leftPole": "感情(F)", "yesPole": "思考(T)"},
  {"id": 14, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "映画やドラマで、わりと泣く方？", "leftPole": "思考(T)", "yesPole": "感情(F)"},
  {"id": 15, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "論破されても、納得できれば気にしない？", "leftPole": "感情(F)", "yesPole": "思考(T)"},
  {"id": 16, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "正しさより、その場の空気を優先する？", "leftPole": "思考(T)", "yesPole": "感情(F)"},
  {"id": 17, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "決断は感情より損得で決める方？", "leftPole": "感情(F)", "yesPole": "思考(T)"},
  {"id": 18, "axis": "TF", "axisMeaning": "思考 ⟷ 感情", "text": "人の機嫌の変化にすぐ気づく？", "leftPole": "思考(T)", "yesPole": "感情(F)"},
  {"id": 19, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "旅行はきっちり計画を立てたい派？", "leftPole": "探索(P)", "yesPole": "計画(J)"},
  {"id": 20, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "夏休みの宿題は最終日に追い込んだ？", "leftPole": "計画(J)", "yesPole": "探索(P)"},
  {"id": 21, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "予定が埋まってないと逆に落ち着かない？", "leftPole": "探索(P)", "yesPole": "計画(J)"},
  {"id": 22, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "とりあえずやってから考える方？", "leftPole": "計画(J)", "yesPole": "探索(P)"},
  {"id": 23, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "ToDoリストをよく作る？", "leftPole": "探索(P)", "yesPole": "計画(J)"},
  {"id": 24, "axis": "JP", "axisMeaning": "計画 ⟷ 探索", "text": "締め切りは「ある方が燃える」？", "leftPole": "計画(J)", "yesPole": "探索(P)"},
];
