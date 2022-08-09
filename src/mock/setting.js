import Mock from "mockjs";
import wechat from '@/assets/wechat.jpg';
import qq from '@/assets/QQ.jpg';
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    favicon: "https://img1.baidu.com/it/u=403561891,3930101245&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659891600&t=f7adc6fe6703d2e2c07bfd1f3d17b9f1",
    siteTitle: "Sanerl's blog",
    github: "https://github.com/DuYi-Edu",
    qq: "2648059506",
    qqQrCode:qq,
    weixin: "P2648059506",
    weixinQrCode:wechat,
    mail: "2648059506@qq.com",
    icp: "黑ICP备17001719号",
    githubName: "Sanerl",
    avatar: "https://img2.baidu.com/it/u=903803689,1507375621&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1658336400&t=5ba6e3ca54509e0ad6fd9a23cf6d8b4a",
  },
});
