/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file Note.js
 * @class Note
 * @desc Note class for creating note objects
 * NOTE: THIS IS PERFECT! Don't add anything else until after the assignment is submitted.
 */

export default class Note {
    static #counter = 1;
    #id;
    #title;
    #content;
    constructor(title="",content=""){
        this.#id = Note.#counter++;
        this.#title = title;        // TODO: If title not defined, could we use the id number?
        this.#content = content;
        // TODO: author
        // TODO: Date created
        // TODO: Date updated
    }
    /**
     * @method getId
     * @desc get the id of the Note
     * @returns {Number}
     */
    getId(){
        return this.#id;
    }
    /**
     * @method getTitle
     * @desc get the title of the Note
     * @returns {String}
     */
    getTitle(){
        return this.#title;
    }
    /**
     * @method getContent
     * @desc get the content of the Note
     * @returns {String}
     */
    getContent(){
        return this.#content;
    }
    /**
     * @method setId
     * @desc Though this will rarely be used, allow the id number to be set in the Note.
     * @param {Number} id 
     * @returns 
     */
    setId(id){
        this.#id = id;
        return this;
    }
    /**
     * @method setTitle
     * @desc set the title of the Note
     * @param {String} title 
     * @returns 
     */
    setTitle(title){
        this.#title = title;
        return this;
    }
    /**
     * @method setContent
     * @desc set the content of the Note
     * @param {String} content 
     * @returns 
     */
    setContent(content){
        this.#content = content;
        return this;
    }
    /**
     * @method addContent
     * @desc append more content to the Note
     * @param {String} content 
     * @returns 
     */
    addContent(content){
        this.#content += content;
        return this;
    }
    /**
     * @method toJSON
     * @desc convert a Note into a JSON object
     * @returns {Object}
     */
    toJSON(){
        return {
            "id"      : this.#id,
            "title"   : this.#title,
            "content" : this.#content
        }
    }
    /**
     * @method fromJSON
     * @desc convert an object to a Note. Requires `new Note()` be used before using this method.
     * @param {Object} obj 
     * @returns 
     */
    fromJSON(obj){
        this.#id      = Object.hasOwn(obj,"id")      ? obj.id      : Note.#counter++;
        this.#title   = Object.hasOwn(obj,"title")   ? obj.title   : "";
        this.#content = Object.hasOwn(obj,"content") ? obj.content : "";
        return this;
    }

    toString(){
        return JSON.stringify(this.toJSON(),null,"\t");
    }

    fromString(str){
        this.fromJSON(JSON.parse(str));
        return this;
    }

    toListItem(){
        // TODO: Should we do something to shorten the title?
        return `<li><a href="/notes/${this.#id}">${this.#title}</a><li>`;
    }
}
