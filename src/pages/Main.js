import {Lightning, Utils} from 'wpe-lightning-sdk';
import {List} from "../components"
import {getImgUrl as getImgUrl} from '../lib/tools'

export default class Main extends Lightning.Component{
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
        return {
            Background: {
                w: 1920, h: 1080, colorBottom: 0xff000000, scale: 1,
                transitions: {
                    x:{duration:3, delay:1.2, timingFunction:'ease-in'}
                }
            },
            Lists: {
                x: 100, y: 460, zIndex: 3
            },
            Logo: {
                src: Utils.asset("images/logo.png"),
                mount: .5, x: 300, y: 100, alpha: 0.0001,
                transitions: {
                    alpha: {duration: 1, timingFunction},
                    y: {duration: 1, timingFunction}
                }
            }
        };
    }

    _init() {
        this._index = 0;
        this.tag("Logo").on("txLoaded", ()=> {
            this.patch({
                Logo:{smooth:{alpha:1}}
            })
        });
    }

    _focus() {
    }

    $selectionChanged(__item) {
        this.patch({
            Background: {
                src: getImgUrl(__item.activeBackgroundUrl)
            },
            Lists: {
                List: {
                    label: __item.activeLabel
                }
            }
        });
    }

    set movies(__data) {
        this.tag('Lists').patch({
            List: {
                type: List,
                movies: __data.results
            }
        })
    }

    _unfocus() {
        // @todo
    }

    _getFocused() {
        return this.tag("List");
    }

}