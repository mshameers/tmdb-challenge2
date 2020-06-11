import {Lightning, Utils, Router} from "wpe-lightning-sdk";

export default class Splash extends Lightning.Component{
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
        return {
            Background: {
                w: 1920, h: 1080, colorBottom: 0xff000000, scale: 1.2,
                src: Utils.asset("images/background.png"),
                transitions: {
                    scale: {duration: 1, timingFunction},
                    x:{duration:3, delay:1.2, timingFunction:'ease-in'}
                }
            },
            Logo: {
                src: Utils.asset("images/logo-large.png"),
                mount: .5, x: 960, y: 640, alpha: 0.0001,
                transitions: {
                    alpha: {duration: 1, timingFunction},
                    y: {duration: 1, timingFunction}
                }
            },
            Spinner: {
                src: Utils.asset("images/spinner.png"),
                mountX: .5, x: 960, y: 920, alpha: 0.001, color: 0xaaffffff,
                transitions: {
                    alpha: {duration: 1, timingFunction}
                }
            }
        };
    }

    _init() {
        this.tag("Logo").on("txLoaded", ()=> {
            this.patch({
                Logo:{smooth:{alpha:1, y: 540}},
                Background:{smooth:{scale:1}}
            })
        });

        this.tag("Spinner").on("txLoaded", ()=> {
            this.tag("Spinner").setSmooth("alpha", 1);
        });

        this._spinnerAnimation = this.animation({duration: 1, repeat: -1, actions: [
            {t: 'Spinner', p: "rotation", sm: 0, v: function(t) {
                    if (t < .125) {
                        return 45 * (Math.PI/180);
                    } else if (t < .250) {
                        return 90 * (Math.PI/180);
                    } else if (t < .375) {
                        return 135 * (Math.PI/180);
                    } else if (t < .500) {
                        return 180 * (Math.PI/180);
                    } else if (t < .625) {
                        return 225 * (Math.PI/180);
                    } else if (t < .750) {
                        return 270 * (Math.PI/180);
                    } else if (t < .875) {
                        return 315 * (Math.PI/180);
                    } else if (t < 1) {
                        return 360 * (Math.PI/180);
                    }
                }}
        ]});
    }

    _handleEnter() {
        Router.navigate('movies');
    }

    _active() {
        this._spinnerAnimation.start()
    }

    _inactive() {
        this._spinnerAnimation.stop()
    }

    _unfocus() {
        this.children = [];
    }

}