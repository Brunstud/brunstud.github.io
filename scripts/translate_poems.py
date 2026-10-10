"""Editorial English translations paired with imported original sentences.
Run after prepare_poems.py only when re-importing the source documents.
The published site has no dependency on either helper or on the DOCX files.
"""
import json
from pathlib import Path

translations = {
'同舟行': '''A newcomer to Huangdu, in the land of Chunshen; plum blossoms wind along the banks, and the water’s heart is clear.
Just leaving Yangpu, I wondered where to go—then heard a dragon’s cry upon the Tongzhou River.
War drums thunder through the waves; long cries split the banks and ride the tide.
A hundred paddles scatter jade-white spray; one boat drives into the misty water.
As a child I heard of elders racing dragon boats, and wore through pages singing of the Dragon Boat Festival.
The older boys laughed: rowing makes strong bones; the older girls praised the coach as dear as a father.
The dragon’s force first shook my heart; with a startled shout, I longed to try the oar.
Fate quietly turned toward a dragon-boat class; the water drew my drifting life into this song.
I first met Coach Yu, upright and broad-backed, his bearing bright and sharp as a spear.
Asked where to turn the rudder when we drifted, I answered: where it points, the boat will go.
One lucky answer unlocked the secret; bewildered, I was chosen to steer the long boat.
At first my hands and rudder shared no understanding; we lurched from side to side, the hull awash.
Then I left the stern and took a paddler’s seat, discovering how joyful rowing could be.
Slender willows brushed the banks beneath passing clouds; fish followed the shadows of our paddles.
One boat, one breath, lifting the tide; dragons raced abreast like flying shuttles.
At Jiayuan our first formation took shape; the coach smiled and urged me not to waste the chance.
I first tested myself among the dragon crew: an eight-kilometre run, a hundred pull-ups to grind me down.
Breath gone, arms weak, my body near breaking; I looked up—every shoulder beside me still worked.
The greater the pain, the clearer the mind, tempered into iron; the greater the weariness, the hotter the blood.
The weight of water rose before us like a fortress; to break the flood, our bones must become spears.
Clothes straightened, paddles ready by the bank—a vivid company, each with a style their own.
A yellow-haired grin startled the newcomers; the women’s captain warmed our talk like spring.
The stroke paddler’s gaze surveyed the gathering; a deft turn at the stern traced an arc upon the water.
Few words on the starboard side, but strength enough to fill the hull; a rocker’s long hair followed the waves.
A slight frame held a mighty spirit; a rower from Siping came aboard the dragon boat.
The veteran scout stood broad across the shoulders; the muscular young man rose like a mountain.
The poker king’s luck outplayed the crowd; the graduate veterans commanded respect without a word.
The Naruto-loving youth shouldered his mission; the young smoker and drinker took up his paddle too.
Two strong paddlers from Fujian and Guangdong vied to lead; those from the far west and northeast gave no ground.
A spirited sister earned the name of “brother”; the singer’s shout brought every voice into accord.
The Fujian helmsman held his arc through a hundred contests; a cosplayer’s changing clothes danced through the scene.
Twelve punishing laps with the long paddle—stroke after stroke until no strength remained.
The white waves blurred like mist before my eyes; the world beyond my body slipped away.
Then a long cry broke through the cold; the whole boat seemed to push me onward.
I raised my voice, my blood grew warm again; the water drew our joined hearts toward the finish.
Our first expedition: Fengxiang Lake in Feixi, where five hundred metres tested our ambition.
The night before, we wandered out for barbecue; over raised cups, new voices became familiar.
We lingered in the smoke and glow of roadside stalls, talking half the night of life beyond the water.
Next morning we lined up, drums within our chests; the starting shot sent every dragon surging with one cry.
Strength spent, I still dropped my paddle with the rest; a thousand voices buoyed me like the waves.
Only then did I see the gulf between us and the best; home again, I quietly vowed to close it.
Training partners gathered at the high bar, competing through a hundred pull-ups, arms refusing rest.
Late conversations in the dim upstairs canteen—food, drink, games, and all the pleasures of our youth.
My body loosened into the boat’s rhythm; clear ripples quietly entered the lake within my heart.
I leaned into each stroke to drive despondency away; half my youth became bound to this course.
From every corner we came to share one home; through the dragon boat, the world began to open.
Paddles bestowed, our names entered on the roster; with these long oars, we pledged to weather rise and fall together.
Morning cleared above Suzhou Creek; the swift current ran with undiminished force.
The drummer beat us into battle; the helmsman rode the fierce wake of the Maritime crew.
The stroke paddlers gathered every impulse into rhythm; the power seats drove us through wave after wave.
Suddenly the world became clear and empty; my body rose and fell with all our shouts.
The whole boat gathered into a single rising tide; silver won, the veterans’ eyes brimmed with tears.
In my final year, new faces joined the dragon boat; people came and went, while one hull waited on the water.
Yesterday’s novice had become a veteran; only then did I understand how body and water forget their boundaries.
Two defeats at Taizhou and Suzhou broke our charge; the afterglow of silver still haunted our dreams.
Old and new hands shared their cups, the song unfinished; ahead, the future lay hidden in mist.
People propel the boat, and the boat carries people; when I leave it, toward what journey do I go?
I packed my belongings and said farewell to school; far away in Zhongshan, we would write the final chapter.
Rain poured into the river, and we let it come; my whole body belonged to the boundless water.
How could that newcomer’s dream have foretold this? Parting stretched as long as the Pearl River.
Shoes cast off, glasses set aside, small encumbrances gone—only bodies and paddles for the final voyage.
Crowds thundered on both banks; our minds fixed on the long oars cleaving the wild waves.
The drum became the dragon’s head, rising through rain; the rudder its tail, steadying the tumult.
A hundred paddles entered the river, our bodies became waves; we flowed with the Pearl in streaks of light.
Suddenly a long dragon seemed to leap from the river; forgetting ourselves, we soared toward the distance.
Across one line, the world opened wide; no other boat sailed on the river ahead.
Strength exhausted, we still raised our long paddles; clouds parted, and sunlight filled the sky.
Do not refuse another Wusu beer; a thousand old stories still await their telling.
One meeting aboard a boat made us trusted friends; ten thousand miles apart, we still share a home.
If someone asks, in years to come, about Tongji—tell them this chapter of our voyage together.''',
'阉人吟': '''Twice brought low, as though falling a thousand fathoms into ice; every hope undone, the soaring swan retreats.
Autumn sand settles across eight hundred li of distant shoals; ninety thousand li of sky lie empty and still.
Mount Hua towers too high for sparrows to perch; in the desolate grove, where can the little quail find peace?
Hollow and listless, so long unable to rise—alas!
I drag my steps as those behind draw closer, then far ahead.
Knowing I have come to nothing, where am I to go?
Parting’s murky mist shrouds the way—who can escape it?
Long watching the evening star, I have seen no dawn; through all the sunset’s red, I have not grasped the sun’s fierce heat.
Ashamed that all my toil dissolved into obscurity; regretful that stubborn pride left no hope of turning back.
The phoenix rises through rebirth, the remaining swans disperse; the great Peng flies south, and common birds fade homeward.
I do not ask to pluck the stars from the vast sky; let bright hours and dawn’s dreams linger no longer over a fallen king.
The realm of Huaxu is gone; winter wind sobers the wine. The dream of Nanke unfinished, tears lie scattered everywhere.
Grief and bitter regret burn through the heavy frost; desolation, hard to bear, meets yet another cold.
How can my loneliness blame the branches tangled in the courtyard?
Alone and destitute, I heed no wounds along the byways!
Though worn away, I rise to carry what remains; when migrant birds set out again, who can hold their gifts in check?
Long have I slept; now the path shines clear—the stretching branches shall no longer fear the shears!
Caught short on every side, my horse stumbled; I dismissed it as a fool’s needless worry.
Suddenly all came apart, like a breached embankment; looking back, I found even the fragments burned.
Full of ambition, yet frightened by wind and cranes—how did my careless laughter turn so bitter and cold?
I took a rule as sacred without asking whether it was true; before enduring hardship, I mistook wild anger for my answer.
Anxiety and anger linger; the time I hoped for is lost. I resolve to learn from regret, and set it down in this long song.''',
'霸王别姬': '''Flying hooves pass over the fallen; behind them dust rises, then settles.
A thousand soldiers pursue ten riders; swords and sabres never cease to ring.
The hero must at last fall, his valour named through countless ages.
Though all beneath heaven destroy me, I shall die fighting, never yield.
In spring the King of Han assembled troops, intending to march east against Chu.
Five hundred and sixty thousand, all strong soldiers from the west of Shu.
Xiang Yu led his own men, bent on conquering the realm.
With thirty thousand loyal soldiers, he broke a Han host many times their number.
City after city fell; again and again Liu Bang was driven back.
Pengcheng shook beneath the blows; sand and stones flew for a thousand li.
Zhou Ke was boiled at Xingyang; Peng Yue fled toward Dong’e.
Fighting in every direction, the army wearied and the grain convoys faltered.
“The world is in turmoil because the two of us contend.
Why not end it in a single fight, and spare the people’s suffering!”
The King of Xiang stood with spear upright, glaring as he issued his challenge.
The King of Han declined, reluctantly sending another to reply.
At Honggou they made their pact, dividing the lands beneath heaven.
Chu’s army withdrew eastward; Han struck while it was vulnerable.
Alas, fortune failed him, and achievement turned upon itself.
Even chosen troops cannot endure forever; a long encampment brought an end to grain.
At Gaixia the remnant army held its walls, surrounded by the lords on every side.
Lady Yu sat in thought as songs of Chu rose all around.
“Setting sun, O setting sun—deep in thought, I dwell on memory.
Long road, O long road—the campaigning general yearns for home.”
The King of Xiang invited his men to drink and speak of their former courage.
She knew his enterprise was nearing its end, and softly sang for him.
“Hegemon of Chu, you set your heart on conquering the world.
Proud and solitary general, you went alone into the field.
You turned against the multitude and buried Qin’s soldiers by the myriad.
You dealt ill with the ruler you had raised, slaying the Righteous Emperor upon the river.
Your strength could uproot mountains; none could halt your advance.
Your spirit overshadowed the age—who could rival such boldness?
Who foresaw the grain exhausted, your weary strength unable to answer?
Who foresaw the army spent, the siege too hard to break?
Only the wish remains unfulfilled, the great work still undone.
Only the will remains unspent, with the world still unconquered.”
The King of Xiang set down his cup and smiled, rising among his soldiers.
Regret beyond reckoning seized him; he pressed his chest and heaved a long sigh.
“Why does heaven above seek to end me at this hour?
Why, Lady Yu, does it still begrudge us fulfilment!”
The beauty wept beside him, her resolve made firm in sorrow.
None could lift their eyes; together they gave voice to grief.
As the hour drew closer, he left a blade behind and mounted his horse.
Leading a dozen brave men, he rode a hundred li through the enemy.
“Heaven envies the Hegemon; this is no failure in battle!”
His long spear raised, he drove his horse straight into the foe.
Flying hooves passed over the fallen; swords and sabres never ceased to ring.
He cut down commanders, broke a path, and felled their banners on the way to the Wu River.
The ferryman waited with his boat; the Hegemon refused to cross.
“My duty in this life is done—why trouble you again!”
Lady Yu took the remaining blade and silently cut her throat.
Xiang Yu bared his sharp sword; in an outcry to heaven, the Hegemon ended his life.'''
}
metadata = {
 '同舟行': ('tong-zhou-xing', 'A Song of the Shared Boat', '二〇二六届龙舟队队员', 'Dragon boat team, Class of 2026', 'The source credits the dragon boat team, Class of 2026. Numerical references to accompanying team recollections are omitted from this reading edition; the poem’s wording is preserved.'),
 '阉人吟': ('yan-ren-yin', 'Lament of the Emasculated', '', '', 'A figurative lament of lost ambition and renewed resolve. Huaxu and Nanke evoke dream-worlds; the great Peng and the small quail recall contrasting scales of aspiration. The final stanza is the source’s 补叙 (Afterword).'),
 '霸王别姬': ('ba-wang-bie-ji', 'The Hegemon Bids Farewell to His Beloved', '', '', 'A poetic retelling of Xiang Yu and Lady Yu. The translation follows the poem’s own sequence and imagery, rather than recasting it as a historical account.'),
}
poems=[]
for title, english in translations.items():
 lines=json.loads(Path(f'qa/{title}.json').read_text(encoding='utf-8'))
 translated=english.splitlines()
 assert len(lines)==len(translated),(title,len(lines),len(translated))
 for original,translation in zip(lines,translated): original['en']=translation
 slug,englishTitle,byline,englishByline,notes=metadata[title]
 poems.append(dict(slug=slug,title=title,englishTitle=englishTitle,byline=byline,englishByline=englishByline,lines=lines,notes=notes))
Path('src/content/poems.json').write_text(json.dumps(poems,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Published',len(poems),'poems;',sum(len(p['lines']) for p in poems),'translated sentences.')
