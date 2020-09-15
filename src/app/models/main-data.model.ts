import { HeaderConfigModel } from './header-config.model';
import { PreloadConfigModel } from './preload-config.model';
import { PopupConfigModel } from './popup-config.model';
import { ComponentsConfigModel } from './components-config.model';
import { FinalConfigModel } from './final-config.model';

export interface MainDataModel {
    isLoaded: boolean;
    header: HeaderConfigModel;
    preload: PreloadConfigModel;
    popup: PopupConfigModel;
    list: ComponentsConfigModel;
    delivery: ComponentsConfigModel;
    form: ComponentsConfigModel;
    final: FinalConfigModel;
}
