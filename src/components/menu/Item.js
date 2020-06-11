import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component{

    static _template(){
        return {
            color: 0xffffffff,
            text:{text:'', fontFace:'SourceSansPro-Bold', fontSize:50}
        }
    }

    set label(v){
        this.text.text = v;
    }

    _focus() {
        this.patch({
            smooth: {scale: 1.3}
        });
    }

    _unfocus() {
        this.patch({
            smooth: {scale: 1}
        });
    }
}