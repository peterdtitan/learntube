import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Excel basics, formulas and lookups',
  lessons: {
    wbJcJCkBcMg: {
      title: 'Excel for beginners',
      try: 'Open Excel (or free Excel on the web). Build a small table of ten sales with columns for date, product, quantity and price, and format it as a table.',
      minutes: 30,
      questions: [
        q.single('A cell reference like C4 means…', ['Column C, row 4', 'Row C, column 4', 'Chart 4', 'Copy 4 times'], 0),
        q.single('“Format as Table” in Excel gives you…', ['Banded rows, filters and a range that grows with new data', 'A chart', 'A pivot table', 'A printed page'], 0),
        q.tf('Excel on the web is free with a Microsoft account.', true),
      ],
    },
    XRPyj7cKVsQ: {
      title: 'Formulas in Excel',
      try: 'Add a Total column (quantity × price), then use SUM, AVERAGE, COUNT, MAX and an IF formula that labels big sales.',
      minutes: 40,
      questions: [
        q.single('Which formula adds up B2 to B10?', ['=SUM(B2:B10)', '=ADD(B2-B10)', 'SUM B2:B10', '=TOTAL(B2,B10)'], 0),
        q.single('=IF(D2>100,"Big","Small") returns “Big” when…', ['D2 is more than 100', 'D2 is less than 100', 'D2 is empty', 'Always'], 0),
        q.single('COUNTIF counts…', ['Cells that meet a condition', 'Every cell', 'Only blank cells', 'Characters in a cell'], 0),
      ],
    },
    Z7hPEwCzk2s: {
      title: 'XLOOKUP',
      try: 'Make a second table of product prices, then use XLOOKUP to bring each product’s price into your sales table.',
      minutes: 30,
      questions: [
        q.single('XLOOKUP needs at least…', ['The value to find, where to look, and what to return', 'Only a column letter', 'A chart', 'A pivot table'], 0),
        q.single('Unlike VLOOKUP, XLOOKUP can…', ['Return values from a column to the left of the lookup column', 'Only look right', 'Not find exact matches', 'Only work on numbers'], 0),
        q.tf('XLOOKUP looks for an exact match by default.', true),
      ],
    },
  },
  checkpoint: programExam('Formulas and lookups exam', [
    q.single('Every Excel formula starts with…', ['=', '#', '@', '+'], 0),
    q.single('=AVERAGE(C2:C11) returns…', ['The mean of C2 to C11', 'The total', 'The count', 'The largest value'], 0),
    q.single('=COUNT(A2:A20) counts…', ['Cells containing numbers', 'All non-empty cells', 'Blank cells', 'Text cells only'], 0),
    q.single('=COUNTA(A2:A20) counts…', ['All non-empty cells', 'Only numbers', 'Only blanks', 'Only text'], 0),
    q.single('=MAX(D2:D50) returns…', ['The largest value', 'The smallest value', 'The total', 'The average'], 0),
    q.single('$A$1 is…', ['An absolute reference that doesn’t change when copied', 'A relative reference', 'A currency', 'An error'], 0),
    q.single('Copying =B2*C2 down one row gives…', ['=B3*C3', '=B2*C2', '=B3*C2', '=C2*D2'], 0),
    q.single('=SUMIF(B:B,"Lagos",D:D) adds…', ['Values in D where column B says Lagos', 'All of column D', 'Column B', 'Only Lagos cells in D'], 0),
    q.single('=IF(E2>=50,"Pass","Fail") with E2 = 50 returns…', ['Pass', 'Fail', '50', 'An error'], 0),
    q.single('XLOOKUP(lookup_value, lookup_array, return_array) returns…', ['The value from return_array in the same position as the match', 'The lookup_value', 'The row number', 'A chart'], 0),
    q.single('What can you add to XLOOKUP so it shows a message instead of #N/A?', ['An if_not_found argument', 'A second equals sign', 'A pivot table', 'A chart'], 0),
    q.tf('XLOOKUP can look left, which VLOOKUP cannot.', true),
    q.single('#N/A from a lookup usually means…', ['The value wasn’t found', 'Division by zero', 'A spelling error in the function name', 'The sheet is protected'], 0),
    q.single('#DIV/0! means…', ['A formula divided by zero or an empty cell', 'A lookup failed', 'A circular reference', 'The file is corrupt'], 0),
    q.multi('Which functions summarise numbers?', ['SUM', 'AVERAGE', 'MAX', 'TRIM'], [0, 1, 2]),
    q.single('An Excel Table (Ctrl+T) helps because…', ['Formulas and ranges grow automatically as you add rows', 'It deletes duplicates', 'It makes charts', 'It locks the sheet'], 0),
    q.num('=10+2*5 returns what?', 20, 0),
    q.order('Put building a lookup in order.', ['Have a table with the values you need', 'Click where the result should go', 'Write XLOOKUP with the value, lookup range and return range', 'Copy it down the column']),
    q.single('Which formula joins first and last names in A2 and B2 with a space?', ['=A2&" "&B2', '=A2+B2', '=SUM(A2,B2)', '=A2 B2'], 0),
    q.tf('Relative references change when a formula is copied; absolute references don’t.', true),
  ]),
};
