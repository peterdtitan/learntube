import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Async code and APIs',
  lessons: {
    NOlOw03qBfw: {
      title: 'Callback hell',
      try: 'Write four tasks with setTimeout that must run in order using nested callbacks, and notice how deep the nesting gets.',
      minutes: 10,
      questions: [
        q.single('Callback hell is…', ['Deeply nested callbacks that are hard to read and change', 'A browser error', 'A slow loop', 'A missing function'], 0),
        q.tf('Promises and async/await were made partly to avoid callback hell.', true),
      ],
    },
    NOzi4wBHn0o: {
      title: 'Promises',
      try: 'Rewrite your four nested tasks as functions that return promises, and chain them with .then() and .catch().',
      minutes: 20,
      questions: [
        q.single('A promise is…', ['An object for a value that will be ready later, or an error', 'A guaranteed result', 'A loop', 'A variable type'], 0),
        q.match('Match each promise method to when it runs.', [['.then()', 'When the promise resolves'], ['.catch()', 'When it rejects'], ['.finally()', 'Either way']]),
      ],
    },
    '9j1dZwFEJ-c': {
      title: 'async and await',
      try: 'Rewrite your promise chain as an async function using await, wrapped in try/catch.',
      minutes: 10,
      questions: [
        q.single('await can be used…', ['Inside an async function (or at the top level of a module)', 'Anywhere in any script', 'Only in loops', 'Only in classes'], 0),
        q.single('An async function always returns…', ['A promise', 'A string', 'undefined', 'A number'], 0),
      ],
    },
    r4MLHHLctKw: {
      title: 'JSON',
      try: 'Write a small JSON file of people, then use JSON.stringify and JSON.parse to convert between objects and text.',
      minutes: 15,
      questions: [
        q.single('JSON.parse(text) …', ['Turns a JSON string into a JavaScript value', 'Turns an object into a string', 'Downloads JSON', 'Checks HTML'], 0),
        q.single('Which is valid JSON?', ['{"name": "Ada", "age": 36}', "{name: 'Ada', age: 36}", '{"name": "Ada",}', '(name = "Ada")'], 0),
      ],
    },
    i7oL_K_FmM8: {
      title: 'Cookies',
      try: 'Write setCookie, getCookie and deleteCookie functions and use them to remember a name between page reloads.',
      minutes: 15,
      questions: [
        q.single('Cookies are…', ['Small pieces of text the browser stores and sends back to the site', 'Images', 'Scripts', 'Fonts'], 0),
        q.single('Giving a cookie an expiry date in the past…', ['Deletes it', 'Keeps it forever', 'Copies it', 'Encrypts it'], 0),
      ],
    },
    '37vxWr0WgQk': {
      title: 'Fetching data from an API',
      try: 'Fetch a Pokémon from the free PokeAPI by the name typed in an input, show its image, and show an error message when the name isn’t found.',
      minutes: 20,
      questions: [
        q.single('fetch(url) returns…', ['A promise of a Response', 'The data directly', 'A string', 'An HTML page'], 0),
        q.single('response.ok is false when…', ['The server replies with an error status like 404', 'The data is large', 'The request succeeds', 'Always'], 0),
      ],
    },
    VaDUGPMjzOM: {
      title: 'Weather app',
      try: 'Build the weather app: type a city, fetch its current weather from OpenWeatherMap with your free API key, and show the temperature, humidity, description and an emoji. Put your rock paper scissors game, image slider and weather app online and log the links as your make.',
      minutes: 45,
      questions: [
        q.single('An API key…', ['Identifies your app to the service, so keep it out of public code where you can', 'Is your computer’s password', 'Is a CSS class', 'Is never needed'], 0),
        q.single('Kelvin converts to Celsius by…', ['Subtracting 273.15', 'Adding 32', 'Multiplying by 1.8', 'Dividing by 10'], 0),
        q.tf('A good app shows a helpful message when the city isn’t found, instead of breaking.', true),
      ],
    },
  },
  checkpoint: programExam('Async code and APIs exam', [
    q.single('Asynchronous code is needed for…', ['Tasks that take time, like network requests', 'Adding two numbers', 'Declaring variables', 'CSS styling'], 0),
    q.single('A new promise starts in which state?', ['Pending', 'Resolved', 'Rejected', 'Finished'], 0),
    q.single('In new Promise((resolve, reject) => { … }), you call reject when…', ['The task fails', 'The task succeeds', 'Always', 'Never'], 0),
    q.single('Returning a promise from inside .then() lets you…', ['Chain the next .then() after it finishes', 'Stop the chain', 'Run everything at once', 'Throw an error'], 0),
    q.single('Errors anywhere in a promise chain are handled by…', ['.catch()', '.then() only', '.finally() only', 'console.log'], 0),
    q.single('await pauses…', ['Only the async function it’s in, until the promise settles', 'The whole browser', 'All JavaScript on the page', 'Nothing'], 0),
    q.single('With async/await, errors are usually handled with…', ['try/catch', '.then()', 'Only if statements', 'switch'], 0),
    q.single('JSON stands for…', ['JavaScript Object Notation', 'Java Standard Output Network', 'JavaScript Online Node', 'Joined String Object Notation'], 0),
    q.single('JSON.stringify({ a: 1 }) gives…', ['The string {"a":1}', 'The object { a: 1 }', 'The string a=1', 'An error'], 0),
    q.tf('JSON keys and strings must use double quotes.', true),
    q.single('response.json() …', ['Reads the body and parses it as JSON, returning a promise', 'Returns plain text', 'Sends JSON', 'Runs synchronously'], 0),
    q.single('fetch only rejects on its own when…', ['There’s a network failure; a 404 still resolves', 'The status isn’t 200', 'The data is JSON', 'Always'], 0),
    q.single('To catch a 404 from fetch, check…', ['response.ok, and throw an error if it’s false', 'The URL’s length', 'document.title', 'Nothing'], 0),
    q.single('A cookie is set with…', ['document.cookie = "name=Ada; expires=…; path=/"', 'localStorage.cookie()', 'window.setCookie()', 'new Cookie()'], 0),
    q.single('Cookies differ from localStorage because cookies…', ['Are sent to the server with requests', 'Hold more data', 'Never expire', 'Can never be read by JavaScript'], 0),
    q.single('encodeURIComponent(city) is used when building a URL so that…', ['Spaces and special characters are safe', 'The city is translated', 'The request is faster', 'The key is hidden'], 0),
    q.single('A web API is…', ['A way for programs to request data or actions from a service', 'A page design', 'A CSS library', 'A database table'], 0),
    q.order('Put the weather app’s steps in order.', ['Read the city from the input', 'Fetch the weather data', 'Check the response and parse the JSON', 'Show the weather on the page']),
    q.single('Inside an async function, a fetch result is read with…', ['const response = await fetch(url);', 'const response = fetch(url).now;', 'fetch(url) => response', 'wait fetch(url)'], 0),
    q.match('Match each tool to its job.', [['fetch', 'Requests data from a URL'], ['JSON.parse', 'Turns JSON text into a value'], ['await', 'Waits for a promise'], ['try/catch', 'Handles errors']]),
  ]),
};
