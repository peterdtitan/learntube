import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Objects and classes',
  lessons: {
    lo7o91qLzxc: {
      title: 'Objects',
      try: 'Make an object for a person with a few properties and a method that says hello, then change a property and call the method.',
      minutes: 15,
      questions: [
        q.single('person.name reads…', ['The name property of person', 'A variable called name', 'The object’s length', 'A method'], 0),
        q.single('A function stored in an object is called a…', ['Method', 'Property name', 'Class', 'Loop'], 0),
      ],
    },
    Jdlo8ZDt5Jg: {
      title: 'this',
      try: 'Give two objects the same sayHi method that uses this.name, and check that each prints its own name.',
      minutes: 10,
      questions: [
        q.single('Inside an object’s method, this refers to…', ['The object the method was called on', 'Always the window', 'The function', 'Nothing'], 0),
        q.tf('Arrow functions don’t have their own this.', true),
      ],
    },
    WPmAu26LZKo: {
      title: 'Constructors',
      try: 'Write a Car constructor function and use new to make three cars with different makes and years.',
      minutes: 10,
      questions: [
        q.single('new Car("Toyota", 2020) …', ['Creates a new object using the Car constructor', 'Calls Car without an object', 'Copies another car', 'Throws an error'], 0),
        q.tf('Constructors let you make many similar objects without repeating code.', true),
      ],
    },
    U2vxAEiaVRY: {
      title: 'Classes',
      try: 'Rewrite your Car as a class with a constructor and a method, and make a few cars.',
      minutes: 15,
      questions: [
        q.single('A class’s constructor runs…', ['When a new object is created with new', 'When a method is called', 'Never', 'When the page closes'], 0),
        q.single('A class is…', ['A blueprint for creating objects', 'A CSS class', 'A loop', 'A variable'], 0),
      ],
    },
    UOH4SAG3BoQ: {
      title: 'The static keyword',
      try: 'Add a static counter to a class that counts how many objects have been created from it.',
      minutes: 15,
      questions: [
        q.single('A static property belongs to…', ['The class itself, not each object', 'Each object separately', 'The window', 'Nothing'], 0),
        q.single('You read a static property like…', ['User.count', 'user.count', 'this.count in every object', 'static.count'], 0),
      ],
    },
    DqUPa0D2N78: {
      title: 'Inheritance',
      try: 'Make an Animal class with an eat method, and Rabbit and Fish classes that extend it and add their own methods.',
      minutes: 15,
      questions: [
        q.single('class Dog extends Animal means…', ['Dog gets Animal’s properties and methods', 'Animal gets Dog’s methods', 'They are unrelated', 'Dog replaces Animal'], 0),
        q.tf('Inheritance avoids repeating code that similar classes share.', true),
      ],
    },
    Cto38GpvJgg: {
      title: 'The super keyword',
      try: 'Give your child classes their own constructors that call super() with the shared values first.',
      minutes: 15,
      questions: [
        q.single('super() in a child class’s constructor…', ['Calls the parent class’s constructor', 'Deletes the parent', 'Makes a static method', 'Ends the class'], 0),
        q.single('In a child constructor, you must call super()…', ['Before using this', 'At the very end', 'Never', 'Only in static methods'], 0),
      ],
    },
    KQVCAnh6Afk: {
      title: 'Getters and setters',
      try: 'Make a Rectangle class whose setters reject negative widths and heights, with a getter for its area.',
      minutes: 20,
      questions: [
        q.single('A getter lets you…', ['Read a computed value like a property, such as rect.area', 'Delete a property', 'Loop through a class', 'Create a class'], 0),
        q.single('A setter is useful for…', ['Checking a value before saving it', 'Speeding up code', 'Printing', 'Inheriting'], 0),
      ],
    },
  },
  checkpoint: programExam('Objects and classes exam', [
    q.single('Which creates an object?', ['const car = { make: "Ford", year: 2020 };', 'const car = [make: "Ford"];', 'const car = (make = "Ford");', 'object car = "Ford";'], 0),
    q.single('car["make"] is the same as…', ['car.make', 'car(make)', 'car->make', 'make.car'], 0),
    q.single('car.colour = "red"; on an existing object…', ['Adds a new property', 'Throws an error', 'Replaces the object', 'Does nothing'], 0),
    q.single('In sayHi() { console.log(this.name); }, this.name is…', ['The name of the object that called sayHi', 'A global name', 'Always undefined', 'The function’s name'], 0),
    q.single('Outside any function in a browser script, this is usually…', ['The window object', 'Always undefined', 'The document', 'null'], 0),
    q.single('A constructor function’s name usually starts with…', ['A capital letter', 'A number', 'An underscore', 'A lowercase letter'], 0),
    q.single('Inside a constructor, this.make = make; …', ['Sets the new object’s make property', 'Reads a global', 'Deletes make', 'Returns make'], 0),
    q.single('Which keyword creates an object from a class?', ['new', 'create', 'make', 'class'], 0),
    q.single('Methods written in a class are shared by…', ['Every object made from the class', 'Only the first object', 'No objects', 'Other classes'], 0),
    q.single('Static methods are called on…', ['The class, like MathUtil.add()', 'Each object', 'The window', 'Strings'], 0),
    q.tf('A static property can track something about all the objects, such as how many exist.', true),
    q.single('In class Cat extends Animal {}, Animal is the…', ['Parent (super) class', 'Child class', 'Object', 'Method'], 0),
    q.single('If a child class has a method with the same name as its parent’s…', ['The child’s version is used (overriding)', 'Both run', 'An error is thrown', 'The parent’s is used'], 0),
    q.single('super.move() inside a child’s method…', ['Calls the parent’s move method', 'Calls the child’s move', 'Deletes move', 'Makes move static'], 0),
    q.single('Using this before super() in a child constructor…', ['Throws an error', 'Works fine', 'Calls the parent twice', 'Silently makes this undefined'], 0),
    q.single('get area() { return this.w * this.h; } is used as…', ['rect.area', 'rect.area()', 'rect.get.area', 'area(rect)'], 0),
    q.single('A setter is written…', ['set width(value) { … }', 'width = set(value)', 'setter width()', 'set: width'], 0),
    q.single('A property meant only for use inside the class is often named with…', ['A leading underscore, like _width', 'A capital letter', 'A dollar sign', 'A number'], 0),
    q.match('Match each word to its meaning.', [['class', 'A blueprint for objects'], ['constructor', 'Sets up a new object'], ['extends', 'Inherits from another class'], ['static', 'Belongs to the class itself']]),
    q.order('Put making a subclass in order.', ['Write the parent class', 'Write class Child extends Parent', 'Call super() in the child’s constructor', 'Add the child’s own methods', 'Create an object with new']),
  ]),
};
