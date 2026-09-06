const roles: Record<string, string> = { "交际花":"Courtisane","保姆":"Nourrice","农妇":"Paysanne","卖花女":"Marchande de fleurs","女主人":"Maîtresse de maison","女仆":"Domestique","女儿":"Fille","女小提琴家":"Violoniste","女工":"Ouvrière","女帽制作者":"Modiste","女服务员":"Serveuse","女理发师":"Coiffeuse","女画家":"Peintre","女艺术家":"Artiste","女钢琴家":"Pianiste","女音乐家":"Musicienne","女骑手":"Cavalière","妻子":"Épouse","家庭女主人":"Maîtresse de maison","店主":"Commerçante","模特":"Modèle","歌手":"Chanteuse","母亲":"Mère","洗衣女工":"Blanchisseuse","演员":"Actrice","熨衣女工":"Repasseuse","牧羊女":"Bergère","社交名媛":"Mondaine","管家":"Gouvernante","舞者":"Danseuse","舞蹈学生":"Élève en danse","表演者":"Artiste de scène" };
const classes: Record<string, string> = { "上流社会女性":"Femme de la haute société","中产阶级女性":"Femme de la classe moyenne","工人阶层女性":"Femme de la classe ouvrière","贵族女性":"Femme aristocrate","资产阶级/布尔乔亚女性":"Femme bourgeoise","资产阶级女性":"Femme bourgeoise" };
const relations: Record<string, string> = { "与子女同在":"Avec ses enfants","主仆关系":"Relation maître-domestique","亲戚/亲属":"Parente","伴护":"Accompagnante","友人":"Amie","友人之女":"Fille d’une amie","友人莫奈之妻":"Épouse d’un ami de Monet","同伴":"Compagne","外甥女":"Nièce","姐妹":"Sœur","委托人":"Commanditaire","委托人之女":"Fille du commanditaire","家人/亲属":"Membre de la famille","家族友人":"Amie de la famille","德加友人":"Amie de Degas","教女":"Filleule","珠宝商之女":"Fille de joaillier","继女":"Belle-fille","继女/女儿":"Belle-fille / fille","艺术家嫂子":"Belle-sœur de l’artiste","表妹/亲属":"Cousine","赞助人之女":"Fille du mécène","赞助人之妻":"Épouse du mécène","赞助人家庭":"Famille du mécène","雕塑家布鲁内之妻":"Épouse du sculpteur Brunet","马奈妻子":"Épouse de Manet","马奈学生":"Élève de Manet" };
const tags: Record<string, string> = { "东方幻想的载体":"Figure de l’imaginaire orientaliste","丧期":"Deuil","休闲女游客":"Touriste en villégiature","休闲的普通市民":"Citadine en loisir","候选身份：农妇或中产阶级女性":"Identité possible : paysanne ou femme de la classe moyenne","候选身份：渔民之妻或游客":"Identité possible : épouse de pêcheur ou touriste","儿童":"Enfant","光影的化身":"Figure de la lumière","受害者":"Victime","失明":"Cécité","宗教人物/宗教叙事人物":"Figure religieuse","家族长辈":"Aînée de la famille","少女":"Jeune fille","巴黎年轻女性":"Jeune Parisienne","布列塔尼":"Bretagne","底层体力劳动者":"Travailleuse manuelle précaire","度假的游客":"Touriste en villégiature","意大利":"Italie","文艺界儿童":"Enfant du milieu artistique","文艺界女性":"Femme du milieu artistique","犹太背景":"Contexte juif","病人":"Malade","知名":"Célèbre","自我呈现":"Autoreprésentation","被窥视的裸体":"Nu observé","跨文化背景":"Contexte transculturel","邻居小女孩":"Petite fille voisine","酒馆女主人":"Patronne de café" };
const scenes: Record<string, string> = { "卢浮宫博物馆":"Musée du Louvre","卢浮宫大画廊":"Grande Galerie du Louvre","咖啡馆":"Café","餐馆":"Restaurant","商店":"Magasin","市场／集市":"Marché","排练室":"Salle de répétition","舞台":"Scène","舞会":"Bal","剧院":"Théâtre","演艺空间":"Espace de spectacle","马戏团":"Cirque","赛马场":"Hippodrome","滑冰场":"Patinoire","斗牛场":"Arènes","海滩／海滨":"Plage","河岸":"Berge","花园／公园":"Jardin / parc","城市公共花园":"Jardin public urbain","杜乐丽花园":"Jardin des Tuileries","森林":"Forêt","郊野":"Campagne","农业劳动空间":"Espace de travail agricole","田野":"Champ","卧室":"Chambre","浴室":"Salle de bain","厨房":"Cuisine","化妆间":"Loge","画室":"Atelier","工作间":"Atelier de travail","舞蹈排练室":"Salle de répétition de danse","阳台":"Balcon","庭院":"Cour","露台":"Terrasse","槌球活动空间":"Espace de croquet","阈限空间":"Espace liminal","宗教叙事户外场景":"Scène religieuse en plein air","神话化自然场景":"Nature mythifiée","树林":"Bois","铁路边":"Bord de voie ferrée","花园背景":"Jardin en arrière-plan","户外（地点待核验）":"Extérieur (lieu à vérifier)","花园（地点待核验）":"Jardin (lieu à vérifier)","花园/户外休闲":"Jardin et loisirs de plein air","郊野/自然/道路":"Campagne, nature et chemin","室内—户外阈限":"Seuil intérieur–extérieur","家庭庄园花园":"Jardin de propriété familiale","半私人花园":"Jardin semi-privé","室内":"Intérieur","户外":"Extérieur","私人":"Espace privé","私人角落":"Coin privé","私人肖像空间":"Espace privé de portrait","私人居室":"Pièce privée","私人室内":"Intérieur privé","私人卧室":"Chambre privée","私人浴室":"Salle de bain privée" };

const genericSpace = (value: string) => value.replaceAll("公共", "public").replaceAll("私人", "privé").replaceAll("室内", "intérieur").replaceAll("户外", "extérieur").replaceAll("花园", "jardin").replaceAll("自然", "nature").replaceAll("道路", "chemin").replaceAll("娱乐空间", "espace de loisir").replaceAll("社交场所", "lieu de sociabilité").replaceAll("舞蹈室", "salle de danse").replaceAll("后台", "coulisses").replaceAll("舞台幕后", "coulisses").replaceAll("餐馆", "restaurant").replaceAll("咖啡馆", "café").replaceAll("剧院", "théâtre").replaceAll("画室", "atelier").replaceAll("卧室", "chambre").replaceAll("浴室", "salle de bain").replaceAll("工作间", "atelier de travail").replaceAll("闺房", "boudoir").replaceAll("虚构的东方主义空间", "espace orientaliste imaginaire");

const reviewedScenes: Record<string, string> = {
  "户外劳动空间": "Espace de travail en plein air",
  "巴黎歌剧院": "Opéra de Paris",
  "户外度假": "Villégiature en plein air",
  "娱乐场所": "Lieu de divertissement",
  "巴黎女神游乐厅酒吧": "Bar des Folies Bergère",
  "公共娱乐场所": "Lieu public de divertissement",
  "近郊休闲空间": "Espace de loisirs en proche banlieue",
  "半户外": "Espace semi-extérieur",
  "办公室": "Bureau",
};

const specificSpaces: Record<string, string> = {
  "室内/私人空间": "Intérieur / espace privé",
  "农业劳动空间": "Espace de travail agricole",
  "田野": "Champs",
  "花园（地点待核验）": "Jardin (lieu à vérifier)",
  "户外/公共/自然风光": "Extérieur / espace public / paysage naturel",
  "私人室内": "Intérieur privé",
  "室内": "Intérieur",
  "私人/室内": "Espace privé / intérieur",
  "公共 / 排练室": "Espace public / salle de répétition",
  "公共/户外/自然": "Espace public / extérieur / nature",
  "市场/集市": "Marché / foire",
  "户外劳动空间": "Espace de travail en plein air",
  "公共 / 演艺空间": "Espace public / espace de spectacle",
  "公共/户外": "Espace public / extérieur",
  "公共/户外度假": "Espace public / extérieur / lieu de villégiature",
  "户外/公共/娱乐空间/社交场所": "Extérieur / espace public / loisirs / sociabilité",
  "户外/自然/公共": "Extérieur / nature / espace public",
  "私人": "Espace privé",
  "住宅花园": "Jardin résidentiel",
  "公园/城市公共绿地": "Parc / espace vert public urbain",
  "室内/画室": "Intérieur / atelier",
  "公共 / 商店": "Espace public / boutique",
  "私人浴室": "Salle de bains privée",
  "露台": "Terrasse",
  "住宅阳台": "Balcon résidentiel",
  "半公共 / 后台": "Espace semi-public / coulisses",
  "私人 / 工作间": "Espace privé / espace de travail",
  "私人居室": "Pièce d’habitation privée",
  "公共 / 卢浮宫博物馆": "Espace public / musée du Louvre",
  "公共 / 舞台": "Espace public / scène",
  "公共/娱乐场所": "Espace public / lieu de divertissement",
  "公共/户外/街景": "Espace public / extérieur / rue",
  "剧院/室内/公共/娱乐空间/社交场所": "Théâtre / intérieur / espace public / loisirs / sociabilité",
  "半公共 / 舞台幕后": "Espace semi-public / coulisses de scène",
  "室内/私人空间/厨房": "Intérieur / espace privé / cuisine",
  "室内—户外阈限": "Seuil entre intérieur et extérieur",
  "巴黎歌剧院": "Opéra de Paris",
  "户外（地点待核验）": "Extérieur (lieu à vérifier)",
  "私人 / 舞蹈排练室": "Espace privé / salle de répétition de danse",
  "郊野/自然/道路": "Campagne / nature / route",
  "公共 / 卢浮宫大画廊": "Espace public / Grande Galerie du Louvre",
  "公共 / 咖啡店": "Espace public / café",
  "公共咖啡馆": "Café public",
  "公共娱乐场所": "Lieu public de divertissement",
  "半私人花园": "Jardin semi-privé",
  "咖啡馆": "Café",
  "城市公共花园": "Jardin public urbain",
  "宗教叙事户外场景": "Scène religieuse en plein air",
  "室内/公共/咖啡馆/社交场所": "Intérieur / espace public / café / lieu de sociabilité",
  "室内/公共/餐馆": "Intérieur / espace public / restaurant",
  "室内/半公共/舞蹈室": "Intérieur / espace semi-public / salle de danse",
  "室内/社交场所/娱乐场所/剧院": "Intérieur / lieu de sociabilité / divertissement / théâtre",
  "室内/社交场所/娱乐场所/舞会": "Intérieur / lieu de sociabilité / divertissement / bal",
  "家庭庄园花园": "Jardin d’une propriété familiale",
  "巴黎女神游乐厅的酒吧": "Bar des Folies-Bergère",
  "庭院": "Cour",
  "户外": "Extérieur",
  "斗牛场公共": "Arènes / espace public",
  "杜乐丽花园": "Jardin des Tuileries",
  "树林": "Bois",
  "森林休闲空间": "Espace de loisirs en forêt",
  "槌球活动空间": "Terrain de croquet",
  "河岸": "Bord de rivière",
  "海滩/海滨": "Plage / bord de mer",
  "滑冰场": "Patinoire",
  "画室私人": "Atelier privé",
  "神话化自然场景": "Paysage naturel mythologique",
  "私人 / 办公室": "Espace privé / bureau",
  "私人 / 化妆间": "Espace privé / loge",
  "私人 / 卧室": "Espace privé / chambre",
  "私人 / 浴室": "Espace privé / salle de bains",
  "私人 / 画室": "Espace privé / atelier",
  "私人 / 虚构的东方主义空间": "Espace privé / espace orientaliste fictif",
  "私人 / 闺房": "Espace privé / boudoir",
  "私人/半户外": "Espace privé / semi-extérieur",
  "私人卧室": "Chambre privée",
  "私人肖像空间": "Espace privé de portrait",
  "私人花园": "Jardin privé",
  "私人角落": "Coin privé",
  "舞台": "Scène",
  "花园/户外休闲": "Jardin / loisirs en plein air",
  "花园背景": "Jardin en arrière-plan",
  "赛马场": "Hippodrome",
  "近郊休闲空间": "Espace de loisirs périurbain",
  "郊野": "Campagne",
  "铁路边": "Bord de voie ferrée",
  "马戏团/室内/公共/娱乐空间": "Cirque / intérieur / espace public / divertissement",
};

const containsChinese = (value: string) => /[\u3400-\u9fff]/u.test(value);

export const frenchRole = (value: string) => roles[value] ?? value;
export const frenchClass = (value: string) => classes[value] ?? value;
export const frenchRelation = (value: string) => relations[value] ?? value;
export const frenchTag = (value: string) => tags[value] ?? value;
export const frenchScene = (value: string) => {
  const reviewed = reviewedScenes[value] ?? scenes[value];
  if (reviewed) return reviewed;
  const fallback = genericSpace(value);
  if (!containsChinese(fallback)) return fallback;
  if (process.env.NODE_ENV !== "production") console.warn(`Untranslated specific space: ${value}`);
  return "Lieu non renseigné";
};
export const frenchSpecificSpace = (nameZh: string, nameFr?: string | null) =>
  specificSpaces[nameZh] ?? nameFr ?? frenchScene(nameZh);
export const frenchDecade = (value: string) => value.replace(/^(\d{4})年代$/, "Années $1");
