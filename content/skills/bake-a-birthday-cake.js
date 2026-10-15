import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/bake-a-birthday-cake.json';

// "How to bake a cake" is a top cooking search everywhere, and in Nigeria so is "how to bake
// cake without oven". From The Clever Dough Lady, Preppy Kitchen, Chef Maah, Recipes by
// Carina, Cakes by MK, Pastry Living with Aya, Savor Easy, British Girl Bakes and Ceekoni Bakes.

export default {
  slug: 'skill-bake-a-birthday-cake',
  title: 'Bake and decorate a birthday cake',
  description: 'Bake a soft vanilla cake (with or without an oven), whip up buttercream, frost a layer cake with smooth sides, and pipe simple decorations.',
  makeTitle: 'A birthday cake you baked, frosted and decorated yourself',
  skillId: 'cooking',
  cover: 'WSxLLLOe1D0',
  by: 'Preppy Kitchen',
  videos,
  lessons: {
    cIjJ9Bce3tI: {
      title: 'Make a cake at home, step by step',
      try: 'Read the recipe through, set out every ingredient at room temperature, preheat your oven, and grease and line your tin before you start mixing.',
      minutes: 20,
      questions: [
        q.single('Why bring butter and eggs to room temperature?', ['They mix smoothly and trap more air', 'They bake faster', 'They taste sweeter', 'It isn’t needed'], 0),
        q.single('Why preheat the oven?', ['So the cake starts baking at the right temperature straight away', 'To save electricity', 'To melt the butter', 'To dry the tin'], 0),
      ],
    },
    EYXQmbZNhy8: {
      title: 'A classic vanilla cake',
      try: 'Bake the vanilla cake. Check it with a toothpick in the centre: it is done when it comes out clean or with a few dry crumbs.',
      minutes: 90,
      questions: [
        q.single('Creaming butter and sugar means beating them until…', ['Light, pale and fluffy', 'Melted', 'Grainy and cold', 'Separated'], 0),
        q.single('Overmixing after adding flour makes a cake…', ['Tough and dense', 'Lighter', 'Sweeter', 'Taller'], 0),
        q.tf('A toothpick that comes out clean from the centre means the cake is baked.', true),
      ],
    },
    '9pM6G_64bGU': {
      title: 'Bake a cake without an oven or mixer',
      try: 'No oven? Bake your cake in a covered pot on a raised stand over low heat, as in the video. Have an oven? Watch, and note how the method differs.',
      minutes: 60,
      questions: [
        q.single('When baking in a pot on the stove, the cake tin should sit…', ['Raised off the bottom, with the pot covered, on low heat', 'Directly on high heat', 'In boiling water', 'Uncovered'], 0),
        q.tf('You can mix a cake batter by hand with a whisk or wooden spoon.', true),
      ],
    },
    HPavvkTPQX0: {
      title: 'Dreamy buttercream',
      try: 'Make a batch of buttercream: beat soft butter until pale, add icing sugar gradually, then vanilla and a splash of milk or cream.',
      minutes: 20,
      questions: [
        q.multi('Which go into basic buttercream?', ['Butter', 'Icing (powdered) sugar', 'Milk or cream', 'Yeast'], [0, 1, 2]),
        q.single('Buttercream that is too stiff to spread needs…', ['A little more milk or cream', 'More icing sugar', 'Freezing', 'Flour'], 0),
      ],
    },
    'ZD8v-gW4bjY': {
      title: 'Perfect buttercream icing',
      try: 'Colour a small bowl of buttercream with a little gel food colouring for decorating.',
      minutes: 15,
      questions: [
        q.single('Gel food colouring is preferred because…', ['It gives strong colour without making the icing runny', 'It is tasteless and colourless', 'It thickens icing', 'It is cheaper'], 0),
        q.single('Sifting icing sugar helps buttercream be…', ['Smooth, without lumps', 'Yellow', 'Runny', 'Salty'], 0),
      ],
    },
    LtE1623OMNc: {
      title: 'Frost your first layer cake',
      try: 'Level your cooled cakes, stack them with buttercream between, and apply a thin crumb coat. Chill for 20 minutes.',
      minutes: 30,
      questions: [
        q.single('A crumb coat is…', ['A thin first layer of frosting that traps crumbs', 'A layer of cake crumbs on top', 'The final decoration', 'A glaze'], 0),
        q.single('Why cut the dome off a cake layer?', ['So the layers stack flat and level', 'To make it taste better', 'To cool it faster', 'To remove the crust'], 0),
        q.tf('Frosting a warm cake makes the buttercream melt and slide.', true),
      ],
    },
    VYXS0Veg7bw: {
      title: 'How to frost a cake',
      try: 'Apply the final coat of buttercream and smooth the sides with a scraper while turning the cake.',
      minutes: 30,
      questions: [
        q.single('A turntable helps you…', ['Smooth the sides evenly while the cake turns', 'Bake the cake', 'Mix buttercream', 'Cut layers'], 0),
        q.single('A bench scraper is held…', ['Steady against the side while you turn the cake', 'Flat on top', 'Moving fast up and down', 'Inside the cake'], 0),
      ],
    },
    'FecDIPGI0-c': {
      title: 'Seven piping techniques with one tip',
      try: 'Practise each piping technique on a plate or baking paper before you touch your cake.',
      minutes: 15,
      questions: [
        q.tf('Practising piping on a plate or baking paper first is a good idea; you can scrape it back into the bowl.', true),
        q.single('Even pressure on the piping bag gives…', ['Even, consistent shapes', 'Blobs', 'Broken lines', 'No icing'], 0),
      ],
    },
    '5SmdFuKpDHE': {
      title: 'Six designs with one piping tip',
      try: 'Pipe rosettes and stars with an open-star tip (like a 1M). Choose the design you will use on your cake.',
      minutes: 20,
      questions: [
        q.single('A rosette is piped by…', ['Spiralling out from the centre in a circle', 'Squeezing one dot', 'Drawing a straight line', 'Shaking the bag'], 0),
        q.single('Twisting the top of the piping bag helps…', ['Push icing down and stop it coming out the top', 'Cool the icing', 'Change the colour', 'Clean the tip'], 0),
      ],
    },
    DD3isr2W0V8: {
      title: 'Ten things I wish I’d known',
      try: 'Write down the three tips from the video you most need, and plan your decoration with them in mind.',
      minutes: 10,
      questions: [
        q.tf('Chilling a frosted cake firms the buttercream and makes decorating easier.', true),
        q.single('Why bake the layers a day ahead (or chill them)?', ['Cold, rested layers are easier to level, stack and frost', 'They taste sweeter', 'They rise more', 'It is required'], 0),
      ],
    },
    WSxLLLOe1D0: {
      title: 'Bake and decorate a birthday cake',
      try: 'Bake, fill, frost and decorate your birthday cake. Photograph it before it’s cut and log it as your make.',
      minutes: 180,
      questions: [
        q.order('Put a birthday cake in order.', ['Bake the layers', 'Cool them completely', 'Level and stack with filling', 'Crumb coat and chill', 'Final coat and decorate']),
        q.single('Which is the last step before photographing your cake?', ['Piping the decorations', 'Baking', 'Crumb coating', 'Levelling'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Bake the cake',
      lessons: ['cIjJ9Bce3tI', 'EYXQmbZNhy8', '9pM6G_64bGU'],
      checkpoint: exam('Baking exam', [
        q.order('Put a basic butter cake method in order.', ['Cream butter and sugar', 'Beat in the eggs', 'Add flour and milk alternately', 'Pour into lined tins', 'Bake until a toothpick comes out clean']),
        q.single('Why measure ingredients carefully when baking?', ['Baking is chemistry: small changes affect the rise and texture', 'It looks professional', 'It is faster', 'It changes the colour'], 0),
        q.single('Baking powder makes a cake…', ['Rise', 'Sweet', 'Moist', 'Brown'], 0),
        q.single('Opening the oven early in baking can make a cake…', ['Sink in the middle', 'Rise more', 'Bake faster', 'Taste sweeter'], 0),
        q.tf('Greasing and lining the tin helps the cake come out cleanly.', true),
        q.single('A cake that is dense and tough was probably…', ['Overmixed after adding flour', 'Undermixed', 'Baked in a lined tin', 'Made with soft butter'], 0),
        q.single('Butter creamed with sugar should look…', ['Pale and fluffy', 'Melted and oily', 'Grainy', 'Dark brown'], 0),
        q.single('Without an oven, you can bake in…', ['A covered pot on low heat with the tin raised inside', 'A microwave on full power for an hour', 'A frying pan uncovered on high heat', 'A kettle'], 0),
        q.tf('Cakes should cool in the tin a little, then fully on a rack before frosting.', true),
        q.multi('Which show a cake is done?', ['A toothpick comes out clean', 'The top springs back when pressed', 'The edges pull away from the tin', 'The batter is still wobbly'], [0, 1, 2]),
        q.single('Room-temperature eggs help the batter…', ['Stay smooth instead of curdling', 'Rise less', 'Taste of egg', 'Bake faster'], 0),
        q.single('Your cake domed and cracked on top. A common cause is…', ['An oven that is too hot', 'Too little sugar', 'A cold tin', 'Not enough flour'], 0),
      ]),
    },
    {
      title: 'Buttercream and frosting',
      lessons: ['HPavvkTPQX0', 'ZD8v-gW4bjY', 'LtE1623OMNc', 'VYXS0Veg7bw'],
      checkpoint: exam('Frosting exam', [
        q.single('Basic (American) buttercream is mostly…', ['Butter and icing sugar', 'Eggs and flour', 'Cream cheese only', 'Oil and water'], 0),
        q.single('Buttercream that is too soft and runny needs…', ['Chilling briefly, or more icing sugar', 'More milk', 'Heat', 'Water'], 0),
        q.single('A crumb coat stops…', ['Crumbs showing in the final coat', 'The cake rising', 'The icing setting', 'The cake drying'], 0),
        q.order('Put frosting a layer cake in order.', ['Level the cooled layers', 'Stack with buttercream between', 'Apply a thin crumb coat', 'Chill', 'Apply and smooth the final coat']),
        q.tf('Frosting a cake while it is still warm is a good idea.', false, 'Warm cake melts the buttercream.'),
        q.single('A turntable and a scraper help you get…', ['Smooth sides', 'A taller cake', 'A sweeter cake', 'A darker colour'], 0),
        q.single('A dab of buttercream under the bottom layer on the board…', ['Stops the cake sliding', 'Adds flavour', 'Makes it level', 'Colours the board'], 0),
        q.single('Gel food colouring is best because…', ['A little gives strong colour without thinning the icing', 'It is clear', 'It is a liquid', 'It sets hard'], 0),
        q.multi('Which help smooth sides?', ['A chilled crumb coat', 'A bench scraper held steady', 'Turning the cake smoothly', 'Very warm buttercream'], [0, 1, 2]),
        q.single('Sharp top edges are made by…', ['Pulling the excess buttercream in from the edge with a spatula', 'Adding more icing on top', 'Cutting the cake', 'Freezing it'], 0),
        q.tf('Levelling layers makes a stacked cake straight instead of leaning.', true),
        q.single('Sifting icing sugar avoids…', ['Lumps in the buttercream', 'Sweetness', 'Colour', 'Air'], 0),
      ]),
    },
    {
      title: 'Decorate',
      lessons: ['FecDIPGI0-c', '5SmdFuKpDHE', 'DD3isr2W0V8', 'WSxLLLOe1D0'],
      checkpoint: exam('Decorating exam', [
        q.single('An open-star tip like a 1M is great for…', ['Rosettes and stars', 'Writing tiny letters', 'Smoothing sides', 'Cutting layers'], 0),
        q.single('For neat piping, hold the bag…', ['Steady, with even pressure, twisting the top closed', 'Upside down', 'Loosely open at the top', 'Shaking it'], 0),
        q.single('To finish a piped star cleanly, you…', ['Stop squeezing, then lift the bag away', 'Pull up while squeezing hard', 'Twist the cake', 'Scrape it off'], 0),
        q.tf('Practising on baking paper first saves your cake from mistakes.', true),
        q.single('Chilling a frosted cake before piping…', ['Firms the surface so mistakes can be scraped off', 'Melts the icing', 'Makes it sink', 'Isn’t useful'], 0),
        q.multi('Which make a birthday cake look finished?', ['Piped border or rosettes', 'Neat writing or a topper', 'Sprinkles or fruit', 'Crumbs showing everywhere'], [0, 1, 2]),
        q.single('Writing on a cake is easiest with…', ['A small round tip', 'A large star tip', 'A spatula', 'A knife'], 0),
        q.single('Buttercream that is too warm when piping gives…', ['Soft, drooping shapes', 'Sharp shapes', 'No icing', 'Crunchy icing'], 0),
        q.order('Put the decorating steps in order.', ['Plan the design', 'Practise on paper', 'Pipe the main decoration', 'Add finishing touches', 'Chill to set']),
        q.tf('A simple, neat design often looks better than many decorations.', true),
        q.single('Spacing rosettes evenly around the top is easier if you…', ['Mark light dots first, like a clock face', 'Pipe as fast as possible', 'Pipe from the middle out only', 'Close your eyes'], 0),
        q.single('How should a finished buttercream cake be stored for a few hours?', ['Somewhere cool, or in the fridge in hot weather', 'In direct sun', 'In a hot car', 'Uncovered near the stove'], 0),
      ]),
    },
  ],
};
