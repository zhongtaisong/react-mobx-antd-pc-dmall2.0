import { action, observable, makeAutoObservable } from 'mobx';

// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 图片
    @observable carouselList = [];
    @action setCarouselList = (data = []) => {
        this.carouselList = data;
    }

    // 获取图片
    imgCarouselData = async () => {
        const res: any = await service.imgCarouselData();
        try{
            if( res.data.code === 200 ){
                this.setCarouselList(res?.data?.data || []);
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();