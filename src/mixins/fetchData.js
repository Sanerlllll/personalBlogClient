// 公共远程获取数据
export default function(defaultDataValue = null){
    return {
        data(){
            return {
                isLoading:true,//是否正在加载远程数据中
                data:defaultDataValue,//远程数据
            }
        },
        async created(){
            // 组件使用时需要提供一个获取远程数据的方法
            this.data = await this.fetchData(); 
            this.isLoading = false;
        }
    }
}

