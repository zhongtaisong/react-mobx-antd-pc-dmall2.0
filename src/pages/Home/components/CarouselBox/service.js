import axios from '@axios';
// 获取需要展示的图片
const imgCarouselUrl = `index/banner`;
class Service {
    imgCarouselData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(imgCarouselUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();