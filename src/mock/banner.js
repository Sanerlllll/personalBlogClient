import Mock from 'mockjs';
//Mock.mock(拦截规则,拦截的请求方法，得到的模拟数据） 
Mock.mock('/api/banner','get',{
    code: 0,
  msg: "",
  data: [
    {
      id: "1",
      midImg: "https://img1.baidu.com/it/u=3012806272,1276873993&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=7786879d8d8994f7c03936e2312661f7",
      bigImg: "https://img1.baidu.com/it/u=3012806272,1276873993&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=7786879d8d8994f7c03936e2312661f7",
      title: "Spring",
      description: "春暖花开",
    },
    {
      id: "2",
      midImg: "https://img2.baidu.com/it/u=1787475710,2159333383&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=30c5d363865bf6f1249b0fe033d4ea1b",
      bigImg: "https://img2.baidu.com/it/u=1787475710,2159333383&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=30c5d363865bf6f1249b0fe033d4ea1b",
      title: "Summary",
      description: "阳光沙滩",
    },
    {
      id: "3",
      midImg: "https://img0.baidu.com/it/u=3930704367,367306952&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=227e17bae5456d407547c7f85ec58e0c",
      bigImg: "https://img0.baidu.com/it/u=3930704367,367306952&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1686502800&t=227e17bae5456d407547c7f85ec58e0c",
      title: "Winter",
      description: "凛冬将至",
    },
  ],
})