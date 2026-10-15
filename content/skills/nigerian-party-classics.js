import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/nigerian-party-classics.json';

// "How to cook fried rice", "jollof rice" and "puff puff" lead YouTube’s cooking searches in
// Nigeria. Taught by Nigerian food channels with millions of views: Kikifoodies, Sisi
// Jemimah, Flo Chinyere (All Nigerian Recipes), SisiYemmie and Tspices Kitchen.

export default {
  slug: 'skill-nigerian-party-classics',
  title: 'Cook Nigerian party classics',
  description: 'Make the stew base, smoky party jollof rice, Nigerian fried rice, puff puff and chin chin, the dishes on every Nigerian party plate.',
  makeTitle: 'A Nigerian party plate: jollof rice, fried rice and puff puff',
  skillId: 'cooking',
  cover: 'z4tNAyRdo70',
  by: 'Kikifoodies',
  videos,
  lessons: {
    Xvxwcl94uKw: {
      title: 'Parboil rice',
      try: 'Parboil two cups of long-grain rice: bring it to the boil, cook a few minutes, then drain and rinse it until the water runs clearer.',
      minutes: 15,
      questions: [
        q.single('Why parboil and rinse rice for jollof?', ['To remove excess starch so the grains stay separate', 'To add colour', 'To cook it fully', 'To make it sticky'], 0),
        q.tf('Long-grain parboiled rice is the usual choice for Nigerian jollof.', true),
      ],
    },
    G6ion1kZ0sA: {
      title: 'Nigerian stew',
      try: 'Blend tomatoes, red bell peppers, scotch bonnet and onion. Fry the blend in oil until the sourness cooks out and the oil rises to the top.',
      minutes: 60,
      questions: [
        q.single('How can you tell a tomato stew base is cooked enough?', ['The oil rises to the top and the raw, sour taste is gone', 'It boils once', 'It turns pale', 'After two minutes'], 0),
        q.multi('Which go into a classic Nigerian stew blend?', ['Tomatoes', 'Red bell peppers (tatashe)', 'Scotch bonnet (ata rodo)', 'Bananas'], [0, 1, 2]),
      ],
    },
    MfcxtclSj9I: {
      title: 'Tomato stew, the classic way',
      try: 'Make a pot of stew with your choice of chicken, beef or turkey. Keep some aside: it is the flavour base for jollof.',
      minutes: 90,
      questions: [
        q.single('Frying the tomato paste before adding the blend helps…', ['Remove its sour, raw taste', 'Thin the stew', 'Cool the oil', 'Add sugar'], 0),
        q.tf('Using the stock from boiling your meat gives a stew more flavour.', true),
      ],
    },
    EfZEArZcfAY: {
      title: 'Party jollof rice, quick version',
      try: 'Watch the whole method, then write your shopping list and steps for cooking party jollof for four people.',
      minutes: 15,
      questions: [
        q.single('The smoky taste of “party jollof” traditionally comes from…', ['Cooking on low heat until the bottom slightly catches', 'Adding smoke liquid only', 'Boiling the rice in water', 'Using white rice uncooked'], 0),
        q.tf('Jollof rice is cooked in a tomato and pepper base with stock and spices.', true),
      ],
    },
    z4tNAyRdo70: {
      title: 'Perfect party jollof rice',
      try: 'Cook party jollof: fry the base, add stock and seasoning, add parboiled rice, cover with foil and a lid, and steam on low heat until tender.',
      minutes: 90,
      questions: [
        q.single('Covering the pot with foil under the lid helps the rice…', ['Steam in its own moisture without burning', 'Cook faster on high heat', 'Turn white', 'Absorb less flavour'], 0),
        q.single('Why cook jollof on low heat?', ['So the rice steams evenly without burning badly', 'To save gas only', 'To make it soggy', 'Because high heat changes the colour'], 0),
        q.multi('Which seasonings are common in Nigerian jollof?', ['Curry powder', 'Thyme', 'Bay leaves', 'Chocolate'], [0, 1, 2]),
      ],
    },
    '1UGYWP4WeYI': {
      title: 'The best Nigerian fried rice',
      try: 'Chop carrots, green beans and onions into small, even pieces, and cook the rice in seasoned stock until just tender.',
      minutes: 60,
      questions: [
        q.single('Nigerian fried rice usually gets its yellow colour from…', ['Curry powder', 'Tomato', 'Palm oil', 'Food colouring only'], 0),
        q.single('Cutting the vegetables to the same small size helps them…', ['Cook evenly and look neat', 'Stay raw', 'Change colour', 'Absorb oil'], 0),
      ],
    },
    k3NPaMDzRXg: {
      title: 'Special chicken fried rice',
      try: 'Fry your rice and vegetables in batches on high heat, then mix everything together. Taste and adjust the seasoning.',
      minutes: 60,
      questions: [
        q.single('Why fry the rice in batches?', ['So each batch fries instead of steaming in a crowded pot', 'To use more oil', 'To cook slower', 'It isn’t needed'], 0),
        q.tf('Rice that is cooked but still firm fries better than soft, mushy rice.', true),
      ],
    },
    QMDaxjc11xc: {
      title: 'Puff puff',
      try: 'Mix flour, sugar, yeast, nutmeg and warm water into a smooth, thick batter. Cover it and leave it somewhere warm to rise.',
      minutes: 20,
      questions: [
        q.single('What makes puff puff dough rise?', ['Yeast', 'Baking soda only', 'Eggs', 'Salt'], 0),
        q.single('The batter should rise in a…', ['Warm place, covered', 'Fridge', 'Freezer', 'Hot oven'], 0),
      ],
    },
    rA3Wi3AVB7Y: {
      title: 'Puff puff, step by step',
      try: 'Fry your risen batter in medium-hot oil, scooping small balls with your hand or a spoon. Drain them on paper towels.',
      minutes: 60,
      questions: [
        q.single('If puff puff browns outside but stays raw inside, the oil is…', ['Too hot', 'Too cold', 'Just right', 'Too old'], 0),
        q.single('If puff puff soaks up a lot of oil, the oil was probably…', ['Not hot enough', 'Too hot', 'Fresh', 'Salted'], 0),
        q.tf('You should never pour water on a pan of burning oil.', true, 'Turn off the heat and cover the pan to smother it.'),
      ],
    },
    'qVK-uM9Tn4c': {
      title: 'Chin chin, fried and baked',
      try: 'Make a small batch of chin chin, then serve your party plate of jollof, fried rice and puff puff. Log a photo as your make.',
      minutes: 90,
      questions: [
        q.single('Chin chin dough is cut into…', ['Small cubes or strips before frying or baking', 'Large loaves', 'Balls dropped from a spoon', 'Thin pancakes'], 0),
        q.tf('Chin chin can be fried or baked.', true),
      ],
    },
  },
  modules: [
    {
      title: 'Rice and the stew base',
      lessons: ['Xvxwcl94uKw', 'G6ion1kZ0sA', 'MfcxtclSj9I'],
      checkpoint: exam('Rice and stew exam', [
        q.single('Parboiling rice means…', ['Partly cooking it, then draining and rinsing', 'Cooking it fully', 'Frying it dry', 'Soaking it overnight only'], 0),
        q.single('Rinsing parboiled rice removes…', ['Excess starch that makes rice sticky', 'All the flavour', 'The colour', 'Salt'], 0),
        q.single('Tatashe is…', ['Red bell pepper', 'Scotch bonnet', 'Onion', 'Tomato paste'], 0),
        q.single('Ata rodo is…', ['Scotch bonnet pepper', 'Red bell pepper', 'Thyme', 'Curry'], 0),
        q.single('The stew is ready when…', ['The oil floats on top and the sour taste is gone', 'It just starts to bubble', 'It is still bright orange and watery', 'After five minutes'], 0),
        q.tf('Frying the stew base well is what stops jollof from tasting sour.', true),
        q.multi('Which can you use to make the stew?', ['Chicken', 'Beef', 'Turkey', 'Ice cream'], [0, 1, 2]),
        q.single('Meat stock from boiling the meat is used to…', ['Add flavour to the stew and the rice', 'Clean the pot', 'Thin the oil', 'Colour the rice yellow'], 0),
        q.single('Why stir the stew often while it fries?', ['So it doesn’t burn at the bottom', 'To cool it', 'To add air', 'To thicken the oil'], 0),
        q.order('Put the stew steps in order.', ['Boil and season the meat', 'Blend tomatoes, peppers and onion', 'Fry the blend in oil until the sourness cooks out', 'Add stock and seasoning', 'Add the meat and simmer']),
        q.tf('Leftover stew keeps well in the fridge or freezer for later meals.', true),
        q.single('Excess water in the blend should be…', ['Boiled off before frying, or drained', 'Kept to make it thin', 'Added more of', 'Frozen'], 0),
      ]),
    },
    {
      title: 'Party jollof rice',
      lessons: ['EfZEArZcfAY', 'z4tNAyRdo70'],
      checkpoint: exam('Jollof rice exam', [
        q.order('Put party jollof in order.', ['Fry the tomato and pepper base', 'Add stock, seasoning and spices', 'Add the parboiled rice', 'Cover with foil and a lid', 'Steam on low heat until tender']),
        q.single('How much liquid should you add to the rice?', ['Just enough to cook it, adding more only if needed', 'Twice as much as for boiled rice', 'None', 'Enough to make soup'], 0),
        q.single('Too much liquid makes jollof…', ['Soggy and mushy', 'Smoky', 'Crispy', 'Spicy'], 0),
        q.single('The foil under the lid traps…', ['Steam, so the rice cooks evenly', 'Smoke', 'Oil', 'Salt'], 0),
        q.tf('Stirring jollof too often can break the grains and make it mushy.', true),
        q.single('The slightly burnt bottom layer that gives party jollof its flavour is…', ['A prized smoky taste when it doesn’t go too far', 'Always a mistake', 'Raw rice', 'Undercooked stew'], 0),
        q.multi('Which spices are common in jollof?', ['Curry', 'Thyme', 'Bay leaves', 'Cinnamon sugar'], [0, 1, 2]),
        q.single('Your jollof is cooked on top but still hard at the bottom. What helps?', ['Add a little stock, cover and steam a bit longer on low heat', 'Turn the heat to maximum', 'Add raw rice', 'Serve it'], 0),
        q.single('Why use parboiled long-grain rice?', ['It holds its shape and doesn’t clump', 'It cooks in one minute', 'It is sticky', 'It absorbs no flavour'], 0),
        q.tf('Tasting and adjusting the salt and seasoning in the sauce before adding rice is easier than fixing it after.', true),
        q.single('Butter or sliced onions and tomatoes stirred in at the end add…', ['Extra flavour and the classic party finish', 'Colour only', 'Water', 'Smoke'], 0),
        q.single('Jollof is served with…', ['Fried plantain, chicken, salad or coleslaw', 'Custard', 'Tea only', 'Nothing ever'], 0),
      ]),
    },
    {
      title: 'Nigerian fried rice',
      lessons: ['1UGYWP4WeYI', 'k3NPaMDzRXg'],
      checkpoint: exam('Fried rice exam', [
        q.multi('Which vegetables are typical in Nigerian fried rice?', ['Carrots', 'Green beans', 'Sweet corn', 'Okra'], [0, 1, 2]),
        q.single('Nigerian fried rice is usually cooked…', ['In seasoned stock with curry, then fried with the vegetables', 'In tomato stew like jollof', 'Raw in hot oil', 'In palm oil only'], 0),
        q.single('Why fry in batches?', ['A crowded pot steams instead of fries', 'It uses less heat', 'It is traditional only', 'It cooks the rice softer'], 0),
        q.single('Vegetables in fried rice should be…', ['Crunchy and bright, not overcooked', 'Very soft', 'Raw and cold', 'Blended'], 0),
        q.tf('Rice cooked until just firm fries better than very soft rice.', true),
        q.single('Liver or chicken in fried rice is…', ['A common, optional addition', 'Required', 'Never used', 'Only for jollof'], 0),
        q.single('High heat when frying gives…', ['Lightly fried grains with flavour', 'Mushy rice', 'Raw vegetables only', 'A sauce'], 0),
        q.order('Put fried rice in order.', ['Cook the rice in seasoned stock with curry', 'Chop the vegetables small and even', 'Fry the vegetables briefly', 'Fry the rice in batches with the vegetables', 'Mix together and adjust seasoning']),
        q.single('Your fried rice is pale. What could help?', ['A little more curry while cooking the rice', 'More water', 'Less heat', 'More salt only'], 0),
        q.tf('Fried rice and jollof are often served together at Nigerian parties.', true),
        q.single('Why cut carrots and green beans to the size of a pea?', ['They cook evenly and mix well with the rice', 'They look bigger', 'They stay raw', 'It saves time only'], 0),
        q.single('Leftover fried rice should be…', ['Cooled quickly and kept in the fridge', 'Left out overnight', 'Frozen hot in a closed tin', 'Washed'], 0),
      ]),
    },
    {
      title: 'Small chops: puff puff and chin chin',
      lessons: ['QMDaxjc11xc', 'rA3Wi3AVB7Y', 'qVK-uM9Tn4c'],
      checkpoint: exam('Puff puff and chin chin exam', [
        q.single('Puff puff rises because of…', ['Yeast', 'Baking powder only', 'Whipped eggs', 'Salt'], 0),
        q.single('The water for yeast should be…', ['Warm, not hot', 'Boiling', 'Ice cold', 'Salted heavily'], 0),
        q.single('Risen puff puff batter looks…', ['Bubbly and about doubled in size', 'Flat and dense', 'Watery', 'Dry and crumbly'], 0),
        q.single('Puff puff that is dark outside and raw inside means the oil was…', ['Too hot', 'Too cold', 'Perfect', 'Not enough'], 0),
        q.single('Greasy, flat puff puff means the oil was…', ['Not hot enough', 'Too hot', 'Perfect', 'Too deep'], 0),
        q.tf('Testing a small drop of batter first tells you if the oil is ready.', true),
        q.single('If oil catches fire, you should…', ['Turn off the heat and cover the pan; never use water', 'Throw water on it', 'Carry the pan outside', 'Blow on it'], 0),
        q.multi('Which go into chin chin dough?', ['Flour', 'Butter or margarine', 'Sugar', 'Yeast and a long rise'], [0, 1, 2]),
        q.single('Chin chin is made crunchy by…', ['Frying or baking small pieces until golden', 'Boiling them', 'Steaming them', 'Leaving them raw'], 0),
        q.single('Nutmeg is used in puff puff and chin chin for…', ['Flavour', 'Rising', 'Colour', 'Crunch'], 0),
        q.order('Put puff puff in order.', ['Mix flour, sugar, yeast and nutmeg', 'Add warm water and mix to a thick batter', 'Cover and let it rise', 'Fry small balls in medium-hot oil', 'Drain on paper towels']),
        q.single('Why drain fried snacks on paper towels?', ['To soak up excess oil', 'To cool them faster only', 'To add salt', 'To keep them soft'], 0),
      ]),
    },
  ],
};
