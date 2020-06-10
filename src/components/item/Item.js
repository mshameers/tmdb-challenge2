import {Lightning} from "wpe-lightning-sdk";
import {getImgUrl as getImgUrl} from '../../lib/tools'

export default class Level extends Lightning.Component{
    static _template(){
        return {
            Image: {

            },
            Title: {
                y: 250, x: 100, mount: 0.5, alpha: 0, zIndex: 2,
                text: {fontFace: "SourceSansPro-Bold", fontSize: 24, color: 0xffffffff}
            },
            TitleBackground: {
                y: 250, x: 100, mount: 0.5, alpha: 0, zIndex: 1,
                texture: lng.Tools.getRoundRect(100, 100, 50, 0, 0xff808080, true, 0xff808080)
            }
        }
    }

    _focus() {
        this.patch({
            Image: {smooth: {scale: 1.5, duration: 1}},
            Title: {smooth: {alpha: 1, duration: 1}},
            TitleBackground: {smooth: {alpha: 1, duration: 1}}
        });
    }

    _unfocus() {
        this.patch({
            Image: {smooth: {scale: 1, duration: 1}},
            Title: {smooth: {alpha: 0, duration: 1}},
            TitleBackground: {smooth: {alpha: 0, duration: 1}}
        });
    }

    get activeLabel() {
        return {title: this._activeLabel, subTitle: 'Drama | Science Fiction'};
    }

    get activeBackgroundUrl() {
        return this._activeBackgroundUrl;
    }

    set item(v){
        this.patch({
            Title: {text: {text: v.vote_average}},
            Image: {src: getImgUrl(v.poster_path)}
        });
        this._activeLabel = v.title;
        this._activeSubLabel = v.title;
        this._activeBackgroundUrl = v.backdrop_path;
    }
}