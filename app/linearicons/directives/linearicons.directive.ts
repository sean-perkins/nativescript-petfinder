import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[lnr]'
})
export class LinearIconsDirective {

    private _icon: string;

    constructor(private elementRef: ElementRef) { }

    @Input('lnr')
    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this.updateIcon(value);
    }

    private updateIcon(newIcon: string): void {
        this.setElementIcon(this._icon, false);
        this.setElementIcon(newIcon, true);
        this._icon = newIcon;
    }

    private setElementIcon(icon: string, isAdd: boolean): void {
        if (this.isSupported(icon)) {
            const code = this.codeForClass(icon);
            if (code !== -1) {
                this.elementRef.nativeElement.text = String.fromCharCode(code);
                this.elementRef.nativeElement.fontFamily = 'Linearicons-Free';
            }
            else {
                console.log(`Icon: ${icon} is missing the entity value. Contact the developer to update the list.`);
            }
        }
        else {
            if (icon) {
                console.log(`Unsupported icon provided ${icon}. Please review your icon set.`);
            }
        }
    }

    private isSupported(icon: string): boolean {
        const icons: string[] = [
            'home',
            'apartment',
            'pencil',
            'magic-wand',
            'drop',
            'lighter',
            'poop',
            'sun',
            'moon',
            'cloud',
            'cloud-upload',
            'cloud-download',
            'cloud-sync',
            'cloud-check',
            'database',
            'lock',
            'cog',
            'trash',
            'dice',
            'heart',
            'star',
            'star-half',
            'star-empty',
            'flag',
            'envelope',
            'paperclip',
            'inbox',
            'eye',
            'printer',
            'file-empty',
            'file-add',
            'enter',
            'exit',
            'graduation-hat',
            'license',
            'music-note',
            'film-play',
            'camera-video',
            'camera',
            'picture',
            'book',
            'bookmark',
            'user',
            'users',
            'shirt',
            'store',
            'cart',
            'tag',
            'phone-handset',
            'phone',
            'pushpin',
            'map-marker',
            'map',
            'location',
            'calendar-full',
            'keyboard',
            'spell-check',
            'screen',
            'smartphone',
            'tablet',
            'laptop',
            'laptop-phone',
            'power-switch',
            'bubble',
            'heart-pulse',
            'construction',
            'pie-chart',
            'chart-bars',
            'gift',
            'diamond',
            'linearicons',
            'dinner',
            'coffee-cup',
            'leaf',
            'paw',
            'rocket',
            'briefcase',
            'bus',
            'car',
            'train',
            'bicycle',
            'wheelchair',
            'select',
            'earth',
            'smile',
            'sad',
            'neutral',
            'mustache',
            'alarm',
            'bullhorn',
            'volume-high',
            'volume-medium',
            'volume-low',
            'volume',
            'mic',
            'hourglass',
            'undo',
            'redo',
            'sync',
            'history',
            'clock',
            'download',
            'upload',
            'enter-down',
            'exit-up',
            'bug',
            'code',
            'link',
            'unlink',
            'thumbs-up',
            'thumbs-down',
            'magnifier',
            'cross',
            'menu',
            'list',
            'chevron-up',
            'chevron-down',
            'chevron-left',
            'chevron-right',
            'arrow-up',
            'arrow-down',
            'arrow-left',
            'arrow-right',
            'move',
            'warning',
            'question-circle',
            'menu-circle',
            'checkmark-circle',
            'cross-circle',
            'plus-circle',
            'circle-minus',
            'arrow-up-circle',
            'arrow-down-circle',
            'arrow-left-circle',
            'arrow-right-circle',
            'chevron-up-circle',
            'chevron-down-circle',
            'chevron-left-circle',
            'chevron-right-circle',
            'crop',
            'frame-expand',
            'frame-contract',
            'layers',
            'funnel',
            'text-format',
            'text-format-remove',
            'text-size',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'highlight',
            'text-align-left',
            'text-align-center',
            'text-align-right',
            'text-align-justify',
            'line-spacing',
            'indent-increase',
            'indent-decrease',
            'pilcrow',
            'direction-ltr',
            'direction-rtl',
            'page-break',
            'sort-alpha-asc',
            'sort-amount-asc',
            'hand',
            'pointer-up',
            'pointer-right',
            'pointer-down',
            'pointer-left'
        ];
        return icons.indexOf(icon) !== -1;
    }

    private codeForClass(icon: string) {
        // 0xe800
        switch (icon) {
            case 'home':
                return 0xe800;
            case 'apartment':
                return 0xe801;
            case 'pencil':
                return 0xe802;
            case 'magic-wand':
                return 0xe803;
            case 'drop':
                return 0xe804;
            case 'lighter':
                return 0xe805;
            case 'poop':
                return 0xe806;
            case 'sun':
                return 0xe807;
            case 'moon':
                return 0xe808;
            case 'cloud':
                return 0xe809;
            case 'cloud-upload':
                return 0xe80a;
            case 'cloud-download':
                return 0xe80b;
            case 'cloud-sync':
                return 0xe80c;
            case 'cloud-check':
                return 0xe80d;
            case 'database':
                return 0xe80e;
            case 'lock':
                return 0xe80f;
            case 'cog':
                return 0xe810;
            case 'trash':
                return 0xe811;
            case 'dice':
                return 0xe812;
            case 'heart':
                return 0xe813;
            case 'star':
                return 0xe814;
            case 'star-half':
                return 0xe815;
            case 'star-empty':
                return 0xe816;
            case 'flag':
                return 0xe817;
            case 'envelope':
                return 0xe818;
            case 'paperclip':
                return 0xe819;
            case 'inbox':
                return 0xe81a;
            case 'eye':
                return 0xe81b;
            case 'printer':
                return 0xe81c;
            case 'file-empty':
                return 0xe81d;
            case 'file-add':
                return 0xe81e;
            case 'enter':
                return 0xe81f;
            case 'exit':
                return 0xe820;
            case 'graduation-hat':
                return 0xe821;
            case 'license':
                return 0xe822;
            case 'music-note':
                return 0xe823;
            case 'film-play':
                return 0xe824;
            case 'camera-video':
                return 0xe825;
            case 'camera':
                return 0xe826;
            case 'picture':
                return 0xe827;
            case 'book':
                return 0xe828;
            case 'bookmark':
                return 0xe829;
            case 'user':
                return 0xe82a;
            case 'users':
                return 0xe82b;
            case 'shirt':
                return 0xe82c;
            case 'store':
                return 0xe82d;
            case 'cart':
                return 0xe82e;
            case 'tag':
                return 0xe82f;
            case 'phone-handset':
                return 0xe830;
            case 'phone':
                return 0xe831;
            case 'pushpin':
                return 0xe832;
            case 'map-marker':
                return 0xe833;
            case 'map':
                return 0xe834;
            case 'location':
                return 0xe835;
            case 'calendar-full':
                return 0xe836;
            case 'keyboard':
                return 0xe837;
            case 'spell-check':
                return 0xe838;
            case 'screen':
                return 0xe839;
            case 'smartphone':
                return 0xe83a;
            case 'tablet':
                return 0xe83b;
            case 'laptop':
                return 0xe83c;
            case 'laptop-phone':
                return 0xe83d;
            case 'power-switch':
                return 0xe83e;
            case 'bubble':
                return 0xe83f;
            case 'heart-pulse':
                return 0xe840;
            case 'construction':
                return 0xe841;
            case 'pie-chart':
                return 0xe842;
            case 'chart-bars':
                return 0xe843;
            case 'gift':
                return 0xe844;
            case 'diamond':
                return 0xe845;
            case 'linearicons':
                return 0xe846;
            case 'dinner':
                return 0xe847;
            case 'coffee-cup':
                return 0xe848;
            case 'leaf':
                return 0xe849;
            case 'paw':
                return 0xe84a;
            case 'rocket':
                return 0xe84b;
            case 'briefcase':
                return 0xe84c;
            case 'bus':
                return 0xe84d;
            case 'car':
                return 0xe84e;
            case 'train':
                return 0xe84f;
            case 'bicycle':
                return 0xe850;
            case 'wheelchair':
                return 0xe851;
            case 'select':
                return 0xe852;
            case 'earth':
                return 0xe853;
            case 'smile':
                return 0xe854;
            case 'sad':
                return 0xe855;
            case 'neutral':
                return 0xe856;
            case 'mustache':
                return 0xe857;
            case 'alarm':
                return 0xe858;
            case 'bullhorn':
                return 0xe859;
            case 'volume-high':
                return 0xe85a;
            case 'volume-medium':
                return 0xe85b;
            case 'volume-low':
                return 0xe85c;
            case 'volume':
                return 0xe85d;
            case 'mic':
                return 0xe85e;
            case 'hourglass':
                return 0xe85f;
            case 'undo':
                return 0xe860;
            case 'redo':
                return 0xe861;
            case 'sync':
                return 0xe862;
            case 'history':
                return 0xe863;
            case 'clock':
                return 0xe864;
            case 'download':
                return 0xe865;
            case 'upload':
                return 0xe866;
            case 'enter-down':
                return 0xe867;
            case 'exit-up':
                return 0xe868;
            case 'bug':
                return 0xe869;
            case 'code':
                return 0xe86a;
            case 'link':
                return 0xe86b;
            case 'unlink':
                return 0xe86c;
            case 'thumbs-up':
                return 0xe86d;
            case 'thumbs-down':
                return 0xe86e;
            case 'magnifier':
                return 0xe86f;
            case 'cross':
                return 0xe870;
            case 'menu':
                return 0xe871;
            case 'list':
                return 0xe872;
            case 'chevron-up':
                return 0xe873;
            case 'chevron-down':
                return 0xe874;
            case 'chevron-left':
                return 0xe875;
            case 'chevron-right':
                return 0xe876;
            case 'arrow-up':
                return 0xe877;
            case 'arrow-down':
                return 0xe878;
            case 'arrow-left':
                return 0xe879;
            case 'arrow-right':
                return 0xe87a;
            case 'move':
                return 0xe87b;
            case 'warning':
                return 0xe87c;
            case 'question-circle':
                return 0xe87d;
            case 'menu-circle':
                return 0xe87e;
            case 'checkmark-circle':
                return 0xe87f;
            case 'cross-circle':
                return 0xe880;
            case 'plus-circle':
                return 0xe881;
            case 'circle-minus':
                return 0xe882;
            case 'arrow-up-circle':
                return 0xe883;
            case 'arrow-down-circle':
                return 0xe884;
            case 'arrow-left-circle':
                return 0xe885;
            case 'arrow-right-circle':
                return 0xe886;
            case 'chevron-up-circle':
                return 0xe887;
            case 'chevron-down-circle':
                return 0xe888;
            case 'chevron-left-circle':
                return 0xe889;
            case 'chevron-right-circle':
                return 0xe88a;
            case 'crop':
                return 0xe88b;
            case 'frame-expand':
                return 0xe88c;
            case 'frame-contract':
                return 0xe88d;
            case 'layers':
                return 0xe88e;
            case 'funnel':
                return 0xe88f;
            case 'text-format':
                return 0xe890;
            case 'text-format-remove':
                return 0xe891;
            case 'text-size':
                return 0xe892;
            case 'bold':
                return 0xe893;
            case 'italic':
                return 0xe894;
            case 'underline':
                return 0xe895;
            case 'strikethrough':
                return 0xe896;
            case 'highlight':
                return 0xe897;
            case 'text-align-left':
                return 0xe898;
            case 'text-align-center':
                return 0xe899;
            case 'text-align-right':
                return 0xe89a;
            case 'text-align-justify':
                return 0xe89b;
            case 'line-spacing':
                return 0xe89c;
            case 'indent-increase':
                return 0xe89d;
            case 'indent-decrease':
                return 0xe89e;
            case 'pilcrow':
                return 0xe89f;
            case 'direction-ltr':
                return 0xe8a0;
            case 'direction-rtl':
                return 0xe8a1;
            case 'page-break':
                return 0xe8a2;
            case 'sort-alpha-asc':
                return 0xe8a3;
            case 'sort-amount-asc':
                return 0xe8a4;
            case 'hand':
                return 0xe8a5;
            case 'pointer-up':
                return 0xe8a6;
            case 'pointer-right':
                return 0xe8a7;
            case 'pointer-down':
                return 0xe8a8;
            case 'pointer-left':
                return 0xe8a9;
        }
        return -1;
    }

}
