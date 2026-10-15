import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/play-chess.json';

// "How to play chess" and "chess for beginners" are top searches in the US and Nigeria.
// The rules from Chess.com's short official series, then openings, tactics and avoiding
// blunders with Chess Vibes (Nelson Lopez), plus Howcast on opening principles.

export default {
  slug: 'skill-play-chess',
  title: 'Play chess and win your first games',
  description: 'Learn how every piece moves, the special rules, check, checkmate and draws, how to read chess notation, how to open a game well, and the tactics that win pieces.',
  makeTitle: 'A game you won against a friend or a computer, with the moves saved',
  skillId: 'chess',
  cover: '2uc_m_YGLyA',
  by: 'Chess.com',
  videos,
  lessons: {
    '1mshvpn8NLI': {
      title: 'Set up the board',
      try: 'Set up a board (real or on chess.com or lichess.org, both free) with the light square in the bottom-right corner and each queen on her own colour.',
      minutes: 10,
      questions: [
        q.single('When setting up, the bottom-right square should be…', ['Light', 'Dark', 'Either', 'Empty of pieces'], 0),
        q.single('The white queen starts on…', ['A light square (her own colour)', 'A dark square', 'The corner', 'Next to the rook'], 0),
      ],
    },
    ZWjDKiHBvZo: {
      title: 'The king and the goal',
      try: 'Move a king around an empty board, one square at a time in any direction.',
      minutes: 5,
      questions: [
        q.single('The aim of chess is to…', ['Checkmate the opponent’s king', 'Capture every piece', 'Reach the other side', 'Keep your queen'], 0),
        q.single('The king moves…', ['One square in any direction', 'Any number of squares', 'In an L-shape', 'Only forwards'], 0),
      ],
    },
    vwgwI0wnULU: {
      title: 'The queen',
      try: 'From the centre of an empty board, count how many squares a queen can reach.',
      minutes: 5,
      questions: [
        q.single('The queen moves…', ['Any number of squares straight or diagonally', 'One square any way', 'In an L-shape', 'Only diagonally'], 0),
        q.tf('The queen is the most powerful piece.', true),
      ],
    },
    'PlgnoYqsK-8': {
      title: 'The rook',
      try: 'Place a rook on a1 and list every square it can reach on an empty board.',
      minutes: 5,
      questions: [
        q.single('The rook moves…', ['Any number of squares in a straight line (up, down, sideways)', 'Diagonally', 'In an L-shape', 'One square only'], 0),
        q.tf('A rook can jump over other pieces.', false),
      ],
    },
    _y3eA21rD1w: {
      title: 'The bishop',
      try: 'Notice that each bishop stays on one colour all game. Move one around to see.',
      minutes: 5,
      questions: [
        q.single('The bishop moves…', ['Any number of squares diagonally', 'Straight lines only', 'In an L-shape', 'One square only'], 0),
        q.tf('A bishop always stays on squares of the same colour.', true),
      ],
    },
    VGoT8FR0O_8: {
      title: 'The knight',
      try: 'Starting from b1, find a route for a knight to reach every square of the board’s first two rows.',
      minutes: 10,
      questions: [
        q.single('The knight moves…', ['In an L-shape: two squares one way, one square sideways', 'Diagonally', 'Straight lines', 'One square any way'], 0),
        q.tf('The knight is the only piece that can jump over others.', true),
      ],
    },
    '00uUlbcPz5E': {
      title: 'The pawn',
      try: 'Practise pawn moves: one square forward, two on its first move, and diagonal captures.',
      minutes: 5,
      questions: [
        q.single('A pawn captures…', ['One square diagonally forward', 'Straight forward', 'Backwards', 'Sideways'], 0),
        q.single('On its first move, a pawn may move…', ['One or two squares forward', 'Three squares', 'Diagonally without capturing', 'Backwards'], 0),
      ],
    },
    Tt8VTZFPFa4: {
      title: 'Pawn promotion',
      try: 'Set up a pawn one square from the end, promote it to a queen, and use it.',
      minutes: 5,
      questions: [
        q.single('When a pawn reaches the far rank, it…', ['Becomes a queen, rook, bishop or knight', 'Is removed', 'Becomes a king', 'Goes back to the start'], 0),
        q.tf('Most players promote to a queen.', true),
      ],
    },
    FcLYgXCkucc: {
      title: 'Castling',
      try: 'Practise castling on both sides on a board, checking all the conditions first.',
      minutes: 10,
      questions: [
        q.single('When castling, the king moves…', ['Two squares towards a rook, which jumps to the other side of it', 'One square', 'Next to the queen', 'Any distance'], 0),
        q.multi('You can’t castle if…', ['The king or that rook has moved', 'There are pieces between them', 'The king is in check', 'Your queen has moved'], [0, 1, 2]),
      ],
    },
    c_KRIH0wnhE: {
      title: 'En passant',
      try: 'Set up an en passant position on a board and make the capture.',
      minutes: 5,
      questions: [
        q.single('En passant lets a pawn capture an enemy pawn that…', ['Just moved two squares and landed beside it', 'Is anywhere on the board', 'Is behind it', 'Has been promoted'], 0),
        q.tf('En passant must be done immediately, on the very next move, or the chance is gone.', true),
      ],
    },
    lBsWZqv5acI: {
      title: 'Check',
      try: 'Set up three positions where a king is in check from different pieces.',
      minutes: 5,
      questions: [
        q.single('“Check” means…', ['The king is under attack', 'The game is over', 'A piece is pinned', 'It is a draw'], 0),
        q.tf('You are never allowed to make a move that leaves your own king in check.', true),
      ],
    },
    vjJkdBXVgsk: {
      title: 'Getting out of check',
      try: 'For each check you set up, find all three ways out where possible.',
      minutes: 5,
      questions: [
        q.multi('Which are ways to get out of check?', ['Move the king', 'Block the check', 'Capture the checking piece', 'Castle'], [0, 1, 2]),
        q.single('If none of the ways out of check work, it is…', ['Checkmate', 'Stalemate', 'A draw by agreement', 'En passant'], 0),
      ],
    },
    'uu7ISsU-Ufw': {
      title: 'Checkmate',
      try: 'Set up a back-rank checkmate with a rook and confirm the king has no escape.',
      minutes: 5,
      questions: [
        q.single('Checkmate is when the king…', ['Is in check and has no legal way out', 'Has no moves but isn’t in check', 'Is captured', 'Reaches the centre'], 0),
        q.tf('In chess, the king is never actually captured.', true),
      ],
    },
    DoGVxiU2VFI: {
      title: 'Stalemate',
      try: 'Set up a stalemate position, then change one piece so it becomes checkmate.',
      minutes: 5,
      questions: [
        q.single('Stalemate is when a player…', ['Is not in check but has no legal moves', 'Is in check with no way out', 'Loses their queen', 'Runs out of time'], 0),
        q.single('Stalemate counts as…', ['A draw', 'A win for the side that stalemated', 'A loss', 'A restart'], 0),
      ],
    },
    O8cb34ADUCE: {
      title: 'Draws',
      try: 'Write down the ways a game can end in a draw.',
      minutes: 5,
      questions: [
        q.multi('Which can end a game in a draw?', ['Stalemate', 'The same position three times', 'Not enough pieces to checkmate', 'Losing a rook'], [0, 1, 2]),
        q.tf('Players can agree to a draw.', true),
      ],
    },
    XlxDsTzUqbY: {
      title: 'The language of chess',
      try: 'Play a short game against a computer and read back its moves in notation.',
      minutes: 10,
      questions: [
        q.single('In chess notation, files (columns) are named…', ['a to h', '1 to 8', 'A to Z', 'K Q R B N'], 0),
        q.single('Nf3 means…', ['A knight moves to f3', 'A pawn moves to f3', 'A king moves to f3', 'Nothing'], 0),
        q.single('O-O means…', ['Castling on the kingside', 'Castling on the queenside', 'A draw', 'Checkmate'], 0),
      ],
    },
    '86Is6YemsyA': {
      title: 'Piece values',
      try: 'Before each capture in your next game, add up the values to check the trade is good for you.',
      minutes: 5,
      questions: [
        q.match('Match each piece to its usual value in points.', [['Pawn', '1'], ['Knight', '3'], ['Rook', '5'], ['Queen', '9']]),
        q.single('Trading your rook for an opponent’s knight usually…', ['Loses about two points of material', 'Is an even trade', 'Wins material', 'Is impossible'], 0),
      ],
    },
    o74M2vKYpcc: {
      title: 'Three tips for the start of every game',
      try: 'Play one game following the three tips: control the centre, develop your pieces, and castle.',
      minutes: 20,
      questions: [
        q.multi('Which are good opening habits?', ['Control the centre', 'Develop knights and bishops', 'Castle early', 'Move the same piece many times'], [0, 1, 2]),
        q.single('Why castle early?', ['It keeps your king safe and connects the rooks', 'It wins a pawn', 'It is required', 'It ends the opening'], 0),
      ],
    },
    UoFqV1lxA7Q: {
      title: 'Three opening principles',
      try: 'Look at the first five moves of your last game: did you follow the principles?',
      minutes: 10,
      questions: [
        q.single('Bringing the queen out very early is risky because…', ['It can be chased by your opponent’s pieces, losing time', 'It is against the rules', 'The queen is weak', 'It ends the game'], 0),
        q.single('The four centre squares are…', ['d4, e4, d5 and e5', 'a1, h1, a8 and h8', 'c3, f3, c6 and f6', 'e1, d1, e8 and d8'], 0),
      ],
    },
    iNzy_dt68ng: {
      title: 'Scholar’s Mate',
      try: 'Play through Scholar’s Mate on a board so you can recognise it when someone tries it on you.',
      minutes: 5,
      questions: [
        q.single('Scholar’s Mate attacks which weak square for Black?', ['f7', 'e5', 'a7', 'd8'], 0),
        q.single('Which white pieces deliver Scholar’s Mate?', ['Queen and bishop', 'Two rooks', 'Knight and king', 'Two pawns'], 0),
      ],
    },
    NAdNHVFaMBk: {
      title: 'Stop the four-move checkmate',
      try: 'Play the Scholar’s Mate attack against a friend or computer and defend it both ways from the video.',
      minutes: 10,
      questions: [
        q.single('A good way to defend f7 against Qh5 and Bc4 is…', ['Bring a piece like the queen or a knight to guard it, or block with g6', 'Move the king forward', 'Ignore it', 'Push the a-pawn'], 0),
        q.tf('An early queen attack can be punished by developing pieces that attack the queen.', true),
      ],
    },
    '2uc_m_YGLyA': {
      title: 'Three openings for White',
      try: 'Pick one opening for White from the video and play it in three games.',
      minutes: 20,
      questions: [
        q.single('1. e4 is a popular first move because it…', ['Controls the centre and opens lines for the queen and bishop', 'Wins a piece', 'Castles', 'Is the only legal move'], 0),
        q.tf('Knowing the ideas behind an opening is more useful than memorising long lines.', true),
      ],
    },
    IjAfwEWEulo: {
      title: 'Three openings for Black',
      try: 'Pick one reply as Black to 1. e4 and play it in three games.',
      minutes: 20,
      questions: [
        q.single('1… e5 in reply to 1. e4…', ['Also claims a share of the centre', 'Loses the queen', 'Is illegal', 'Castles'], 0),
        q.single('As Black you…', ['Move second', 'Move first', 'Choose who moves first each turn', 'Start with an extra pawn'], 0),
      ],
    },
    MbMslp2WcI0: {
      title: 'Forks, pins and skewers',
      try: 'Solve ten beginner tactics puzzles on chess.com or lichess.org and name the tactic in each.',
      minutes: 20,
      questions: [
        q.single('A fork is…', ['One piece attacking two or more pieces at once', 'Two pieces attacking one', 'Castling', 'A draw'], 0),
        q.single('A pin is when a piece can’t move because…', ['It would expose a more valuable piece behind it', 'It is blocked by a pawn', 'It is in the corner', 'It has moved already'], 0),
        q.single('A skewer attacks…', ['A valuable piece that must move, exposing a piece behind it', 'Two pawns', 'The corner squares', 'Nothing'], 0),
      ],
    },
    'qCVNza5-09U': {
      title: 'More tactics: double attacks and discovered checks',
      try: 'Solve ten more puzzles, looking for discovered attacks and double checks.',
      minutes: 20,
      questions: [
        q.single('A discovered attack happens when…', ['Moving one piece reveals an attack by another behind it', 'You capture a pawn', 'You castle', 'You promote'], 0),
        q.single('The only way out of a double check is…', ['Moving the king', 'Blocking', 'Capturing one checking piece', 'Castling'], 0),
      ],
    },
    GfmDBpbqMAI: {
      title: 'Four steps to blunder less',
      try: 'Play a game, using the blunder check before every move. Win a game against a friend or a computer and log the saved moves as your make.',
      minutes: 60,
      questions: [
        q.single('A blunder is…', ['A bad mistake that loses material or the game', 'A clever sacrifice', 'A draw offer', 'Castling'], 0),
        q.single('Before each move, a simple blunder check is to look for…', ['Checks, captures and threats', 'The prettiest move', 'Pawn moves only', 'Nothing'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'The board and the pieces',
      lessons: ['1mshvpn8NLI', 'ZWjDKiHBvZo', 'vwgwI0wnULU', 'PlgnoYqsK-8', '_y3eA21rD1w', 'VGoT8FR0O_8', '00uUlbcPz5E', 'Tt8VTZFPFa4'],
      checkpoint: exam('Pieces exam', [
        q.single('Who moves first?', ['White', 'Black', 'Whoever wins a coin toss each move', 'The player with fewer pieces'], 0),
        q.single('How many pieces does each player start with?', ['16', '8', '12', '20'], 0),
        q.single('Which piece can jump over others?', ['The knight', 'The bishop', 'The rook', 'The queen'], 0),
        q.single('Which piece only moves diagonally?', ['The bishop', 'The rook', 'The knight', 'The king'], 0),
        q.single('Which piece moves only in straight lines?', ['The rook', 'The bishop', 'The knight', 'The pawn when capturing'], 0),
        q.single('A pawn captures by moving…', ['Diagonally forward one square', 'Straight forward', 'Backwards', 'Two squares sideways'], 0),
        q.tf('Pawns can never move backwards.', true),
        q.single('Which piece can a pawn NOT promote to?', ['A king', 'A queen', 'A knight', 'A rook'], 0),
        q.single('Where do the rooks start?', ['In the corners', 'Next to the king', 'In the centre', 'On the second row'], 0),
        q.order('Put White’s back row in order from left (a1) to right (h1).', ['Rook', 'Knight', 'Bishop', 'Queen', 'King']),
        q.single('From the centre of an empty board, which piece reaches the most squares?', ['The queen', 'The knight', 'The king', 'The pawn'], 0),
        q.single('Each bishop stays on…', ['One colour of square all game', 'The first row', 'Its starting file', 'Any colour'], 0),
      ]),
    },
    {
      title: 'Special moves, check and mate',
      lessons: ['FcLYgXCkucc', 'c_KRIH0wnhE', 'lBsWZqv5acI', 'vjJkdBXVgsk', 'uu7ISsU-Ufw', 'DoGVxiU2VFI', 'O8cb34ADUCE', 'XlxDsTzUqbY'],
      checkpoint: exam('Rules exam', [
        q.single('Castling is the only move where…', ['Two pieces move at once', 'A pawn moves backwards', 'A piece jumps twice', 'The king captures'], 0),
        q.multi('Which stop you castling?', ['Your king is in check', 'The king would pass through an attacked square', 'The rook has already moved', 'Your opponent has castled'], [0, 1, 2]),
        q.single('En passant can only capture…', ['A pawn that just moved two squares beside your pawn', 'Any pawn', 'A knight', 'A promoted pawn'], 0),
        q.multi('Which are ways out of check?', ['Move the king', 'Block', 'Capture the attacker', 'Promote a pawn elsewhere'], [0, 1, 2]),
        q.single('No legal moves and NOT in check is…', ['Stalemate, a draw', 'Checkmate, a win', 'A loss', 'Check'], 0),
        q.single('No way out of check is…', ['Checkmate', 'Stalemate', 'A draw', 'En passant'], 0),
        q.single('The same position repeated three times can be claimed as…', ['A draw', 'A win', 'A loss', 'Checkmate'], 0),
        q.single('King and knight against a lone king is a draw because…', ['There isn’t enough material to force checkmate', 'Knights can’t check', 'Kings can’t move', 'Of the 50-move rule only'], 0),
        q.single('In notation, + means…', ['Check', 'Checkmate', 'Capture', 'Castling'], 0),
        q.single('In notation, # means…', ['Checkmate', 'Check', 'A good move', 'A capture'], 0),
        q.single('Bxe5 means…', ['A bishop captures on e5', 'A bishop moves to e5 without capturing', 'A pawn captures on e5', 'Black castles'], 0),
        q.single('O-O-O means…', ['Castling queenside', 'Castling kingside', 'Three draws', 'Checkmate'], 0),
      ]),
    },
    {
      title: 'Play your first games',
      lessons: ['86Is6YemsyA', 'o74M2vKYpcc', 'UoFqV1lxA7Q', 'iNzy_dt68ng', 'NAdNHVFaMBk', '2uc_m_YGLyA', 'IjAfwEWEulo'],
      checkpoint: exam('Openings exam', [
        q.num('How many points is a queen usually worth?', 9, 0),
        q.num('How many points is a rook usually worth?', 5, 0),
        q.single('Knights and bishops are each worth about…', ['3 points', '1 point', '5 points', '9 points'], 0),
        q.multi('Which are good opening principles?', ['Control the centre', 'Develop knights and bishops', 'Castle early', 'Move only rook pawns'], [0, 1, 2]),
        q.single('“Developing” a piece means…', ['Moving it off its starting square to a useful one', 'Promoting it', 'Capturing with it', 'Trading it'], 0),
        q.single('Scholar’s Mate targets…', ['The weak f7 (or f2) square next to the king', 'The queen', 'The a-file', 'The centre pawns'], 0),
        q.tf('Moving the same piece several times in the opening usually wastes time.', true),
        q.single('Why not bring the queen out too early?', ['It gets chased, and you lose time while other pieces wait', 'It is illegal', 'It can’t move far', 'It loses value'], 0),
        q.single('Which first move controls the centre for White?', ['1. e4', '1. a4', '1. h4', '1. Na3'], 0),
        q.single('Black’s reply 1… e5 to 1. e4 leads to…', ['Open games like the Italian or the Ruy Lopez', 'Instant checkmate', 'A draw', 'An illegal position'], 0),
        q.tf('Castling connects the rooks so they can work together.', true),
        q.single('Giving up your bishop (3) to capture your opponent’s rook (5) is called…', ['Winning the exchange', 'Losing the exchange', 'En passant', 'A fork'], 0),
      ]),
    },
    {
      title: 'Tactics and fewer blunders',
      lessons: ['MbMslp2WcI0', 'qCVNza5-09U', 'GfmDBpbqMAI'],
      checkpoint: exam('Tactics exam', [
        q.single('A knight attacking the king and rook at the same time is a…', ['Fork', 'Pin', 'Skewer', 'Stalemate'], 0),
        q.single('A bishop attacks a knight that can’t move because the king is behind it. This is…', ['An absolute pin', 'A fork', 'A skewer', 'A discovered check'], 0),
        q.single('A rook checks the king, and when the king moves, the rook takes the queen behind it. This is…', ['A skewer', 'A pin', 'A fork', 'Castling'], 0),
        q.single('A double check can only be answered by…', ['Moving the king', 'Blocking', 'Capturing one attacker', 'Castling'], 0),
        q.single('A discovered check happens when…', ['Moving one piece uncovers a check from another', 'You check with a pawn', 'You castle into check', 'Two kings meet'], 0),
        q.single('A piece that has no safe squares to escape to is…', ['Trapped', 'Pinned', 'Promoted', 'Developed'], 0),
        q.multi('What should you check before every move?', ['Checks', 'Captures', 'Threats', 'Your opponent’s rating'], [0, 1, 2]),
        q.tf('Knights are especially good at forks.', true),
        q.single('A piece nothing defends is called…', ['Hanging', 'Pinned', 'Castled', 'Promoted'], 0),
        q.single('The best way to get better at tactics is…', ['Solving puzzles regularly', 'Memorising one opening', 'Playing only fast games', 'Reading the rules again'], 0),
        q.single('Before capturing, you should ask…', ['Can my opponent recapture, and who wins the trade?', 'Is it my turn?', 'Is the piece pretty?', 'Nothing'], 0),
        q.order('Put a simple blunder check in order.', ['Look at what your opponent’s last move threatens', 'Find your candidate move', 'Check it doesn’t leave a piece hanging', 'Play the move']),
      ]),
    },
  ],
};
