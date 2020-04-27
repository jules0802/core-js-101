/* eslint-disable no-undef */
/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  // eslint-disable-next-line func-names
  this.getArea = function () {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const resultObj = JSON.parse(json);
  Object.setPrototypeOf(resultObj, proto);
  return resultObj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

/* const cssSelectorBuilder = {
  cssSelectorsCombination: '',
  cssSelectorsComplect: {
    type: '',
    id: '',
    classes: [],
    attributes: [],
    pseudoClasses: [],
    pseudoElement: '',
  },

  element(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.type = value;
    return newCssSelectorBuilder;
  },

  id(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.id = `#${value}`;
    return newCssSelectorBuilder;
  },

  class(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.classes.push(`.${value}`);
    return newCssSelectorBuilder;
  },

  attr(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.attributes.push(`[${value}]`);
    return newCssSelectorBuilder;
  },

  pseudoClass(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.pseudoClasses.push(`:${value}`);
    return newCssSelectorBuilder;
  },

  pseudoElement(value) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsComplect = { ...this.cssSelectorsComplect };
    newCssSelectorBuilder.cssSelectorsComplect.pseudoElement = `::${value}`;
    return newCssSelectorBuilder;
  },

  stringify() {
    if (!this.cssSelectorsCombination) {
      let cssSelectorString = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const selector in this.cssSelectorsComplect) {
        if (typeof this.cssSelectorsComplect[selector] === 'string') {
          cssSelectorString += this.cssSelectorsComplect[selector];
          this.cssSelectorsComplect[selector] = '';
        } else {
          cssSelectorString += this.cssSelectorsComplect[selector].join('');
          this.cssSelectorsComplect[selector] = [];
        }
      }
      return cssSelectorString;
    } return this.cssSelectorsCombination;
  },

  combine(selector1, combinator, selector2) {
    const newCssSelectorBuilder = Object.create(cssSelectorBuilder);
    newCssSelectorBuilder.cssSelectorsCombination = `${selector1.stringify()}
    ${combinator} ${selector2.stringify()}`;
    return newCssSelectorBuilder;
  },
};

const builder = cssSelectorBuilder;
console.log(builder.id('main').class('container').class('editable').stringify());
console.log(builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify());
console.log(builder.combine(builder.element('tr').pseudoClass('nth-of-type(even)'), '~',
  builder.element('td').pseudoClass('nth-of-type(even)')).stringify()); */

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  /* cssSelectorBuilder, */
};
