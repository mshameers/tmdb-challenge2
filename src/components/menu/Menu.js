import { Lightning, Utils, Router } from "wpe-lightning-sdk";
import Item from "./Item.js";

export default class Menu extends Lightning.Component{

    static _template(){
        return {
            x: 30, y: 140,
            Items:{
                x: 80
            }
        }
    }

    _init(){
        this._index = 0;
    }

    set items(v){
        // create children by handing over an array of
        // object to the objectList
        this.tag("Items").children = v.map((el, idx)=>{
            return {type: Item, action: el.action, label: el.label, x: idx*200}
        })
    }

    get items(){
        return this.tag("Items").children;
    }

    get activeItem(){
        return this.items[this._index];
    }

    _getFocused(){
        return this.activeItem;
    }

    _handleLeft(){
        if(this._index > 0){
            this._index = this._index - 1;
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._index = this._index + 1;
        }
    }

    _handleDown() {
        Router.restoreFocus();
    }
}